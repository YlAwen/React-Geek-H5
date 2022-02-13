import React, { useState } from "react";
import NavBar from "components/NavBar";
import Input from "components/Input";
import styles from "./index.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { sendCode, login } from "store/actions/login";
import { Toast } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
export default function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  // 表单校验
  const formik = useFormik({
    initialValues: {
      mobile: "",
      code: "",
    },
    // 登录
    onSubmit: async (values) => {
      try {
        await dispatch(login(values));
        Toast.show({
          icon: "success",
          content: "登录成功",
        });
        // 跳转
        navigate(location.state.from.pathname || "/home");
        // navigate("/home");
      } catch (error) {
        Toast.show({
          icon: "fail",
          content: !error.data.message || "",
        });
      }
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("手机号不能为空")
        .matches(/^1[3-9]\d{9}$/, "手机号格式错误"),
      code: Yup.string()
        .required("验证码不能为空")
        .matches(/^\d{6}$/, "验证码格式错误"),
    }),
  });
  // 发送验证码
  const onExtraClick = async () => {
    if (time > 0) return;
    // 手机号正确
    if (/^1[3-9]\d{9}$/.test(formik.values.mobile)) {
      try {
        // 成功
        await dispatch(sendCode(formik.values.mobile));
        Toast.show({
          icon: "success",
          content: "获取验证码成功",
          maskClickable: false,
        });
        setTime(60);
        let timeId = setInterval(() => {
          setTime((time) => {
            if (time <= 0) {
              clearInterval(timeId);
            }
            return time - 1;
          });
        }, 1000);
      } catch (error) {
        // 失败
        Toast.show({
          maskClickable: false,
          content: error.data.message,
        });
      }
      return;
    }
    // 手机号错误
    formik.setTouched({
      mobile: true,
    });
  };
  return (
    <div className={styles.root}>
      {/* 标题 */}
      <NavBar leftClick={() => navigate(-1)}>登录</NavBar>
      {/* 表单内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-item">
            <Input
              placeholder="请输入手机号"
              onChange={formik.handleChange}
              value={formik.values.mobile}
              name="mobile"
              onBlur={formik.handleBlur}
            ></Input>
            {formik.errors.mobile && formik.touched.mobile ? (
              <div className="validate">{formik.errors.mobile}</div>
            ) : null}
          </div>
          <div className="input-item">
            <Input
              placeholder="请输入验证码"
              extra={time > 0 ? `${time}s后获取` : "获取验证码"}
              onExtraClick={onExtraClick}
              onChange={formik.handleChange}
              value={formik.values.code}
              name="code"
              onBlur={formik.handleBlur}
            ></Input>
            {formik.errors.code && formik.touched.code ? (
              <div className="validate">{formik.errors.code}</div>
            ) : null}
          </div>
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  );
}
