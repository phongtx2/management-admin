import { PrivateLayout } from "./PrivateLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  DashboardFilled,
  BookOutlined,
  PlusOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { NewProduct } from "../pages/NewProduct";
import { EditProduct } from "../pages/EditProduct";
import { Category } from "../pages/Category";
import { Home } from "../pages/Home";
import { NewCategory } from "../pages/NewCategory";
import { EditCategory } from "../pages/EditCategory";

export const PrivateRoute = () => {
  const routes = [
    {
      path: "/",
      name: "Home",
      element: <Home />,
      icon: <BookOutlined />,
    },
    {
      path: "/categories",
      name: "Categories",
      element: <Category />,
      icon: <MenuOutlined />,
    },
    {
      path: "/add-category",
      name: "Add new category",
      element: <NewCategory />,
      icon: <PlusOutlined />,
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
    {
      path: "/edit-category/:id",
      name: "Edit category",
      element: <EditCategory />,
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
