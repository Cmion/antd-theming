import { Calendar, Layout } from "antd";
import React from "react";

function onPanelChange(value, mode) {
  console.log(value.format("YYYY-MM-DD"), mode);
}
const { Content } = Layout;

const Main = () => {
  return (
    <Content style={{ padding: 20 }}>
      <Calendar onPanelChange={onPanelChange} />
    </Content>
  );
};

export default Main;
