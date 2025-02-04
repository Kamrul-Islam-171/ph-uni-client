import { Layout, Menu } from "antd";

import { adminPaths2, adminSidebarItems } from "../../routes/admin.routes";
import { sidebarRoutes } from "../../utils/sidebarGenerator";
import { useAppSelector } from "../../redux/features/hook";
import { selectCurrentUser, useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { VerifyToken } from "../../utils/verifyToken";
import { studentPaths } from "../../routes/student.routes";
import { facultyPaths } from "../../routes/faculty.routes";

const { Sider } = Layout;

const ROLE = {
  Admin: "admin",
  Faculty: "faculty",
  Student: "student",
};

export type TUserRole = {
  id: string;
  role:string;
  iat: number;
  exp:number;
}
const SidebarLayout = () => {
  // const user = useAppSelector(selectCurrentUser)

  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = VerifyToken(token);
  }
  let sidebarItems;

  switch ((user as TUserRole)?.role) {
    case ROLE.Admin:
      sidebarItems = sidebarRoutes(adminPaths2, ROLE.Admin);
      break;
    case ROLE.Faculty:
      sidebarItems = sidebarRoutes(facultyPaths, ROLE.Faculty);
      break;
    case ROLE.Student:
      sidebarItems = sidebarRoutes(studentPaths, ROLE.Student);
      break;

    default:
      break;
  }

  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      >
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          PH UNIVERSITY
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          // items={items}
          // items={adminSidebarItems}
          items={sidebarItems}
        />
      </Sider>
    </>
  );
};

export default SidebarLayout;
