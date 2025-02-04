import { useParams } from "react-router-dom";
import { Button, Modal } from 'antd';
import { useState } from "react";
const StudentDetails = () => {
  const { studentId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // now ei id dia query kore detaisl aina show korbo
  return (
    <div>
      This is student Details of {studentId}
      <div>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {studentId}
        </Modal>
      </div>
    </div>
  );
};

export default StudentDetails;
