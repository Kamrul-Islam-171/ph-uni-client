import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TformConfigs = {
  defaultValues?: Record<string, any>;
  resolver?: any
}

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode
}&TformConfigs

const PHForm = ({ onSubmit, children, defaultValues, resolver } : TFormProps) => {

  const formConfig: TformConfigs = {};
  if(defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }
  if(resolver) {
    formConfig['resolver'] = resolver;
  }

//   const { handleSubmit } = useForm();
  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  }
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>{children}</Form>
    </FormProvider>
  );
};

export default PHForm;
