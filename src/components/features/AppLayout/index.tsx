import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import getSideBarItems from "../../../utils/Layout/sidebarItems";
import { roles, sideBarItemsKeys } from "../../../utils/types/enums";
import { selectUser } from "../../../redux/selectors";

export const AppLayout = () => {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const items = useMemo(
    () => getSideBarItems(user ? user.role : roles.GUEST),
    [user]
  );

  useEffect(() => {
    const keys = Object(sideBarItemsKeys) as { [key: string]: string };
    delete keys["USER"];

    if (pathname === "/") {
      return setSelectedKeys(["/"]);
    }

    for (let key in keys) {
      const value = keys[key].slice(1);
      if (value && pathname.includes(value)) {
        setSelectedKeys([keys[key]]);
        console.log(keys[key]);
        return;
      }
    }
  }, [pathname]);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "unset" }}>
      <Sider breakpoint="lg">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          onSelect={({ key }) => {
            navigate(key);
            setSelectedKeys([key]);
          }}
        />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
