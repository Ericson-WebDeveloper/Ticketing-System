import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

type LayoutProps = {};

const Layout = (props: LayoutProps) => {
  const [collapseShow, setCollapseShow] = React.useState<string>("hidden");
  return (
    <div className="flex max-h-max w-full">
      {/* sidebar */}
      <SideBar collapseShow={collapseShow} setCollapseShow={setCollapseShow} />

      {/* content */}
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* top Nav */}
        <NavBar setCollapseShow={setCollapseShow} />
        {/* content */}
        <div className="h-screen w-full px-8 pt-24 pb-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
