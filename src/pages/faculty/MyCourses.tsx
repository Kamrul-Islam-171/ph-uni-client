import { useNavigate } from "react-router-dom";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/faculty.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";


const MyCourses = () => {
    const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
    const navigate = useNavigate();
  
    console.log(facultyCoursesData);

    const semesterOptions = facultyCoursesData?.data?.map((item) => ({
        label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        value: item.semesterRegistration._id,
      }));
    
      const courseOptions = facultyCoursesData?.data?.map((item) => ({
        label: item.course.title,
        value: item.course._id, // value te j ta rakhbo sei ta data er moddhe pabo
      }));
    
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // console.log(data.SemesterRegistration, data.course)
        navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
      };
  
    return (
        <Flex justify="center" align="center">
        <Col span={6}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              options={semesterOptions}
              name="semesterRegistration"
              label="Semester"
            />
            <PHSelect options={courseOptions} name="course" label="Course" />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    );
};

export default MyCourses;