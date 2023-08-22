export const enum authEndpoints {
  REGISTER = "/auth/register",
  LOGIN = "/auth/login",
  GET_USER = "/auth/me",
  VERIFY = "/auth/verify/",
  CHECK_EMAIL = "/auth/check/",
}

export enum sizeEndpoints {
  GET_ALL = "/size",
  CREATE = "/size",
  UPDATE = "/size/:id",
  REMOVE = "/size/:id",
}

export enum colorEndpoints {
  GET_ALL = "/color",
  CREATE = "/color",
  UPDATE = "/color/:id",
  REMOVE = "/color/:id",
}

export enum categoryEndpoints {
  GET_ALL = "/category",
  CREATE = "/category",
  UPDATE = "/category/:id",
  REMOVE = "/category/:id",
}
