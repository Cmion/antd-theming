import React from "react";
import { Upload, Modal, Space, Typography, message } from "antd";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const { Dragger } = Upload;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
function beforeUpload(file) {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "Random Images",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://source.unsplash.com/random?sig=404",
      },
      {
        uid: "-2",
        name: "image.png",
        status: "done",
        url: "https://source.unsplash.com/random?sig=201",
      },
      {
        uid: "-3",
        name: "image.png",
        status: "done",
        url: "https://source.unsplash.com/random?sig=200",
      },
      {
        uid: "-4",
        name: "image.png",
        status: "done",
        url: "https://source.unsplash.com/random?sig=504",
      },
      {
        uid: "-5",
        name: "image.png",
        url: "https://source.unsplash.com/random?sig=500",
        status: "done",
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: (
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      )
        ?.split?.("_")
        ?.join?.(" ")
        ?.split?.(".")?.[0],
    });
  };

  handleChange = ({ fileList }) => {
    console.log(fileList);
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Space direction={"vertical"} size={16}>
        <Typography.Title level={3}>Upload</Typography.Title>
        <Dragger
          {...{
            name: "file",
            multiple: true,
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            onChange(info) {
              const { status } = info.file;
              if (status !== "uploading") {
                console.log(info.file, info.fileList);
              }
              if (status === "done") {
                message.success(
                  `${info.file.name} file uploaded successfully.`
                );
              } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
            onDrop(e) {
              console.log("Dropped files", e.dataTransfer.files);
            },
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
        <div className="clearfix">
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              className="avatar-uploader"
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              beforeUpload={beforeUpload}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </ImgCrop>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
      </Space>
    );
  }
}

export default PicturesWall;
