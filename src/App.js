import React from "react";
import "./App.css";
import "antd/dist/antd.less";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Footer from "./compenent/layout/Footer/Footer";
import RouterURL from "./router/RouterURL";
import Header from "./compenent/layout/header/Header";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header/>
        <RouterURL />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
