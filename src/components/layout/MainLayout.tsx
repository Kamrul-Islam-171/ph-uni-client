import { Button, Layout} from "antd";

import {  Outlet } from "react-router-dom";
import SidebarLayout from "./Sidebar";
import { useAppDispatch } from "../../redux/features/hook";
import { logOut } from "../../redux/features/Auth/AuthSlice";




const { Header, Content, Footer} = Layout;

// const items: MenuProps["items"] = [
//   {
//     key: "Dashboard", // must dite hobe
//     label: <NavLink to={"/admin/dashbord"}>Dashboard</NavLink>,
//   },

//   {
//     key: "User Lists", // must dite hobe
//     label: "User Lists",
//     children: [
//       {
//         key: "create admin",
//         label: <NavLink to={"/admin/create-admin"}>Create Admin</NavLink>,
//       },
//       {
//         key: "create student",
//         label: <NavLink to={"/admin/create-student"}>Create Student</NavLink>,
//       },
//       {
//         key: "create faculty",
//         label: <NavLink to={"/admin/create-faculty"}>Create Faculty</NavLink>,
//       },
//     ],
//   },
// ];

const MainLayout = () => {
  // const {
  //     token: { colorBgContainer, borderRadiusLG },
  //   } = theme.useToken();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut())
  }
  return (
    <Layout style={{ height: "100%" }}>
    <Button onClick={handleLogout}>Logout</Button>
      
      {/* sidebar */}
      <SidebarLayout></SidebarLayout>


      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
     
      </Layout>
    </Layout>
  );
};

export default MainLayout;
