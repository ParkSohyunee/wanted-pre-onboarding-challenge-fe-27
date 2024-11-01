import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { validateForm } from "../../libs/utils/validate";
import { createUser } from "../../api/auth";
import useForm from "../../hooks/useForm";

import Label from "../../components/Label";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";

export default function SignUp() {
  const navigate = useNavigate();
  const { values, isBlur, errors, getValuesProps } = useForm({
    initialValue: { email: "", password: "" },
    validate: validateForm,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!!errors.email || !!errors.password) {
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
          <Label htmlFor="email">이메일</Label>
          <TextInput
            id="email"
            isBlur={isBlur.email}
            errorMessage={errors.email}
            placeholder="이메일을 입력해주세요"
            autoFocus
            autoComplete="off"
            {...getValuesProps("email")}
          />
        </div>
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <TextInput
            id="password"
            type="password"
            isBlur={isBlur.password}
            errorMessage={errors.password}
            placeholder="비밀번호를 입력해주세요"
            {...getValuesProps("password")}
          />
        </div>
        <CustomButton
          type="submit"
          isError={!!errors.email || !!errors.password}
        >
          회원가입
        </CustomButton>
      </form>
    </section>
  );
}
