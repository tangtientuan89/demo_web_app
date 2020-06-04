import React from "react";
import "./App.css";
import "antd/dist/antd.less";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Footer from "./compenent/layout/Footer/Footer";
import RouterURL from "./router/RouterURL";
import Header from "./compenent/layout/header/Header";
import {useSelector,useDispatch} from "react-redux"
import cookie from 'react-cookies'
function App() {
  const dispatch = useDispatch()
  const handleAuth =()=>{
    if(cookie.load("token")){
      dispatch({type:"LOGIN"})
    }
    if(cookie.load("type")=="1"){
      dispatch({type:"ISADMIN_TRUE"})
    }
  }
  handleAuth()
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
