import { PrivateLayout } from "./PrivateLayout";
import { Home } from "../pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardFilled, BookOutlined, PlusOutlined } from "@ant-design/icons";
import { NewBook } from "../pages/NewBook";
import { EditBook } from "../pages/EditBook";

export const PrivateRoute = () => {
  const routes = [
    {
      path: "/",
      name: "Home",
      element: <Home />,
      icon: <BookOutlined />,
    },
    {
      path: "/add-book",
      name: "Add new book",
      element: <NewBook />,
      icon: <PlusOutlined />,
    },
    {
      path: "/edit-book/:id",
      name: "Edit book",
      element: <EditBook />,
      icon: <DashboardFilled />,
      hiddenSidebar: true,
    },
  ];

  return (
    <PrivateLayout routes={routes.filter((item) => !item.hiddenSidebar)}>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </PrivateLayout>
  );
};
