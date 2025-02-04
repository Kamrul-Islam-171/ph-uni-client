import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../components/form/PHForm";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../components/form/PHSelect";
import { nameOptions, semesterStatusOptions } from "../../constants/semester";
import { monthOptions, yearOptions } from "../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";

import { academicSemesterSchema } from "../../Schemas/academicManagementSchema";
import {
  useAddAcademicSemesterMutation,
  useGetAllSemestersQuery,
} from "../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../types/global";
import PHDatePicker from "../../components/form/PHDatePicker";
import PHInput from "../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
    const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemesterData } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academictSemesterOptions = academicSemesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`
  }))

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toadId = toast.loading("Creating....");
    const name = nameOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
     ...data,
     minCredit: Number(data.minCredit),
     maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      // console.log(semesterData)

      const res = await addSemester(semesterData) as TResponse<any>;
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
    <Flex align="center" justify="center" style={{ height: "200vh" }}>
      <Col span={6}>
        <PHForm
          onSubmit={onsubmit}
        //   resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Academic Semester" name="academicSemester" options={academictSemesterOptions}></PHSelect>

          <PHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
