import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./layout.scss";

let navBarItems:any = [
  {
    title: "Home",
    route: "",
  },
  {
    title: "About",
    route: "about",
  },
  {
    title: "DropDown",
    route: "login",
    dropDown: [
      {
        title: "Action",
        route: "action",
      },
      {
        title: "Separated link",
        route: "separated-link",
      },
    ],
  },
];

function Layout() {
  let auth = localStorage.getItem('auth');
  let userinfo: any = {};
  if (auth && auth.length > 0) {
    userinfo = {
      email: 'mafa@gmail.com'
    }
  }
  return (
    <div className="containerMain">
      
      <NavBar items={navBarItems} userInfo={userinfo}  />
      <Outlet />
    </div>
  );
}

export default Layout;