import { useState } from "react";
import { Button, Space, Tabs, TabsProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { Addresses } from "../../components/features/User/Addresses";
import { ChangePassword } from "../../components/features/User/ChangePassword";
import { LogOut } from "../../components/features/User/LogOut";
import { useTranslation } from "react-i18next";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Adresses",
    children: <Addresses />,
  },
  {
    key: "2",
    label: "Change Password",
    children: <ChangePassword />,
  },
];

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  return (
    <>
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        style={{ height: "100%" }}
        tabBarExtraContent={
          <Space direction="vertical" align="center">
            <Button onClick={() => setIsOpen(true)} danger>
              Log out
            </Button>
            <Space style={{ marginBottom: 20 }}>
              <Button
                onClick={() => i18n.changeLanguage("en")}
                icon={<GlobalOutlined />}
              >
                EN
              </Button>
              <Button
                onClick={() => i18n.changeLanguage("ru")}
                icon={<GlobalOutlined />}
              >
                RU
              </Button>
            </Space>
          </Space>
        }
      />
      {isOpen && <LogOut onClose={() => setIsOpen(false)} />}
    </>
  );
};
