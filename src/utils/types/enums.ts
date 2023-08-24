export enum requestStatus {
  SUCCESS = "success",
  PENDING = "pending",
  ERROR = "error",
  IDLE = "idle",
}

export enum roles {
  USER = "user",
  ADMIN = "admin",
  GUEST = "guest",
}

export enum adminTools {
  CATEGORY = "category",
  SIZE = "size",
  COLOR = "color",
}

export enum sideBarItemsKeys {
  HOME = "/",
  SEARCH = "search",
  USER = "user",
  USER_STORE = "store",
  USER_ORDERS = "orders",
  USER_SETTINGS = "settings",
  CART = "cart",
  ADMIN = "/admin",
  SIGN = "/auth/login",
}
