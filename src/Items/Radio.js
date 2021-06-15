import React from "react";
import { Radio, Space, Typography, Select, List, AutoComplete } from "antd";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const plainOptions = ["Apple", "Pear", "Orange"];
const options = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange" },
];
const optionsWithDisabled = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange", disabled: true },
];

class App extends React.Component {
  state = {
    value1: "Apple",
    value2: "Apple",
    value3: "Apple",
    value4: "Apple",
    size: "default",
  };

  setSize = (size) => {
    this.setState({
      size,
    });
  };

  handleSizeChange = (e) => {
    this.setSize(e.target.value);
  };

  onChange1 = (e) => {
    console.log("radio1 checked", e.target.value);
    this.setState({
      value1: e.target.value,
    });
  };

  onChange2 = (e) => {
    console.log("radio2 checked", e.target.value);
    this.setState({
      value2: e.target.value,
    });
  };

  onChange3 = (e) => {
    console.log("radio3 checked", e.target.value);
    this.setState({
      value3: e.target.value,
    });
  };

  onChange4 = (e) => {
    console.log("radio4 checked", e.target.value);
    this.setState({
      value4: e.target.value,
    });
  };

  render() {
    const { value1, value2, value3, value4 } = this.state;
    return (
      <Space direction={"vertical"} size={16}>
        <Typography.Title level={3}>Radio</Typography.Title>
        <Radio.Group
          options={plainOptions}
          onChange={this.onChange1}
          value={value1}
        />
        <br />
        <Radio.Group
          options={optionsWithDisabled}
          onChange={this.onChange2}
          value={value2}
        />
        <br />
        <br />
        <Radio.Group
          options={options}
          onChange={this.onChange3}
          value={value3}
          optionType="button"
        />
        <br />
        <br />
        <Radio.Group
          options={optionsWithDisabled}
          onChange={this.onChange4}
          value={value4}
          optionType="button"
          buttonStyle="solid"
        />
        <br />
        <br />
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} disabled>
          <Option value="lucy">Lucy</Option>
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} loading>
          <Option value="lucy">Lucy</Option>
        </Select>
        <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
          <Option value="lucy">Lucy</Option>
        </Select>
        <br />
        <br />
        <Radio.Group value={this.size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <Select
          size={this.size}
          defaultValue="a1"
          onChange={handleChange}
          style={{ width: 200 }}
        >
          {children}
        </Select>
        <br />
        <Select
          mode="multiple"
          size={this.size}
          placeholder="Please select"
          defaultValue={["a10", "c12"]}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {children}
        </Select>
        <br />
        <Select
          mode="tags"
          size={this.size}
          placeholder="Please select"
          defaultValue={["a10", "c12"]}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {children}
        </Select>
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
        <br />
        <AutoComplete
          style={{ width: 200 }}
          options={[
            { value: 'Burns Bay Road' },
            { value: 'Downing Street' },
            { value: 'Wall Street' },
          ]}
          placeholder="try to type `b`"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Space>
    );
  }
}

export default App;
