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
import { getBooks, deleteBook } from "../api/book";
import {
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagingState, setPagingState] = useState({
    currentPage: 1,
    pageSize: 5,
    total: 0,
  });
  const handleDeleteBook = async () => {
    try {
      setDeleteLoading(true);
      await deleteBook(selectedItem.id);
      notification.success({
        message: (
          <Typography.Title level={5} type="success">
            Success
          </Typography.Title>
        ),
        description: (
          <Alert
            message="Book deleted successfully"
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
            message="Book deleted failed"
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
      render: (book) => book?.Category.name,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Cover Image",
      key: "coverImage",
      render: (book) => {
        return (
          <Image src={book.image} width={200} title="Preview" alt="preview" />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (book) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button href={book.downloadUrl} type="primary">
              <DownloadOutlined />
            </Button>
            <Button onClick={() => navigate(`/edit-book/${book.id}`)}>
              <EditOutlined />
            </Button>
            <Button type="ghost" danger onClick={() => setSelectedItem(book)}>
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    (async () => {
      const { data } = await getBooks(pagingState);
      setPagingState((prev) => ({
        ...prev,
        total: data.total,
        currentPage: Number(data.currentPage),
      }));
      setBooks(data.books);
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
        dataSource={books}
        columns={columns}
        loading={loading}
      />
      {!!selectedItem && (
        <Modal
          title="Delete book"
          visible={!!selectedItem}
          onCancel={() => setSelectedItem(null)}
          footer={
            <>
              <Button danger onClick={handleDeleteBook} loading={deleteLoading}>
                Delete
              </Button>
              <Button onClick={() => setSelectedItem(null)}>Cancel</Button>
            </>
          }
        >
          <Typography>Do you want to delete this book ?</Typography>
        </Modal>
      )}
    </>
  );
};
