import  { ReactNode } from 'react';
import { useAppSelector } from '../../redux/features/hook';
import { logOut, selectCurrentUser, useCurrentToken } from '../../redux/features/Auth/AuthSlice';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { VerifyToken } from '../../utils/verifyToken';
import { TUserRole } from './Sidebar';

type ProtecetedProps = {
    children: ReactNode,
    role: string | undefined;
}

const ProtectedRoute = ({children, role} : ProtecetedProps) => {

    // console.log("my role = " ,role);
    // const user = useAppSelector(selectCurrentUser);
    // console.log(user)

    const dispatch = useDispatch(); // dispatch action perform kore
    let user;
    const token = useAppSelector(useCurrentToken);
    
    if(token) {
        user = VerifyToken(token);
    }

    if(role !== undefined && role !== (user as TUserRole)?.role) {
        dispatch(logOut()); // logout koira dibo
        return <Navigate to={'/login'} replace={true}></Navigate>
    }

    if(!token) {
        return <Navigate to={'/login'} replace={true}></Navigate>
    }

    return children
};

export default ProtectedRoute;