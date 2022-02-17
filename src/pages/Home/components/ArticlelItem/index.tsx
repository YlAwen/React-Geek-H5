import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

export default function ArticlelItem({ article }: any) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    setName(article.aut_name.replace(/.{2}(.*)/, "$1"));
    setDate(article.pubdate.replace(/(\d{4}-\d{2}-\d{2}).*/, "$1"));
  }, [article.aut_name, article.pubdate]);

  const type = article.cover.type;
  // console.log(article);
  return (
    <div className={styles.root}>
      <div className={`article-content ${type === 0 ? "none-mt" : ""}`}>
        <h3>{article.title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            <div className="article-img-wrapper">
              <img src={type !== 0 && article.cover.images[0]} alt="" />
            </div>
          </div>
        )}
      </div>
      <div className={`article-info ${type === 0 ? "none-mt" : ""}`}>
        <span>{name}</span>
        <span>{article.comm_count} 评论</span>
        <span>{date}</span>
        {/* <div className="close">
          <Icon type="iconbtn_essay_close"></Icon>
        </div> */}
      </div>
    </div>
  );
}
