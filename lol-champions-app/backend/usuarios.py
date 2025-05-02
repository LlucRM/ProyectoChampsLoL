# app.py (Flask backend completo)

from flask import Flask, Blueprint, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from passlib.hash import bcrypt
import os
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Carpeta de imágenes de perfil
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads', 'profile_images')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Tipos de archivo permitidos
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

usuarios_bp = Blueprint('usuarios', __name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["lol_app"]
users_collection = db["usuarios"]
favorites_collection = db["favorites"]
comments_collection = db["comments"]  # Nueva colección de comentarios

@usuarios_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if users_collection.find_one({"username": data["username"]}):
        return jsonify({"mensaje": "Usuario ya existe"}), 400

    hashed_password = bcrypt.hash(data["password"])
    user_data = {
        "username": data["username"],
        "password": hashed_password,
        "profileImage": "/uploads/profile_images/default.png"
    }
    users_collection.insert_one(user_data)
    return jsonify({"mensaje": "Usuario registrado exitosamente"})

@usuarios_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users_collection.find_one({"username": data["username"]})
    if not user or not bcrypt.verify(data["password"], user["password"]):
        return jsonify({"mensaje": "Credenciales inválidas"}), 401

    user_data = {
        "username": user["username"],
        "profileImage": user.get("profileImage", "/uploads/profile_images/default.png")
    }
    return jsonify({"mensaje": "Inicio de sesión exitoso", "usuario": user_data})

@usuarios_bp.route('/uploads/profile_images/<filename>')
def serve_profile_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@usuarios_bp.route('/updateProfileImage', methods=['POST'])
def update_profile_image():
    if 'profileImage' not in request.files:
        return jsonify({"mensaje": "No se proporcionó imagen de perfil"}), 400
    file = request.files['profileImage']
    if file.filename == '':
        return jsonify({"mensaje": "No se seleccionó ningún archivo"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        username = request.form.get('username')
        new_profile_image = f"/uploads/profile_images/{filename}"
        users_collection.update_one(
            {"username": username},
            {"$set": {"profileImage": new_profile_image}}
        )
        return jsonify({"mensaje": "Imagen de perfil actualizada correctamente", "profileImage": new_profile_image})
    return jsonify({"mensaje": "Archivo no permitido"}), 400

@usuarios_bp.route('/updateProfile', methods=['POST'])
def update_profile():
    data = request.json
    username = data.get('username')
    new_username = data.get('newUsername')
    new_password = data.get('newPassword')

    update_fields = {}
    if new_username:
        update_fields["username"] = new_username
    if new_password:
        update_fields["password"] = bcrypt.hash(new_password)

    if not update_fields:
        return jsonify({"mensaje": "No se proporcionaron cambios"}), 400

    result = users_collection.update_one(
        {"username": username},
        {"$set": update_fields}
    )
    if result.modified_count > 0:
        updated_user = users_collection.find_one({"username": new_username or username})
        return jsonify({
            "mensaje": "Perfil actualizado correctamente",
            "usuario": {
                "username": updated_user["username"],
                "profileImage": updated_user.get("profileImage", "/uploads/profile_images/default.png")
            }
        })
    else:
        return jsonify({"mensaje": "No se realizaron cambios"}), 400

# Favorites existentes
@usuarios_bp.route('/favorites', methods=['GET'])
def get_favorites():
    username = request.args.get('username')
    user_favorites = favorites_collection.find_one({"username": username})
    if user_favorites:
        return jsonify({"favorites": user_favorites["champions"]})
    else:
        return jsonify({"favorites": []})

@usuarios_bp.route('/favorites', methods=['POST'])
def add_favorite():
    data = request.json
    username = data["username"]
    champ_id = data["champId"]
    user_favorites = favorites_collection.find_one({"username": username})
    if not user_favorites:
        favorites_collection.insert_one({"username": username, "champions": [champ_id]})
    else:
        if champ_id not in user_favorites["champions"]:
            favorites_collection.update_one(
                {"username": username},
                {"$push": {"champions": champ_id}}
            )
    return jsonify({"mensaje": "Favorito añadido correctamente"})

@usuarios_bp.route('/favorites', methods=['DELETE'])
def remove_favorite():
    data = request.json
    username = data["username"]
    champ_id = data["champId"]
    favorites_collection.update_one(
        {"username": username},
        {"$pull": {"champions": champ_id}}
    )
    return jsonify({"mensaje": "Favorito eliminado correctamente"})


# --- NUEVAS RUTAS DE COMENTARIOS ---

@usuarios_bp.route('/comments', methods=['POST'])
def add_comment():
    data = request.json
    username = data.get("username")
    champ_id = data.get("champId")
    text = data.get("comment")
    if not all([username, champ_id, text]):
        return jsonify({"mensaje": "Faltan datos"}), 400

    comment_doc = {
        "username": username,
        "champId": champ_id,
        "comment": text,
        "createdAt": datetime.utcnow()
    }
    comments_collection.insert_one(comment_doc)
    return jsonify({"mensaje": "Comentario añadido correctamente"})

@usuarios_bp.route('/comments', methods=['GET'])
def get_comments_by_champ():
    champ_id = request.args.get("champId")
    if not champ_id:
        return jsonify({"mensaje": "Debe indicar champId"}), 400
    cursor = comments_collection.find({"champId": champ_id}).sort("createdAt", -1)
    comments = [{"username": c["username"], "comment": c["comment"]} for c in cursor]
    return jsonify({"comments": comments})

@usuarios_bp.route('/<username>/comments', methods=['GET'])
def get_user_comments(username):
    cursor = comments_collection.find({"username": username}).sort("createdAt", -1)
    comments = [c["comment"] for c in cursor]
    return jsonify({"comments": comments})

# Registrar blueprint
app.register_blueprint(usuarios_bp, url_prefix="/api/users")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
