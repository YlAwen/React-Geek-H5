import React, { useEffect } from "react";
import Icon from "components/Icon";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "store/actions/profile";
import { useSelector } from "react-redux";
import { hasToken } from "utils/storage";
import { Link } from "react-router-dom";
import { RootState } from "store";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 莫名其妙never
  const user = useSelector((state: RootState | any) => state.profile.user);
  // 获取用户信息;
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 顶部个人信息区域 */}
        <div className="user-info">
          <div className="avatar">
            <img
              src={user.photo || "https://ylawen.github.io/assets/img/Logo.png"}
              alt=""
            />
          </div>
          <div
            className="user-name"
            onClick={() => (hasToken() ? "" : navigate("/login"))}
          >
            {user.name || "未登录"}
          </div>
          <Link to="/home/profile/edit" className="link">
            个人信息 <Icon type="iconbtn_right" />
          </Link>
        </div>
        {/* 今日阅读区域 */}
        {
          <div className="read-info">
            <Icon type="iconbtn_readingtime" />
            今日阅读 <span>10</span> 分钟
          </div>
        }
        {/* 统计信息区域 */}
        <div className="count-list">
          <div className="count-item">
            <p>{user.art_count || 0}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{user.follow_count || 0}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{user.fans_count || 0}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{user.like_count || 0}</p>
            <p>点赞</p>
          </div>
        </div>
        {/* 主功能菜单区域 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type="iconbtn_mymessages" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_mycollect" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_history1" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_myworks" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务菜单区域 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div
            className="service-item"
            // onClick={() => navigate("/profile/feedback")}
          >
            <Icon type="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          <div
            className="service-item"
            onClick={() => navigate("/home/profile/chat")}
          >
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  );
}
