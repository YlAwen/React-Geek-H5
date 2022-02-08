import React from "react";
import styles from "./index.module.scss";
export default function Input({ onExtraClick, extra, ...rest }) {
  return (
    <div className={styles.root}>
      <input {...rest} className="input" name="" id="" />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  );
}
