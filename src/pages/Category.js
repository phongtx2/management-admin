import {
  Table,
  Image,
  Button,
  Modal,
  Typography,
  notification,
  Alert,
} from "antd";
import { useEffect, useState } from "react";
import { getCategory, deleteCategory } from "../api/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagingState, setPagingState] = useState({
    currentPage: 1,
    pageSize: 5,
    total: 0,
  });
  const handleDeleteCategory = async () => {
    try {
      setDeleteLoading(true);
      await deleteCategory(selectedItem.id);
      notification.success({
        message: (
          <Typography.Title level={5} type="success">
            Success
          </Typography.Title>
        ),
        description: (
          <Alert
            message="Category deleted successfully"
            type="success"
            style={{ border: "none" }}
          />
        ),
        duration: 5,
      });
      setSelectedItem(null);
      setDeleteLoading(false);
      setLoading(true);
    } catch (e) {
      notification.error({
        message: (
          <Typography.Title level={5} type="success">
            Error
          </Typography.Title>
        ),
        description: (
          <Alert
            message="Category deleted failed"
            type="success"
            style={{ border: "none" }}
          />
        ),
        duration: 5,
      });
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Cover Image",
      key: "coverImage",
      render: (category) => {
        return (
          <Image
            src={category.image}
            width={200}
            title="Preview"
            alt="preview"
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (category) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}>
            <Button onClick={() => navigate(`/edit-category/${category.id}`)}>
              <EditOutlined />
            </Button>
            <Button
              type="ghost"
              danger
              onClick={() => setSelectedItem(category)}>
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    (async () => {
      const { data } = await getCategory(pagingState);
      setPagingState((prev) => ({
        ...prev,
        total: data.total,
        currentPage: Number(data.currentPage),
      }));
      setCategories(data.categories);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, pagingState.currentPage]);

  return (
    <>
      <Table
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 5,
          total: pagingState.total,
        }}
        onChange={(pagination) => {
          setLoading(true);
          setPagingState((prev) => ({
            ...prev,
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
          }));
        }}
        dataSource={categories}
        columns={columns}
        loading={loading}
      />
      {!!selectedItem && (
        <Modal
          title="Delete category"
          visible={!!selectedItem}
          onCancel={() => setSelectedItem(null)}
          footer={
            <>
              <Button
                danger
                onClick={handleDeleteCategory}
                loading={deleteLoading}>
                Delete
              </Button>
              <Button onClick={() => setSelectedItem(null)}>Cancel</Button>
            </>
          }>
          <Typography>Do you want to delete this category ?</Typography>
        </Modal>
      )}
    </>
  );
};
