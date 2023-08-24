import { Tabs, TabsProps } from "antd";
import { Addresses } from "../../components/features/User/Addresses";
import { ChangePassword } from "../../components/features/User/ChangePassword";

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
  return (
    <Tabs
      tabPosition="left"
      defaultActiveKey="1"
      items={items}
      style={{ height: "100%" }}
    />
  );
};
