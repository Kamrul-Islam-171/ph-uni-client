import { Button, Row } from "antd";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/Auth/authApi";
import { useAppDispatch } from "../../redux/features/hook";
import { setUser, TUser } from "../../redux/features/Auth/AuthSlice";
import { VerifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

const Login = () => {
  //   const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: "2025010005",
  //     password: "admin1234",
  //   },
  // });

  const defaultValues = {
    userId: "2025010005",
    password: "admin1234",
  };

  const [login] = useLoginMutation();
  // console.log(isLoading)

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const loginId = toast.loading("Loggin in...."); // sonner toast

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      }; // id pass er format e data pathate hobe. karon back end e ei vabe ache.

      const res = await login(userInfo).unwrap(); // userinfo k oi login function e pathabo

      // console.log(res.data?.needsPasswordChange)

      const user = VerifyToken(res.data.accessToken) as TUser;

      // akhon ei user k local state e set korbo
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in!", { id: loginId, duration: 2000 });
      if(res.data?.needsPasswordChange) {
        // console.log("yes i am in")
        navigate('/change-password');
      }
      else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      toast.error("Something went wrong.", { id: loginId, duration: 2000 });
      console.log(err);
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        {/* <label htmlFor="id">ID: </label> */}
        {/* <input type="text" id="id" {...register("userId")} /> */}
        <PHInput label={"Id"} type={"text"} name={"userId"}></PHInput>

        {/* <label htmlFor="password">Password: </label> */}
        <PHInput label={"Password"} type={"text"} name={"password"}></PHInput>
        {/* <input type="text" id="password" {...register("password")} /> */}

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
