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
import { UserOutlined, LockOutlined, UploadOutlined } from "@ant-design/icons";
import { CategoriesSelector } from "../components/selectors/CategoriesSelector";
import { useState, useMemo } from "react";
import { addNewProduct } from "../api/product";
import { upLoadFile } from "../utils/uploadFile";
import { deleteFile } from "../utils/deleteFile";
import { generateUUID } from "../utils/uuid";
import { getDownloadURL } from "firebase/storage";

export const NewProduct = () => {
  const [form] = Form.useForm();
  const [coverImage, setCoverImage] = useState({
    fileList: [],
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await addNewProduct({
        ...values,
        categoryId: values.categories,
        image: coverImage.url,
        downloadUrl: product,
      });
      form.resetFields();
      setCoverImage({
        fileList: [],
        url: "",
      });
      setProduct("");
      notification.success({
        message: (
          <Typography.Title level={5} type="success">
            Success
          </Typography.Title>
        ),
        description: (
          <Alert
            message="Product added successfully"
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
            <Form.Item name="description">
              <Input.TextArea
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="text"
                placeholder="Description"
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
                      `products/cover-image/${uuid}/${e.fileList[0].name}`
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
                    `products/cover-image/${uuid}/${coverImage.fileList[0].name}`
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
            <Form.Item
              name="product"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your product!",
              //   },
              // ]}
            >
              <Upload
                onChange={(e) => {
                  upLoadFile(
                    e.fileList[0].originFileObj,
                    `products/content/${uuid}/${e.fileList[0].name}`
                  ).then((url) => setProduct(url));
                }}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name="categories"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your category!",
              //   },
              // ]}
            >
              <CategoriesSelector
                name="categories"
                onChange={(value) => form.setFieldsValue({ categories: value })}
              />
            </Form.Item>
          </Col>

          <Col span={14}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}>
                Add new product
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
