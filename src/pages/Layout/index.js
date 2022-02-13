import React from "react";
import Icon from "components/Icon";
import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutRouter } from "router";
const buttons = [
  { id: 1, title: "首页", path: "/home", icon: "iconbtn_home" },
  { id: 2, title: "问答", path: "/home/question", icon: "iconbtn_qa" },
  { id: 3, title: "视频", path: "/home/video", icon: "iconbtn_video" },
  { id: 4, title: "我的", path: "/home/profile", icon: "iconbtn_mine" },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content">
        <LayoutRouter></LayoutRouter>
      </div>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {buttons.map((item) => {
          return (
            <div
              className={`tabbar-item ${
                item.path === location.pathname && "tabbar-item-active"
              }`}
              key={item.id}
              onClick={() => navigate(item.path)}
            >
              <Icon
                type={`${item.icon}${
                  item.path === location.pathname ? "_sel" : ""
                }`}
              />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
