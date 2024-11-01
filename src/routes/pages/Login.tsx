import { FormEvent } from "react";
import { isAxiosError } from "axios";

import { validateForm } from "../../libs/utils/validate";
import { loginUser } from "../../api/auth";
import useForm from "../../hooks/useForm";

export default function Login() {
  const { values, errors, isBlur, getValuesProps } = useForm({
    initialValue: { email: "", password: "" },
    validate: validateForm,
  });

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

  return (
    <section>
      <h1>로그인 페이지</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input id="email" {...getValuesProps("email")} />
          <p>{isBlur.email && !!errors.email && errors.email}</p>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            {...getValuesProps("password")}
          />
          <p>{isBlur.password && !!errors.password && errors.password}</p>
        </div>
        <button type="submit">로그인</button>
      </form>
    </section>
  );
}
