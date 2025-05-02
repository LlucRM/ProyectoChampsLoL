import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [newUsername, setNewUsername] = useState(user ? user.username : "");
  const [newPassword, setNewPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [newProfileImage, setNewProfileImage] = useState(
    user ? user.profileImage : ""
  );
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else {
      setCheckingAuth(false);
      fetchComments();
    }
  }, [user, navigate]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/users/${user.username}/comments`
      );
      const result = await response.json();
      if (response.ok) {
        setComments(result.comments);
      } else {
        console.error("Error obteniendo los comentarios:", result.mensaje);
      }
    } catch (error) {
      console.error("Error en la solicitud de comentarios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => setNewUsername(e.target.value);
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    validatePassword(password); // Validar la contraseña cuando se cambia
  };

  const handleProfileImageChange = (e) => setNewProfileImage(e.target.files[0]);

  const handleSaveChanges = async () => {
    if (!newUsername.trim()) {
      console.error("El nombre de usuario no puede estar vacío");
      return;
    }

    if (newPassword.trim() && newPassword.length < 6) {
      console.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    let updatedData = { username: newUsername, password: newPassword };

    if (
      (newUsername.trim() && newUsername !== user.username) ||
      newPassword.trim() !== ""
    ) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/updateProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user.username,
              newUsername:
                newUsername.trim() !== user.username ? newUsername : null,
              newPassword: newPassword.trim() || null,
            }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          setUser(result.usuario); // Actualiza el estado de usuario con la nueva información
        } else {
          console.error("Error actualizando perfil:", result.mensaje);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }

    if (newProfileImage) {
      const formData = new FormData();
      formData.append("profileImage", newProfileImage);
      formData.append("username", user.username);

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/updateProfileImage",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (response.ok && result.profileImage) {
          updatedData.profileImage = result.profileImage;
          setUser({ ...user, ...updatedData }); // Actualiza el perfil con la nueva imagen
        } else {
          console.error("Error subiendo la imagen:", result.mensaje);
        }
      } catch (error) {
        console.error("Error subiendo la imagen:", error);
      }
    }
  };

  const validatePassword = (password) => {
    // Validación simple de la contraseña (mínimo 6 caracteres)
    const isValid = password.length >= 6;
    setPasswordValid(isValid);
  };

  if (checkingAuth) return <div>Cargando...</div>;

  let previewImage;

  if (user && newProfileImage instanceof File) {
    previewImage = URL.createObjectURL(newProfileImage);
  } else if (user) {
    previewImage = `http://localhost:5000/api/users/${user.profileImage}`;
  } else {
    previewImage = "ruta/a/imagen/default.png"; // Imagen por defecto o redirigir a login
  }

  return (
    <div className="bg-[url('/Fondo2.jpg')] bg-fixed bg-cover bg-center min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto bg-gray-900 text-white mt-10 p-8 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-4xl font-bold text-indigo-400">
          Perfil de {user.username}
        </h2>

        <div className="flex flex-col items-center space-y-4">
          <img
            src={previewImage}
            alt="Imagen de perfil"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg"
          />

          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition"
          >
            Cambiar imagen
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Cambiar nombre
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={handleUsernameChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Cambiar contraseña
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {!passwordValid && (
            <p className="text-red-500 text-sm mt-1">
              La contraseña debe tener al menos 6 caracteres.
            </p>
          )}
        </div>

        <button
          onClick={handleSaveChanges}
          className="w-full py-3 bg-indigo-600 rounded-xl text-white font-bold hover:bg-indigo-700 transition duration-200"
        >
          Guardar cambios
        </button>

        <div>
          <h3 className="text-2xl text-indigo-300 mt-8">Comentarios</h3>
          <ul className="divide-y divide-gray-700 mt-4">
            {isLoading ? (
              <div>Cargando comentarios...</div>
            ) : (
              comments.map((comment, index) => (
                <li key={index} className="py-2 text-left">
                  {comment}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
