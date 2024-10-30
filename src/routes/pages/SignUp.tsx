import { ChangeEvent, FormEvent, useState } from "react";

export default function SignUp() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setEmailError(true);
      setEmailErrorMessage("이메일을 입력해주세요.");
      return;
    }

    const emailRegEx = /^[a-zA-Z0-9]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegEx.test(e.target.value);

    if (!isValidEmail) {
      setEmailError(true);
      setEmailErrorMessage("이메일 형식으로 입력해주세요.");
      return;
    }

    setValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

    setEmailError(false);
    setEmailErrorMessage("");
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호를 입력해주세요.");
      return;
    }
    if (e.target.value.length < 8 || e.target.value.length > 20) {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호는 8~20자 이내로 입력해주세요.");
      return;
    }
    setValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

    setPasswordError(false);
    setPasswordErrorMessage("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }
  };

  return (
    <section>
      <h1>회원가입 페이지</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input id="email" onBlur={handleChangeEmail} />
          <p>{emailError && emailErrorMessage}</p>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" onBlur={handleChangePassword} />
          <p>{passwordError && passwordErrorMessage}</p>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}
