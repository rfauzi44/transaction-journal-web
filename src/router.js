import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./helper/privateRoute";

import Signup from "./page/Signup";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Profile from "./page/Profile";

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default router;
