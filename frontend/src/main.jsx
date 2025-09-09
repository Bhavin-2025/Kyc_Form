import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";

// Modified/New Code
// Import order matters for CSS - Ant Design first, then your custom styles
import "./index.css";
// import "antd/dist/reset.css"; // Or the appropriate import for your Ant Design version

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
