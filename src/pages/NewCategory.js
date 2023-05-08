import "../App.css";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Alert,
  notification,
  Upload,
  Image,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { addNewCategory } from "../api/category";
import { upLoadFile } from "../utils/uploadFile";
import { deleteFile } from "../utils/deleteFile";
import { generateUUID } from "../utils/uuid";
import { getDownloadURL } from "firebase/storage";

export const NewCategory = () => {
  const [form] = Form.useForm();
  const [coverImage, setCoverImage] = useState({
    fileList: [],
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await addNewCategory({
        ...values,
        image: coverImage.url,
      });
      form.resetFields();
      setCoverImage({
        fileList: [],
        url: "",
      });
      notification.success({
        message: (
          <Typography.Title level={5} type="success">
            Success
          </Typography.Title>
        ),
        description: (
          <Alert
            message="Category added successfully"
            type="success"
            style={{ border: "none" }}
          />
        ),
        duration: 5,
      });
    } catch (e) {
      notification.error({
        message: (
          <Typography.Title level={5} type="danger">
            Error
          </Typography.Title>
        ),
        description: (
          <Alert
            message={e.response.data.message}
            type="error"
            style={{ border: "none" }}
          />
        ),
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const uuid = useMemo(() => generateUUID(), []);

  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          image: [],
        }}
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError>
        <Row justify="center" align="middle">
          <Col span={14}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input Name!",
                },
              ]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
          </Col>

          <Col span={14}>
            <Form.Item name="image">
              {coverImage.fileList.length > 0 ? (
                <Image src={coverImage?.url} alt="cover" />
              ) : (
                <Upload
                  name="image"
                  listType="picture-card"
                  rules={[
                    {
                      required: true,
                      message: "Please input your cover image!",
                    },
                  ]}
                  fileList={[]}
                  // onPreview={handlePreview}
                  onChange={(e) => {
                    const uploadTask = upLoadFile(
                      e.fileList[0].originFileObj,
                      `categories/cover-image/${uuid}/${e.fileList[0].name}`
                    );
                    uploadTask.on(
                      "state_changed",
                      null,
                      (error) => {
                        alert(error);
                      },
                      () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                          (downloadURL) => {
                            setCoverImage({
                              fileList: e.fileList,
                              url: downloadURL,
                            });
                          }
                        );
                      }
                    );
                  }}>
                  {/* <UploadButton /> */}
                  {!coverImage.fileList.length && "Upload"}
                </Upload>
              )}
            </Form.Item>
            {coverImage.fileList.length > 0 && (
              <Button
                type="danger"
                style={{ marginBottom: "1rem" }}
                onClick={async () => {
                  deleteFile(
                    `categories/cover-image/${uuid}/${coverImage.fileList[0].name}`
                  );
                  setCoverImage({
                    fileList: [],
                    url: "",
                  });
                }}>
                Delete
              </Button>
            )}
          </Col>

          <Col span={14}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}>
                Add new categories
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
