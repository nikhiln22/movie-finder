import React from "react";
import { Home } from "./Pages/Home";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <Home />
    </div>
  );
};

export default App;
