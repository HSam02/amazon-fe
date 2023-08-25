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
  USER_STORE = "/user/store",
  USER_ORDERS = "/user/orders",
  USER_SETTINGS = "/user/settings",
  CART = "cart",
  ADMIN = "/admin",
  SIGN = "/auth/login",
}

export enum modalStatuses {
  EDIT = "edit",
  ADD = "add",
  CLOSED = "closed",
}