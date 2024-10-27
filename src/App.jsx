import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Error from "./ui/Error";

import Menu from "./features/menu/Menu";
import { menuLoader } from "./features/menu/menuLoader";

import Order from "./features/order/Order";
import { orderLoader } from "./features/order/orderLoader";
import { action as updateOrderAction } from "./features/order/updateOrderAction";

import CreateOrder from "./features/order/CreateOrder";
import { createOrderAction } from "./features/order/createOrderAction";

import Cart from "./features/cart/Cart";
import AppLayout from "./ui/AppLayout";

export default function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />, // 根路由
      errorElement: <Error />, // 错误处理
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
          errorElement: <Error />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: createOrderAction,
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          errorElement: <Error />,
          loader: orderLoader,
          action: updateOrderAction,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}>
      <AppLayout />
    </RouterProvider>
  );
}
