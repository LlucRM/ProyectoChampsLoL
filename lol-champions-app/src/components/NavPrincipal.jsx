import { NavLink } from "react-router-dom";

function NavPrincipal() {
  return (
    <header className="bg-indigo-900 p-4 shadow-lg">
      <nav>
        <ul className="flex space-x-4 text-white text-lg">
          <li>
            <NavLink to="/"> Inicio </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavPrincipal;
