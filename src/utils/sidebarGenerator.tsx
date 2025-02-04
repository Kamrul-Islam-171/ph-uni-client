import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type TsideBar = {
  key: string;
  label: ReactNode;
  children?: TsideBar[];
} | undefined;

type TPaths = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TPaths[];
};

export const sidebarRoutes = (items: TPaths[], role:string) => {
  //for dashboard
  //   console.log(role)
  const SidebarItems = items.reduce((acc: TsideBar[], item) => {
    if (item.path && item.name) {
      // console.log("all = ",item.path)
      acc.push({
        key: item.name,
        label: <NavLink to={`${role}/${item.path}`}>{item.name}</NavLink>,
        // label: <NavLink to={`admin/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      // console.log("child = ",item.children)
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`${role}/${child.path}`}>{child.name}</NavLink>
              ),
              //   label: <NavLink to={`admin/${child.path}`}>{child.name}</NavLink>,
            };
          }
        }),
      });
    }
    // console.log("adddd = ",acc)
    return acc;
  }, []);

  // console.log("add sidebar = ", SidebarItems)

  return SidebarItems;
};
