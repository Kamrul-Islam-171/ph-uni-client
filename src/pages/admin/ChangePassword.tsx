import { Button, Row } from 'antd';

import { FieldValues, SubmitHandler } from 'react-hook-form';


import { Navigate, useNavigate } from 'react-router-dom';
import { TResponse } from '../../types/global';
import { logOut } from '../../redux/features/Auth/AuthSlice';
import { useAppDispatch } from '../../redux/features/hook';
import PHForm from '../../components/form/PHForm';
import PHInput from '../../components/form/PHInput';
import { useChangePasswordMutation } from '../../redux/features/admin/userManagement.api';

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await changePassword(data)) as TResponse<any>;
    console.log(res?.data?.success);
    if (res?.data?.success) {
      dispatch(logOut());
      navigate('/login');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password" />
        <PHInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;