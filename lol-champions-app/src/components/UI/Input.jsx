import "./Input.css";

export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      className="Input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
