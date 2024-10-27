import React from "react";

import Header from "./Header";
import Loader from "./Loader";

import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

export default function AppLayout() {
  // 加载器指示
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <main className="no-scrollbar mx-auto w-full max-w-3xl">
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}
