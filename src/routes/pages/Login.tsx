import { FormEvent } from "react";
import { isAxiosError } from "axios";

import { validateForm } from "../../libs/utils/validate";
import { loginUser } from "../../api/auth";
import useForm from "../../hooks/useForm";

import Label from "../../components/Label";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";

export default function Login() {
  const { values, errors, isBlur, getValuesProps } = useForm({
    initialValue: { email: "", password: "" },
    validate: validateForm,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!!errors.email || !!errors.password) {
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
          로그인
        </CustomButton>
      </form>
    </section>
  );
}
