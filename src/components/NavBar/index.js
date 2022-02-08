import React from "react";
import styles from "./index.module.scss";
import Icon from "components/Icon";
import { useNavigate } from "react-router-dom";
export default function NavBar({ children, extra }) {
  let navigate = useNavigate();
  const back = () => {
    // 跳回上一页
    navigate(-1);
  };
  return (
    <div className={styles.root}>
      <div className="left">
        <Icon type="iconfanhui" onClick={back}></Icon>
      </div>
      <div className="title">{children}</div>
      <div className="right">{extra}</div>
    </div>
  );
}
