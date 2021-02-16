import React from "react";
import { Col, Image, Row, Layout } from "antd";

const { Content } = Layout;
const Main = () => {
  return (
    <Content style={{ padding: 20 }}>
      <Row gutter={16}>
        {Array(50)
          .fill(20)
          .map((_, index) => {
            return (
              <Col span={4}>
                <Image
                  width={200}
                  src={`https://source.unsplash.com/random?sig=${index + _}`}
                />
              </Col>
            );
          })}
      </Row>
    </Content>
  );
};

export default Main;
