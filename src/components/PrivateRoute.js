import { PrivateLayout } from "./PrivateLayout";
import { Home } from "../pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardFilled, BookOutlined, PlusOutlined } from "@ant-design/icons";
import { NewProduct } from "../pages/NewProduct";
import { EditProduct } from "../pages/EditProduct";

export const PrivateRoute = () => {
  const routes = [
    {
      path: "/",
      name: "Home",
      element: <Home />,
      icon: <BookOutlined />,
    },
    {
      path: "/add-product",
      name: "Add new product",
      element: <NewProduct />,
      icon: <PlusOutlined />,
    },
    {
      path: "/edit-product/:id",
      name: "Edit product",
      element: <EditProduct />,
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
