import React from "react";
import LoginForm from "./pages/LoginPage";
import Top_Header from "./components/Top_Header";
import Middle_Header from "./components/Middle_Header";
import Bottom_Header from "./components/Bottom_Header";
import SelectField from "./components/SelectField";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
