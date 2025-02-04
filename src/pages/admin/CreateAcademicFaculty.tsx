import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import PHInput from "./../../components/form/PHInput";
import { Button } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../Schemas/academicManagementSchema";
import { useAddAcademicFacultyMutation } from "../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse, TresponseData } from "../../types/global";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Faculty...");
    const academicFacultyData = {
      name: data.name,
    };
    // console.log(academicFacultyData)
    try {
        const res = await addAcademicFaculty(academicFacultyData) as TResponse<TresponseData>;
        console.log(res);
        if(res.error?.data?.message) {
            toast.error(res.error?.data?.message ,{id: toastId}) 
        }
        else {
            toast.success('New Academic Faculty is Created Successfully!' ,{id: toastId})
        }
    } catch (err) {
      console.log(err);
      toast.error("Someting went wrong!", { id: toastId });
    }
  };

  return (
    <div>
      <PHForm onSubmit={onsubmit} resolver={zodResolver(academicFacultySchema)}>
        <PHInput label="Name" name="name" type="text"></PHInput>
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </div>
  );
};

export default CreateAcademicFaculty;
