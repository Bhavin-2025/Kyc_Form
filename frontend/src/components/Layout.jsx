import React from "react";
import Top_Header from "./Top_Header";
import { Outlet } from "react-router-dom";
import Middle_Header from "./Middle_Header";
import Bottom_Header from "./Bottom_Header";

const Layout = () => {
  return (
    <div>
      <Top_Header />
      <Middle_Header />
      <Bottom_Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
