import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}

// Form 로직을 관리하는 커스텀 훅
export default function useForm<T>({
  initialValue,
  validate,
}: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isBlur, setIsBlur] = useState<Record<string, boolean>>({});

  const handleChangeValues = (
    name: keyof T,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleChangeBlur = (name: keyof T) => {
    setIsBlur((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const getValuesProps = (name: keyof T) => {
    const onBlur = () => handleChangeBlur(name);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleChangeValues(name, e);
    };

    return { onChange, onBlur };
  };

  useEffect(() => {
    const error = validate(values);
    setErrors(error);
  }, [values, validate]);

  return { values, errors, isBlur, getValuesProps };
}
