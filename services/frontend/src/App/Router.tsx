import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

/* Pages */
import Landing from "pages/Chat";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Landing />} />
      </Route>
    </Routes>
  );
};

export default Router;
