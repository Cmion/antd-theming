import { Descriptions, Badge, Modal, Button } from "antd";
import React, { useState } from "react";

const Main = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: 40,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Button onClick={() => setVisible(true)}>Open</Button>
        <Modal width={820} visible={visible} onCancel={() => setVisible(false)}>
          <Descriptions title="User Info" bordered>
            <Descriptions.Item label="Product">
              Cloud Database
            </Descriptions.Item>
            <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
            <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
            <Descriptions.Item label="Order time">
              2018-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Usage Time" span={2}>
              2019-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text="Running" />
            </Descriptions.Item>
            <Descriptions.Item label="Negotiated Amount">
              $80.00
            </Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official Receipts">
              $60.00
            </Descriptions.Item>
            <Descriptions.Item label="Config Info">
              Data disk type: MongoDB
              <br />
              Database version: 3.4
              <br />
              Package: dds.mongo.mid
              <br />
              Storage space: 10 GB
              <br />
              Replication factor: 3
              <br />
              Region: East China 1<br />
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </div>
      <div style={{ padding: 20 }}>
        <Descriptions title="User Info" bordered>
          <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
          <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
          <Descriptions.Item label="Order time">
            2018-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="Usage Time" span={2}>
            2019-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge status="processing" text="Running" />
          </Descriptions.Item>
          <Descriptions.Item label="Negotiated Amount">
            $80.00
          </Descriptions.Item>
          <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
          <Descriptions.Item label="Official Receipts">
            $60.00
          </Descriptions.Item>
          <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication factor: 3
            <br />
            Region: East China 1<br />
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};
export default Main;
