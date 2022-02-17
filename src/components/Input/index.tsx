import React from "react";
import styles from "./index.module.scss";
type Props = {
  className?: string;
  onExtraClick?: () => void;
  extra?: string;
  placeholder?: string;
  value?: string;
  onKeyUp?: any;
  onChange?: any;
  onBlur?: () => void;
  name?: string;
};
export default function Input({
  className,
  onExtraClick,
  extra,
  placeholder,
  value,
  onKeyUp,
  onChange,
  name,
  onBlur,
}: Props) {
  return (
    <div className={styles.root}>
      <input
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
        placeholder={placeholder}
        className={`input ${className}`}
        name={name}
        onBlur={onBlur}
      />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  );
}
