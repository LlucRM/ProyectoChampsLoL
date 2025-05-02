from flask import Flask, request, jsonify
from flask_cors import CORS
from usuarios import usuarios_bp
from pymongo import MongoClient
app = Flask(__name__)
CORS(app)


app.register_blueprint(usuarios_bp, url_prefix="/api/users")
  

client = MongoClient("mongodb://localhost:27017/")
db = client["lol_database"]
favorites_collection = db["favorites"]

@app.route("/api/favorites", methods=["GET"])
def get_favorites():
    favorites = list(favorites_collection.find({}, {"_id": 0}))
    return jsonify(favorites)

@app.route("/api/favorites", methods=["POST"])
def add_favorite():
    data = request.json
    if not data:
        return jsonify({"message": "No data sent"}), 400

    if favorites_collection.find_one({"id": data["id"]}):
        return jsonify({"message": "Campeón ya está en favoritos"}), 400

    favorites_collection.insert_one(data)
    return jsonify({"message": "Favorito añadido correctamente"})

@app.route("/api/favorites/<champion_id>", methods=["DELETE"])
def remove_favorite(champion_id):
    result = favorites_collection.delete_one({"id": champion_id})
    if result.deleted_count == 0:
        return jsonify({"message": "Campeón no encontrado"}), 404
    return jsonify({"message": "Favorito eliminado correctamente"})



if __name__ == "__main__":
    app.run(debug=True)
