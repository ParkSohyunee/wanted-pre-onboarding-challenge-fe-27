import axiosInstance from "./axios";

type FormType = {
  email: string;
  password: string;
};

type Response = {
  message: string;
  token: string;
};

const createUser = async ({ email, password }: FormType) => {
  const result = await axiosInstance.post<Response>("/users/create", {
    email,
    password,
  });

  return result.data;
};

export default createUser;
