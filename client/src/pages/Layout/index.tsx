import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./style.css";

let navBarItems:any = [
  {
    key: 1,
    title: "Home",
    route: "",
  },
  {
    key: 2,
    title: "Todo List",
    route: "todolist",
  },
  {
    key: 3,
    title: "About",
    route: "about",
  },
  {
    key: 4,
    title: "DropDown",
    route: "login",
    dropDown: [
      {
        key: 5,
        title: "Action",
        route: "action",
      },
      {
        key: 6,
        title: "Separated link",
        route: "separated-link",
      },
    ],
  },
];

function Layout() {
  const [userInfo , setUserInfo] = useState({})
  
  return (
    <div className="containerMain">
      <NavBar items={navBarItems} />
      <Outlet />
    </div>
  );
}

export default Layout;