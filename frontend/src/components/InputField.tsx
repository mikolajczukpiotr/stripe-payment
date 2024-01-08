// InputField.tsx
import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
}

export const InputField = ({
  label,
  value,
  error,
  onChange,
}: InputFieldProps) => (
  <div>
    <label className="label">{label}</label>
    <input
      className={`input ${error ? "input-error" : ""}`}
      type="text"
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="error-text">{error}</p>}
  </div>
);
