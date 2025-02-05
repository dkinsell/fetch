import React, { useState, useRef } from "react";

interface ZipCodeInputProps {
  initialValue: string;
  onBlurChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  className?: string;
}
// Component that renders a zip code input field with a placeholder and optional class name
const ZipCodeInput = ({
  initialValue,
  onBlurChange,
  id,
  placeholder,
  className,
}: ZipCodeInputProps) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onBlurChange(value)}
      placeholder={placeholder}
      className={className}
    />
  );
};

// Export as a memoized component to optimize rendering performance
export default React.memo(ZipCodeInput);
