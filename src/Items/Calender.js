import { Calendar, Layout, Space, Switch } from "antd";
import React from "react";

function onPanelChange(value, mode) {
  console.log(value.format("YYYY-MM-DD"), mode);
}
const { Content } = Layout;

const Main = () => {
  let onChange = () => null;
  return (
    <Content style={{ padding: 20 }}>
      <Space direction="vertical">
        <Switch defaultChecked onChange={onChange} />
        <Switch defaultChecked onChange={onChange} />
        <div style={{ width: 320, minHeight: 300 }}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
        <Calendar onPanelChange={onPanelChange} />
      </Space>
    </Content>
  );
};

export default Main;
