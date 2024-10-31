import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { isAxiosError } from "axios";

import { validateForm } from "../../libs/utils/validate";
import { loginUser } from "../../api/auth";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isBlur, setIsBlur] = useState({
    email: false,
    password: false,
  });

  const handleChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    const error = validateForm(values);
    setErrors(error);

    setIsBlur((prev) => ({
      ...prev,
      [e.target.id]: true,
    }));
    setValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    try {
      const result = await loginUser(values);
      localStorage.setItem("accessToken", result.token);
      alert(result.message);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.details);
      }
    }
  };

  useEffect(() => {
    const error = validateForm(values);
    setErrors(error);
  }, [values]);

  return (
    <section>
      <h1>로그인 페이지</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input id="email" onBlur={handleChangeValues} />
          <p>{isBlur.email && !!errors.email && errors.email}</p>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" onBlur={handleChangeValues} />
          <p>{isBlur.password && !!errors.password && errors.password}</p>
        </div>
        <button type="submit">로그인</button>
      </form>
    </section>
  );
}
