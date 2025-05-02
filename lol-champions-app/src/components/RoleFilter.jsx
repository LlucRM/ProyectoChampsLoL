import React from "react";

const RoleFilter = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="mb-12 ">
      <select
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value)}
        className="p-3 rounded-lg bg-gray-800 text-white shadow-lg border-1 m-8"
      >
        <option value="">Filtrar por Rol</option>
        <option value="Top">Top</option>
        <option value="Mid">Mid</option>
        <option value="Jungle">Jungle</option>
        <option value="ADC">ADC</option>
        <option value="Support">Support</option>
      </select>
    </div>
  );
};

export default RoleFilter;
