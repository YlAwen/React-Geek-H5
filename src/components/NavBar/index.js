import React from "react";
import styles from "./index.module.scss";
import Icon from "components/Icon";
export default function NavBar({
  children,
  extra,
  leftClick,
  rightClick,
  rightStyle,
  className,
}) {
  return (
    <div className={styles.root + " " + className}>
      <div className="left">
        <Icon type="iconfanhui" onClick={leftClick}></Icon>
      </div>
      <div className="title">{children}</div>
      <div className="right" style={rightStyle} onClick={rightClick}>
        {extra}
      </div>
    </div>
  );
}
