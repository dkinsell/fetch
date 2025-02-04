import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
}: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default FormField;
