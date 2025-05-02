import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Importamos el hook para acceder al contexto
import Cookies from "js-cookie";

export default function NavPrincipal() {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <nav className="flex justify-between p-6 bg-gray-900 text-white shadow-lg ">
      <div className="space-x-6 flex items-center">
        <Link
          to="/"
          className="text-xl font-semibold hover:text-indigo-500 transform transition duration-200 hover:translate-y-1"
        >
          Inicio
        </Link>
        <Link
          to="/Favorites"
          className="text-xl font-semibold hover:text-indigo-500 transform transition duration-200 hover:translate-y-1"
        >
          Favoritos
        </Link>
        <Link
          to="/ItemsPage"
          className="text-xl font-semibold hover:text-indigo-500 transform transition duration-200 hover:translate-y-1"
        >
          Ítems
        </Link>
      </div>

      <div className="space-x-6 flex items-center">
        {user ? (
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <img
                src={`http://localhost:5000/api/users/${user.profileImage}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 transition duration-300 hover:scale-110"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-indigo-500 hover:text-indigo-300 transition duration-200"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/LoginForm"
              className="text-sm font-medium hover:text-indigo-500 transform transition duration-200 hover:translate-y-1"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/RegisterForm"
              className="text-sm font-medium hover:text-indigo-500 transform transition duration-200 hover:translate-y-1"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
