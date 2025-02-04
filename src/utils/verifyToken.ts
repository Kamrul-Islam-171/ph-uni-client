import { jwtDecode } from "jwt-decode";
export const VerifyToken = (token:string) => {
    // console.log("token = ", token)
    return jwtDecode(token);

}