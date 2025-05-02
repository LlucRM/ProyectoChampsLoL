// LoginForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUser } from "../context/UserContext"; // Importar el hook

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState("");
  const navigate = useNavigate();

  const { setUser } = useUser(); // Usar el hook para obtener setUser

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.usuario); // Guardamos el usuario en el contexto
      Cookies.set("user", JSON.stringify(data.usuario), { expires: 7 }); // Guardamos el usuario en una cookie por 7 días
      navigate("/"); // Redirigimos al home
      console.log("Usuario recibido:", data.usuario);
    } else {
      setMensajeTipo("error");
    }

    setMensaje(data.mensaje);
  };

  const mensajeStyle =
    mensajeTipo === "error"
      ? "mt-4 text-center text-sm text-red-400"
      : mensajeTipo === "success"
      ? "mt-4 text-center text-sm text-green-400"
      : "";

  return (
    <form
      onSubmit={handleLogin}
      className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex justify-center items-center"
    >
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl text-center font-semibold mb-4">
          Iniciar sesión
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-md border-2 border-transparent focus:ring-2 focus:ring-indigo-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border-2 border-transparent focus:ring-2 focus:ring-indigo-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 rounded-md text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          Iniciar sesión
        </button>

        {mensaje && <p className={mensajeStyle}>{mensaje}</p>}
      </div>
    </form>
  );
}
