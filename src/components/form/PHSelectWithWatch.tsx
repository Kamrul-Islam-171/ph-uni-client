import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TPHSelectProps) => {

  // watch korar jonno react hook form er useWatch hook use korte hobe  
  // ami kon option ta select korbo sei ta watch korte thakbe. 
  const method = useFormContext();
  const inputValue = useWatch({
    control: method.control,
    name,
  });

  console.log("i am watching...", inputValue)

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;
