import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
// import App from "../pages/App"; // --> Firebase component
// import ErrorBoundary from "../ErrorPages/ErrorBoundary";
// import { ComponentThatErrors } from "../ErrorPages/ComponentThatErrors";

export const Root = () => {
  return (
    <div className="root">
      <Box>
        <Navigation />
        {/* <App /> */}
        <Outlet />
      </Box>
    </div>
  );
};

// export const Root = () => {
//   return (
//     <>
//       <div>
//       <ErrorBoundary>
//         <ComponentThatErrors />
//         <Box>
//           <Navigation />
//           {/* <App /> */}
//           <Outlet />
//         </Box>
//       </ErrorBoundary>
//       </div>
//     </>
//   );
// };
