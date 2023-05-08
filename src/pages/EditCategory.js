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
  Spin,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState, useMemo, useEffect } from "react";
import { upLoadFile } from "../utils/uploadFile";
import { generateUUID } from "../utils/uuid";
import { useParams, useNavigate } from "react-router-dom";
import { getDownloadURL } from "firebase/storage";
import { getCategoryById, updateCategory } from "../api/category";

export const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initEditValues, setInitEditValues] = useState({});

  const [form] = Form.useForm();
  const [coverImage, setCoverImage] = useState({
    fileList: [],
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  useEffect(() => {
    setInitLoading(true);
    getCategoryById(id).then(({ data }) => {
      setCoverImage((prev) => ({
        ...prev,
        url: data.category.image,
      }));
      setInitEditValues({
        id: data.category.id,
        name: data.category.name,
      });
      form.setFieldsValue({
        id: data.category.id,
        name: data.category.name,
      });
      setInitLoading(false);
    });
  }, [id, form]);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updateCategory(id, {
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
            message="Category update successfully"
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
      navigate("/categories");
      setLoading(false);
    }
  };

  const uuid = useMemo(() => generateUUID(), []);

  if (initLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <Spin />;
      </div>
    );

  return (
    <>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          image: [],
          ...initEditValues,
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
                  message: "Please input your category name!",
                },
              ]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="name"
              />
            </Form.Item>
          </Col>

          <Col span={14}>
            <Form.Item name="image">
              {coverImage.fileList.length > 0 || !!coverImage.url ? (
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
                  {!coverImage.fileList.length && !coverImage.url && "Upload"}
                </Upload>
              )}
            </Form.Item>
            {(coverImage.fileList.length > 0 || !!coverImage.url) && (
              <Button
                type="danger"
                style={{ marginBottom: "1rem" }}
                onClick={async () => {
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
                Update categories
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
