export const enum authEndpoints {
  REGISTER = "/auth/register",
  LOGIN = "/auth/login",
  GET_USER = "/auth/me",
  VERIFY = "/auth/verify/",
  CHECK_EMAIL = "/auth/check/",
  CHANGE_PASSWORD = "/auth/change",
  UPDATE_DEFAULT_ADDRESS = "/auth/set-address/",
}

export enum sizeEndpoints {
  GET_ALL = "/size",
  CREATE = "/size",
  UPDATE = "/size/",
  REMOVE = "/size/",
}

export enum colorEndpoints {
  GET_ALL = "/color",
  CREATE = "/color",
  UPDATE = "/color/",
  REMOVE = "/color/",
}

export enum categoryEndpoints {
  GET_ALL = "/category",
  CREATE = "/category",
  UPDATE = "/category/",
  REMOVE = "/category/",
}

export enum addressEndpoints {
  GET_ALL = "/address",
  CREATE = "/address",
  UPDATE = "/address/",
  REMOVE = "/address/",
}

export enum productEndpoints {
  GET_ALL = "/product",
  GET_MY = "/product/my",
  CREATE = "/product",
  UPDATE = "/product/",
  REMOVE = "/product/",
}

export enum cartEndpoints {
  GET_MY = "/cart",
  CREATE = "/cart",
  UPDATE = "/cart/",
  REMOVE = "/cart/",
}
