import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Landing from "../pages/Landing";

/* Components */
import ProtectedRoute from "components/ProtectedRoute";
import Prefecth from "components/Prefetch";

/* Pages */
// Landing
import Roadmap from "pages/Roadmap";
import NewCommunity from "pages/NewCommunity";

// General
import Dashboard from "pages/Dashboard";

// Members
import ListMembers from "pages/ListMembers";
import NewMember from "pages/NewMember";

// Financing
import Invest from "pages/Invest";
import ListCrowdloans from "pages/ListCrowdloans";
import NewCrowdloan from "pages/NewCrowdloan";

// Governance
import ListProposals from "pages/ListProposals";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Landing />} />
        <Route path="create-community" element={<NewCommunity />} />
        <Route path="open-crowdloans" element={<Invest />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Prefecth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<ListMembers />} />
            <Route path="new-member" element={<NewMember />} />
            <Route path="crowdloans" element={<ListCrowdloans />} />
            <Route path="governance" element={<ListProposals />} />
            <Route path="new-crowdloan" element={<NewCrowdloan />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
