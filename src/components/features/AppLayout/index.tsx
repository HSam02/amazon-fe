import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { PlusOutlined } from "@ant-design/icons";
import { ProductForm } from "../ProductForm";
import useSideBarItems from "../../../utils/Layout/sidebarItems";
import { roles, sideBarItemsKeys } from "../../../utils/types/enums";
import { selectUser } from "../../../redux/selectors";
import { useTranslation } from "react-i18next";

export const AppLayout = () => {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sBItems = useSideBarItems(user ? user.role : roles.GUEST);

  const items = useMemo(() => {
    if (user && user.role !== roles.GUEST) {
      return [
        ...sBItems,
        {
          key: "add",
          icon: <PlusOutlined />,
          label: t("add_product"),

          onClick: (e: any) => {
            e.domEvent.preventDefault();
            setIsModalOpen(true);
          },
        },
      ];
    }
    return sBItems;
  }, [user, t]);

  useEffect(() => {
    const keys = Object(sideBarItemsKeys) as { [key: string]: string };
    delete keys["USER"];

    if (pathname === "/") {
      return setSelectedKeys(["/"]);
    }

    if (pathname.includes("register")) {
      return setSelectedKeys([sideBarItemsKeys.SIGN]);
    }

    if (pathname.includes("make-order")) {
      return setSelectedKeys([]);
    }

    for (let key in keys) {
      const value = keys[key].slice(1);
      if (value && pathname.includes(value)) {
        setSelectedKeys([keys[key]]);
        return;
      }
    }
  }, [pathname]);

  return (
    <>
      <Layout style={{ minHeight: "100vh", backgroundColor: "unset" }}>
        <Sider breakpoint="lg">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            items={items}
            onSelect={({ key }) => {
              if (key === "add") {
                return;
              }
              navigate(key);
              setSelectedKeys([key]);
            }}
          />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      {isModalOpen && <ProductForm onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
