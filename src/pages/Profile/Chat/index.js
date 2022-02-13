import Icon from "components/Icon";
import Input from "components/Input";
import NavBar from "components/NavBar";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTokenInfo } from "utils/storage";
import styles from "./index.module.scss";
import io from "socket.io-client";
import { Toast } from "antd-mobile";
import { useDispatch } from "react-redux";
import { getUser } from "store/actions/profile";
const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 聊天记录
  const [messageList, setMessageList] = useState([
    // 放两条初始消息
    { type: "robot", text: "亲爱的用户您好，小智同学为您服务。" },
    { type: "user", text: "你好" },
  ]);
  const [msg, setMsg] = useState("");
  const client = useRef(null);
  const listRef = useRef(null);
  const user = useSelector((state) => state.profile.user);
  // 回车
  const onKeyUp = (e) => {
    if (e.keyCode !== 13) return;
    if (msg.trim() === "") {
      Toast.show({
        content: "请输入内容后提交",
      });
      setMsg("");
      return;
    }
    setMessageList([...messageList, { type: "user", text: msg }]);
    client.current.emit("message", {
      msg,
      timestamp: Date.now(),
    });
    setMsg("");
  };
  // 挂载
  useEffect(() => {
    dispatch(getUser());
    client.current = io("http://geek.itheima.net", {
      query: {
        token: getTokenInfo().token,
      },
      transports: ["websocket"],
    });
    client.current.on("connect", () => {
      setMessageList((messageList) => {
        return [
          ...messageList,
          { type: "robot", text: "我是小智，有什么想要问我的？" },
        ];
      });
    });
    client.current.on("message", (res) => {
      setMessageList((messageList) => {
        return [
          ...messageList,
          { type: "robot", text: res.msg.replace(/{.*}(.*)/, "$1") },
        ];
      });
    });
    return () => {
      client.current.close();
    };
  }, [dispatch]);
  // messageList改变
  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messageList]);

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        className="fixed-header"
        leftClick={() => navigate("/home/profile")}
      >
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={listRef}>
        {messageList.map((item, index) => {
          if (item.type === "robot") {
            /* 机器人的消息 */
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            );
          } else {
            /* 用户的消息 */
            return (
              <div className="chat-item user" key={index}>
                <img
                  src={
                    user.photo || "https://ylawen.github.io/assets/img/Logo.png"
                  }
                  alt=""
                />
                <div className="message">{item.text}</div>
              </div>
            );
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={msg}
          onKeyUp={onKeyUp}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  );
};

export default Chat;
