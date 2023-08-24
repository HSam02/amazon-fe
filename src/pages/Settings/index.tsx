import { Button, Tabs, TabsProps } from "antd";
import { Addresses } from "../../components/features/User/Addresses";
import { ChangePassword } from "../../components/features/User/ChangePassword";
import { LogOut } from "../../components/features/User/LogOut";
import { useState } from "react";

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
  return (
    <>
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        style={{ height: "100%" }}
        tabBarExtraContent={
          <Button
            onClick={() => setIsOpen(true)}
            danger
            style={{ marginBottom: 20 }}
          >
            Log out
          </Button>
        }
      />
      {isOpen && <LogOut onClose={() => setIsOpen(false)} />}
    </>
  );
};
