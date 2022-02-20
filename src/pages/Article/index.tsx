import Icon from "components/Icon";
import NavBar from "components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import DefaultShow from "components/DefaultShow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleDetail, getFollow, delFollow } from "store/actions/article";
import DOMPurify from "dompurify";
import { RootState } from "store";
import highlight from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { hasToken } from "utils/storage";
import { Toast } from "antd-mobile";
const Article = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state: RootState) => state.article.detail);
  useEffect(() => {
    dispatch(getArticleDetail(id!));
  }, [dispatch, id]);
  // 未登录跳转
  const follow = (isFollowed: boolean, id: string) => {
    // 是否登录
    if (hasToken()) {
      // 是否关注
      if (isFollowed) {
        dispatch(delFollow(id));
      } else {
        dispatch(getFollow(id));
      }
    } else {
      Toast.show({
        content: "请先登录后尝试！",
      });
      navigate("/home/profile");
    }
  };
  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar className="navBar" leftClick={() => navigate(-1)}>
          {detail.title}
        </NavBar>

        {false ? (
          // 数据正在加载时显示的骨架屏界面
          <DefaultShow></DefaultShow>
        ) : (
          // 数据加载完成后显示的实际界面
          <>
            <div className="wrapper">
              <div className="article-wrapper">
                {/* 文章描述信息栏 */}
                <div className="header">
                  <h1 className="title">{detail.title}</h1>

                  <div className="info">
                    <span>{detail.pubdate?.replace(/(.*) .*/, "$1")}</span>
                    <span>{detail.read_count} 阅读</span>
                    {/* <span>{detail.comm_count} 评论</span> */}
                  </div>

                  <div className="author">
                    <img src={detail.aut_photo} alt="" />
                    <span className="name">
                      {detail.aut_name?.replace(/.{2}(.*)/, "$1")}
                    </span>
                    <span
                      onClick={() => follow(detail.is_followed, detail.aut_id)}
                      className={`follow ${
                        detail.is_followed ? "followed" : ""
                      }`}
                    >
                      {detail.is_followed ? "已关注" : "关注"}
                    </span>
                  </div>
                </div>

                {/* 文章正文内容区域 */}
                <div className="content">
                  <div
                    className="content-html dg-html"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(detail.content),
                    }}
                  ></div>
                  <div className="date">
                    发布文章时间：{detail.pubdate?.replace(/(.*) .*/, "$1")}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Article;
