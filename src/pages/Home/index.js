import React from "react";
import Icon from "components/Icon";
import styles from "./index.module.scss";

export default function Home() {
  return (
    <div className={styles.root}>
      Home
      <Icon type="iconfanhui" className={"big"}></Icon>
    </div>
  );
}
