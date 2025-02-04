import { useParams } from "react-router-dom";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/faculty.api";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();

  // filtering
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    {
      name: "semesterRegistration",
      value: registerSemesterId,
    },
    {
      name: "course",
      value: courseId,
    },
  ]);
  console.log(facultyCoursesData);

  // ei khane table e 3 ta colum show korleo modal e kichu extra data lagbe. tai aro kichu data nichi
  // tableData = [
  //   {
  //     key,
  //     name,
  //     roll,
  //     semesterRegistration,
  //     student,
  //     offeredCourse,
  //   },
  //   {
  //     key,
  //     name,
  //     roll,
  //     semesterRegistration,
  //     student,
  //     offeredCourse,
  //   },
  // ];
  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item) // row data show korbe. tableData er j koyta property chilo oi gula paia jabo
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }) => {
  console.log(studentInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    console.log(studentMark);
    const res = await addMark(studentMark);

    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Midterm" />
          <PHInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
