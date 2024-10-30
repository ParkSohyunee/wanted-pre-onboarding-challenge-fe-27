import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { validateForm } from "../../libs/utils/validate";

export default function SignUp() {
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }
  };

  useEffect(() => {
    const error = validateForm(values);
    setErrors(error);
  }, [values]);

  return (
    <section>
      <h1>회원가입 페이지</h1>
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
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}
