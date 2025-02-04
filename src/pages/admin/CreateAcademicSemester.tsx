import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../components/form/PHForm";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../components/form/PHSelect";
import { nameOptions } from "../../constants/semester";
import { monthOptions, yearOptions } from "../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";

import { academicSemesterSchema } from "../../Schemas/academicManagementSchema";
import { useAddAcademicSemesterMutation } from "../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../types/global";






const CreateAcademicSemester = () => {

  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onsubmit: SubmitHandler<FieldValues> = async(data) => {

    const toadId = toast.loading('Creating....')
    const name = nameOptions[Number(data?.name)-1]?.label
    const semesterData = {
      name,
      code: data.name,
      year:data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth
    }

    try {
      // console.log(semesterData)

      const res = await addAcademicSemester(semesterData) as TResponse;
      console.log(res);
      if(res.error?.data?.message) {
        toast.error(res.error?.data?.message ,{id: toadId})
      }
      else {

        toast.success('New Academic Semester is Created Successfully!' ,{id: toadId})
      }
    } catch (err) {
      console.log(err)
      toast.error("Someting went wrong!" ,{id: toadId})
    }
  };

  
 

  // resolver add korchi validation er jonno
  return (
    <Flex align="center" justify="center" style={{height:'200vh'}}>
      <Col span={6}>
        <PHForm onSubmit={onsubmit} resolver={zodResolver(academicSemesterSchema) }>
          
          <PHSelect label="Name" name="name" options={nameOptions}></PHSelect>
          <PHSelect label="Year" name="year" options={yearOptions}></PHSelect>
          <PHSelect label="StartMonth" name="startMonth" options={monthOptions}></PHSelect>
          <PHSelect label="EndMonth" name="endMonth" options={monthOptions}></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
