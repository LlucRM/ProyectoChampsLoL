import { NavLink } from "react-router-dom";

function NavPrincipal() {
  return (
    <header className="bg-gray-600 p-4 shadow-lg">
      <nav>
        <ul className="flex space-x-4 text-white text-lg">
          <li>
            <NavLink to="/"> Inicio </NavLink>
          </li>
          <li>
            <NavLink to="/Champion/Draven"> DRAVENNNN</NavLink>
          </li>
          <li>
            <NavLink to="/favorites">Favoritos</NavLink>
          </li>
          <li>
            <NavLink to="/ItemsPage">Items</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavPrincipal;
