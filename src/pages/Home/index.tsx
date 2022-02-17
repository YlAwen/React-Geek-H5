import React, { useEffect } from "react";
import { Tabs } from "antd-mobile";
import { getChannels } from "store/actions/home";
import { useDispatch, useSelector } from "react-redux";
import ArticlelList from "pages/Home/components/ArticlelList";
import { RootState } from "store";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);
  const channels = useSelector((state: RootState) => state.home.channels);
  return (
    <div style={{ height: "100vh" }}>
      <Tabs defaultActiveKey="0">
        {channels.map((item) => {
          return (
            <Tabs.Tab title={item.name} key={item.id}>
              <ArticlelList id={item.id} name={item.name}></ArticlelList>
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
