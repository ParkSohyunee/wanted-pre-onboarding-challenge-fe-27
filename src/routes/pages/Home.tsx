import { isAxiosError } from "axios";

import useForm from "../../hooks/useForm";
import { validateTodo } from "../../libs/utils/validate";

import TextInput from "../../components/TextInput";
import Label from "../../components/Label";
import CustomButton from "../../components/CustomButton";

import { createTodo } from "../../api/todo";

export default function Home() {
  const { values, isBlur, errors, getValuesProps } = useForm({
    initialValue: { title: "", content: "" },
    validate: validateTodo,
  });

  const handleAddTodo = async () => {
    try {
      const result = await createTodo(values);
      console.log(result.data);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.details);
      }
    }
  };

  return (
    <section>
      <h1>홈페이지 입니다.</h1>
      <div>
        <Label htmlFor="title">제목</Label>
        <TextInput
          id="title"
          isBlur={isBlur.title}
          placeholder="할 일의 제목을 입력해주세요"
          errorMessage={errors.title}
          {...getValuesProps("title")}
        />
      </div>
      <div>
        <Label htmlFor="content">내용</Label>
        <TextInput
          id="content"
          isBlur={isBlur.content}
          placeholder="할 일의 내용을 입력해주세요"
          errorMessage={errors.content}
          {...getValuesProps("content")}
        />
      </div>
      <CustomButton
        type="button"
        isError={!!errors.title || !!errors.content}
        onClick={handleAddTodo}
      >
        추가하기
      </CustomButton>
    </section>
  );
}
