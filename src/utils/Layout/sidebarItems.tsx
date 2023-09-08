import {
  UserOutlined,
  ShopOutlined,
  HomeOutlined,
  // SearchOutlined,
  ShoppingOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  RobotOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { roles, sideBarItemsKeys } from "../types/enums";
import { useTranslation } from "react-i18next";
import { ITranslationKeys } from "../types/interfaces";

const useSideBarItems = (role: roles): ItemType<MenuItemType>[] => {
  const { t } = useTranslation() as {
    t: <T extends keyof ITranslationKeys>(key: T) => ITranslationKeys[T];
  };

  const userItem: ItemType<MenuItemType> = {
    key: sideBarItemsKeys.USER,
    icon: <UserOutlined />,
    label: t("my_profile"),
    children: [
      {
        key: sideBarItemsKeys.USER_STORE,
        icon: <ShopOutlined />,
        label: t('my_store'),
      },
      {
        key: sideBarItemsKeys.USER_ORDERS,
        icon: <ShoppingOutlined />,
        label: t('my_orders'),
      },
      {
        key: sideBarItemsKeys.USER_SETTINGS,
        icon: <SettingOutlined />,
        label: t('settings'),
      },
    ],
  };

  const adminItem: ItemType<MenuItemType> = {
    key: sideBarItemsKeys.ADMIN,
    icon: <RobotOutlined />,
    label: t('admin'),
  };

  const guestItem: ItemType<MenuItemType> = {
    key: sideBarItemsKeys.SIGN,
    icon: <LoginOutlined />,
    label: t('sign'),
  };

  const otherItems: ItemType<MenuItemType>[] = [
    {
      key: sideBarItemsKeys.HOME,
      icon: <HomeOutlined />,
      label: t('home'),
    },
    // {
    //   key: sideBarItemsKeys.SEARCH,
    //   icon: <SearchOutlined />,
    //   label: "Search",
    // },
    {
      key: sideBarItemsKeys.CART,
      icon: <ShoppingCartOutlined />,
      label: t('cart'),
    },
  ];

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

export default useSideBarItems;
