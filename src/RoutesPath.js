import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GraphicalAnalytics from "./pages/GraphicalAnalytics";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/graphicalAnalytics",
    element: <GraphicalAnalytics />,
  },
]);

// import * as React from "react";
// import { createBrowserRouter } from "react-router-dom";
// import Login from "./pages/Login";

// export const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
// ]);
