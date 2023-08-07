import appAxios from "./axios.service";

export interface IRegisterSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verification: {
    code: string;
    token: string;
  };
}

export const register = async (reqData: IRegisterSchema) => {
  try {
    const { data } = await appAxios.post("/auth/register", reqData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const verify = async (email: string) => {
  try {
    const { data } = await appAxios.get<string>("/auth/verify/" + email);
    return data;
  } catch (error) {
    throw error;
  }
};
