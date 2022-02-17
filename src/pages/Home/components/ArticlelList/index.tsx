import React, { useEffect, useState } from "react";
import ArticlelItem from "pages/Home/components/ArticlelItem";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { getArticleList } from "store/actions/home";
import { useSelector } from "react-redux";
import { PullToRefresh, InfiniteScroll } from "antd-mobile";
import { RootState } from "store";

export default function ArticlelList({
  name,
  id,
}: {
  name: string;
  id: number;
}) {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const current = useSelector((state: RootState) => state.home.articles[id]);

  useEffect(() => {
    if (current) {
      return;
    }
    dispatch(getArticleList({ id: id, timestamp: Date.now().toString() }));
  }, [dispatch, id, current]);
  // 没数据不渲染
  if (!current) return null;
  // 下拉刷新
  const onRefresh = async () => {
    setHasMore(true);
    await dispatch(
      getArticleList({ id: id, timestamp: Date.now().toString() })
    );
  };
  // 上拉加载
  const loadMore = async () => {
    // 节流
    if (loading) {
      return;
    }
    if (current.timestamp) {
      setLoading(true);
      try {
        await dispatch(
          getArticleList({
            id: id,
            timestamp: current.timestamp,
            loadMore: true,
          })
        );
        setLoading(false);
      } catch (e) {
        //TODO handle the exception
        setLoading(false);
      }
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className="articles">
        <PullToRefresh onRefresh={onRefresh}>
          {current.list.map((item, index) => {
            return (
              <div className="article-item" key={index}>
                <ArticlelItem article={item}></ArticlelItem>
              </div>
            );
          })}
        </PullToRefresh>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
}
