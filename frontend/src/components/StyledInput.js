import React from 'react';

function StyledInput({ label, name, type = 'text', value, onChange, required, placeholder }) {
  return (
    <label className="block text-sm">
      <span className="text-slate-700 font-medium">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
      />
    </label>
  );
}

export default StyledInput;
