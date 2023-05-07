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
import { getProducts, deleteProduct } from "../api/product";
import {
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagingState, setPagingState] = useState({
    currentPage: 1,
    pageSize: 5,
    total: 0,
  });
  const handleDeleteProduct = async () => {
    try {
      setDeleteLoading(true);
      await deleteProduct(selectedItem.id);
      notification.success({
        message: (
          <Typography.Title level={5} type="success">
            Success
          </Typography.Title>
        ),
        description: (
          <Alert
            message="Product deleted successfully"
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
            message="Product deleted failed"
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      key: "category",
      render: (product) => product?.Category.name,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Cover Image",
      key: "coverImage",
      render: (product) => {
        return (
          <Image
            src={product.image}
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
      render: (product) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}>
            <Button href={product.downloadUrl} type="primary">
              <DownloadOutlined />
            </Button>
            <Button onClick={() => navigate(`/edit-product/${product.id}`)}>
              <EditOutlined />
            </Button>
            <Button
              type="ghost"
              danger
              onClick={() => setSelectedItem(product)}>
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    (async () => {
      const { data } = await getProducts(pagingState);
      setPagingState((prev) => ({
        ...prev,
        total: data.total,
        currentPage: Number(data.currentPage),
      }));
      setProducts(data.products);
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
        dataSource={products}
        columns={columns}
        loading={loading}
      />
      {!!selectedItem && (
        <Modal
          title="Delete product"
          visible={!!selectedItem}
          onCancel={() => setSelectedItem(null)}
          footer={
            <>
              <Button
                danger
                onClick={handleDeleteProduct}
                loading={deleteLoading}>
                Delete
              </Button>
              <Button onClick={() => setSelectedItem(null)}>Cancel</Button>
            </>
          }>
          <Typography>Do you want to delete this product ?</Typography>
        </Modal>
      )}
    </>
  );
};
