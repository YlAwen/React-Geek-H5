import React from "react";
import styles from "./index.module.scss";
import Icon from "components/Icon";
type Props = {
  children?: string | React.ReactElement;
  extra?: string | React.ReactElement;
  className?: string;
  leftClick?: () => void;
  rightClick?: () => void;
  rightStyle?: object;
};
export default function NavBar({
  children,
  extra,
  leftClick,
  rightClick,
  rightStyle,
  className,
}: Props) {
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
