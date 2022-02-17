import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import NavBar from "components/NavBar";
import { removeAll } from "store/actions/profile";
import {
  List,
  DatePicker,
  Popup,
  Input,
  TextArea,
  Toast,
  Picker,
  Dialog,
} from "antd-mobile";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  getUserProfile,
  updateUser,
  updateUserPhoto,
} from "store/actions/profile";
import { logout } from "store/actions/login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
const basicColumns = [
  [
    { label: "男", value: "0" },
    { label: "女", value: "1" },
  ],
];
const gender = [["男"], ["女"]];
export default function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  // 莫名其妙never
  const userProfile = useSelector(
    (state: RootState | any) => state.profile.userProfile
  );
  const [dateVisible, setDateVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [genderVisible, setGenderVisible] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [intro, setIntro] = useState(userProfile.intro);
  // 编辑用户个人资料
  const update = (date: {
    name?: string;
    intro?: string;
    gender?: any;
    birthday?: string;
  }) => {
    // console.log(date);
    setNameVisible(false);
    setIntroVisible(false);
    try {
      dispatch(updateUser(date));
      Toast.show({
        content: "更新信息成功！",
      });
      setTimeout(() => {
        dispatch(getUserProfile());
      }, 200);
    } catch (e) {
      Toast.show({
        content: "更新信息失败，请稍后重试!",
      });
    }
  };
  // 更新头像
  const fileChange = (file: any) => {
    const fd = new FormData();
    fd.append("photo", file);
    try {
      dispatch(updateUserPhoto(fd));
      Toast.show({
        content: "更新信息成功！",
      });
    } catch (error) {}
  };
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  return (
    <>
      <div className={styles.root}>
        <div className="content">
          {/* 顶部导航栏 */}
          <NavBar leftClick={() => navigate("/home/profile")}>个人信息</NavBar>
          <div className="wrapper">
            {/* 列表一：显示头像、昵称、简介 */}
            <List className="profile-list">
              <List.Item
                onClick={() => fileRef.current!.click()}
                arrow
                extra={
                  <span className="avatar-wrapper">
                    <img src={userProfile.photo} alt="" />
                  </span>
                }
              >
                头像
              </List.Item>
              {/* 文件选择框，用于头像图片的上传 */}
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => fileChange(e.target.files![0])}
                ref={fileRef}
              />
              <List.Item
                arrow
                extra={userProfile.name}
                onClick={() => setNameVisible(true)}
              >
                昵称
              </List.Item>
              {/* 修改昵称 */}
              <Popup
                visible={nameVisible}
                onMaskClick={() => {
                  setNameVisible(false);
                }}
                position="right"
                bodyStyle={{ minWidth: "100vw" }}
              >
                <NavBar
                  leftClick={() => {
                    setNameVisible(false);
                    setName(userProfile.name);
                  }}
                  rightClick={() => update({ name })}
                  extra={"确定"}
                >
                  修改昵称
                </NavBar>
                <List>
                  <List.Item>
                    <Input
                      placeholder="请输入昵称"
                      value={name}
                      onChange={(val) => {
                        if (val.trim().length <= 12) {
                          setName(val.trim());
                        }
                      }}
                    />
                  </List.Item>
                </List>
              </Popup>
              <List.Item
                arrow
                extra={<span className="intro">{userProfile.intro}</span>}
                onClick={() => setIntroVisible(true)}
              >
                简介
              </List.Item>
              {/* 修改简介 */}
              <Popup
                visible={introVisible}
                onMaskClick={() => {
                  setIntroVisible(false);
                }}
                position="right"
                bodyStyle={{ minWidth: "100vw" }}
              >
                <NavBar
                  leftClick={() => {
                    setIntroVisible(false);
                    setIntro(userProfile.intro || "");
                  }}
                  rightClick={() => update({ intro })}
                  extra={"确定"}
                >
                  修改简介
                </NavBar>
                <List>
                  <List.Item>
                    <TextArea
                      showCount
                      autoSize
                      maxLength={100}
                      placeholder="请输入简介"
                      value={intro}
                      onChange={(val) => {
                        setIntro(val.trim());
                      }}
                    />
                  </List.Item>
                </List>
              </Popup>
            </List>
            {/* 列表二：显示性别、生日 */}
            <List className="profile-list">
              <List.Item
                onClick={() => setGenderVisible(true)}
                arrow
                extra={gender[userProfile.gender]}
              >
                性别
              </List.Item>
              {/* 修改性别 */}
              <Picker
                columns={basicColumns}
                visible={genderVisible}
                onClose={() => {
                  setGenderVisible(false);
                }}
                value={gender[userProfile.gender]}
                onConfirm={(v) => {
                  update({ gender: v[0] });
                }}
              />
              <List.Item
                arrow
                extra={userProfile.birthday}
                onClick={() => setDateVisible(true)}
              >
                生日
              </List.Item>

              {/* 修改生日 */}
              <DatePicker
                title="选择年月日"
                visible={dateVisible}
                onClose={() => {
                  setDateVisible(false);
                }}
                max={new Date()}
                min={new Date("1900-1-1")}
                onConfirm={(value) => {
                  update({ birthday: dayjs(value).format("YYYY-MM-DD") });
                }}
                value={new Date(userProfile.birthday)}
              />
            </List>
          </div>
        </div>
        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button
            className="btn"
            onClick={() => {
              Dialog.show({
                content: "确认退出吗？",
                closeOnAction: true,

                actions: [
                  [
                    {
                      key: "cancel",
                      text: "取消",
                    },
                    {
                      key: "delete",
                      text: "退出",
                      bold: true,
                      danger: true,
                      onClick() {
                        Toast.show({
                          content: "退出成功！",
                        });
                        dispatch(logout());
                        dispatch(removeAll());
                        navigate("/home");
                      },
                    },
                  ],
                ],
              });
            }}
          >
            退出登录
          </button>
        </div>
      </div>
    </>
  );
}
