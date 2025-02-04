import React from "react";
import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  label?: string;
  name: string;
  type: string;
  disabled?: boolean;
};

const PHInput = ({ label, name, type, disabled }: TInputProps) => {
  const { control } = useFormContext(); // Use control from useFormContext()

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        // control={control} // Pass control to the Controller
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input type={type} id={name} {...field}  disabled={disabled} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
