type FormType = {
  email: string;
  password: string;
};

const emailRegEx = /^[a-zA-Z0-9]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;

const validateForm = ({ email, password }: FormType) => {
  const errors = {
    email: "",
    password: "",
  };

  if (!emailRegEx.test(email)) {
    errors.email = "이메일 형식으로 입력해주세요.";
  }
  if (password.length < 8 || password.length > 20) {
    errors.password = "비밀번호는 8~20자 이내로 입력해주세요.";
  }
  if (!email) {
    errors.email = "이메일을 입력해주세요.";
  }
  if (!password) {
    errors.password = "비밀번호를 입력해주세요.";
  }

  return errors;
};

export { validateForm };
