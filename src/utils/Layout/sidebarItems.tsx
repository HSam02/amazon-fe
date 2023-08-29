import {
  UserOutlined,
  ShopOutlined,
  HomeOutlined,
  SearchOutlined,
  ShoppingOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  RobotOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { roles, sideBarItemsKeys } from "../types/enums";

const userItem: ItemType<MenuItemType> = {
  key: sideBarItemsKeys.USER,
  icon: <UserOutlined />,
  label: "My Profile",
  children: [
    {
      key: sideBarItemsKeys.USER_STORE,
      icon: <ShopOutlined />,
      label: "My Store",
    },
    {
      key: sideBarItemsKeys.USER_ORDERS,
      icon: <ShoppingOutlined />,
      label: "My Orders",
    },
    {
      key: sideBarItemsKeys.USER_SETTINGS,
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ],
};

const adminItem: ItemType<MenuItemType> = {
  key: sideBarItemsKeys.ADMIN,
  icon: <RobotOutlined />,
  label: "Admin",
};

const guestItem: ItemType<MenuItemType> = {
  key: sideBarItemsKeys.SIGN,
  icon: <LoginOutlined />,
  label: "Sign in/up",
};

const otherItems: ItemType<MenuItemType>[] = [
  {
    key: sideBarItemsKeys.HOME,
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: sideBarItemsKeys.SEARCH,
    icon: <SearchOutlined />,
    label: "Search",
  },
  {
    key: sideBarItemsKeys.CART,
    icon: <ShoppingCartOutlined />,
    label: "Cart",
  },
];

const getSideBarItems = (role: roles): ItemType<MenuItemType>[] => {
  const items = [...otherItems];

  if (role === roles.GUEST) {
    items.push(guestItem);
  } else {
    items.push(userItem);
  }

  if (role === roles.ADMIN) {
    items.push(adminItem);
  }

  return items;
};

export default getSideBarItems;
