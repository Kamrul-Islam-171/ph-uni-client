import React from "react";
import { useEnrolCourseMutation, useGetAllOfferedCoursedQuery } from "../../redux/features/student/studentCourse.api";
import { Button, Col, Row } from "antd";

type TCourse = {
    [index: string]: any;
};

const OfferedCourseStu = () => {
  const { data: offeredCourseData  } = useGetAllOfferedCoursedQuery(undefined);
  const [enroll] = useEnrolCourseMutation();


  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) =>{
    const key = item.course.title;
    acc[key] = acc[key] || {courseTitle: key, sections: []};
    acc[key].section.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
    });

    return acc;
  }, {})


  
//from gpt
//   const output = offeredCourseData?.data?.reduce((acc:TCourse, item) => {
//   // Find if the course already exists in the result
//   let existingCourse = acc.find((c:any) => c.courseTitle === item.course.title);

//   if (existingCourse) {
//     // Add the section to the existing course
//     existingCourse.sections.push({ section: item.section, _id: item._id });
//   } else {
//     // Add a new course to the result
//     acc.push({
//       courseTitle: item.course.title,
//       sections: [{ section: item.section, _id: item._id }],
//     });
//   }

//   return acc;
// }, []);

//   console.log(singleObject)
  const modifiedData = Object.values(singleObject ? singleObject : {});

  
  const handleEnroll = async (id) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = await enroll(enrollData);
    console.log(res);
  };

  if (!modifiedData.length) {
    return <p>No available courses</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item) => {
        return (
          <Col span={24} style={{ border: 'solid #d4d4d4 2px' }}>
            <div style={{ padding: '10px' }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: 'solid #d4d4d4 2px', padding: '10px' }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{' '}
                      {section.days.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourseStu;








// from chaptgpt
// const input = [
//   { course: { title: "React" }, section: 1, _id: "sdfasdfasdfas45345" },
//   { course: { title: "React" }, section: 2, _id: "sdfasdfasdfas45345" },
//   { course: { title: "Redux" }, section: 1, _id: "sdfasdfasdfas45345" },
// ];

// const output = input.reduce((acc, item) => {
//   // Find if the course already exists in the result
//   let existingCourse = acc.find((c) => c.courseTitle === item.course.title);

//   if (existingCourse) {
//     // Add the section to the existing course
//     existingCourse.sections.push({ section: item.section, _id: item._id });
//   } else {
//     // Add a new course to the result
//     acc.push({
//       courseTitle: item.course.title,
//       sections: [{ section: item.section, _id: item._id }],
//     });
//   }

//   return acc;
// }, []);

// console.log(output);

// [
//   {
//     courseTitle: "React",
//     sections: [
//       { section: 1, _id: "sdfasdfasdfas45345" },
//       { section: 2, _id: "sdfasdfasdfas45345" },
//     ],
//   },
//   {
//     courseTitle: "Redux",
//     sections: [{ section: 1, _id: "sdfasdfasdfas45345" }],
//   },
// ];
