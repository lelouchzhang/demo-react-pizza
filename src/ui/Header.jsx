import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-stone-200 bg-yellow-400 p-4 uppercase">
      <Link to="/" className="uppercase tracking-widest">
        fast react pizza co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
