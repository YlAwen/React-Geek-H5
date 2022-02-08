import React from "react";
import NavBar from "components/NavBar";
import Input from "components/Input";
import styles from "./index.module.scss";

export default function Login() {
  const onExtraClick = () => {
    console.log(1);
  };
  return (
    <div className={styles.root}>
      {/* 标题 */}
      <NavBar></NavBar>
      {/* 表单内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form>
          <div className="input-item">
            <Input placeholder="请输入手机号"></Input>
            {/* <div className="validate">手机号错误</div> */}
          </div>
          <div className="input-item">
            <Input
              placeholder="请输入验证码"
              extra="获取验证码"
              onExtraClick={onExtraClick}
            ></Input>
            {/* <div className="validate">验证码错误</div> */}
          </div>
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  );
}
