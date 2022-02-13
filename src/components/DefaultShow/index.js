import React from "react";
import { Skeleton } from "antd-mobile";

export default function DefaultShow() {
  return (
    <div style={{ margin: "0px 10px" }}>
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={5} animated />
    </div>
  );
}
