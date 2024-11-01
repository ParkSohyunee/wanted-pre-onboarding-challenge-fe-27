import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { validateForm } from "../../libs/utils/validate";
import { createUser } from "../../api/auth";
import useForm from "../../hooks/useForm";

export default function SignUp() {
  const navigate = useNavigate();
  const { values, isBlur, errors, getValuesProps } = useForm({
    initialValue: { email: "", password: "" },
    validate: validateForm,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    try {
      const result = await createUser(values);
      localStorage.setItem("accessToken", result.token);
      alert(result.message);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>회원가입 페이지</h1>
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
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}
