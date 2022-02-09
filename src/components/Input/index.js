import React from "react";
import styles from "./index.module.scss";
export default function Input({ className, onExtraClick, extra, ...rest }) {
  return (
    <div className={styles.root}>
      <input {...rest} className={`input ${className}`} />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  );
}
