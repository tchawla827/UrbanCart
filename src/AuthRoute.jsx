import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Login } from './screens/login';
import { SignUp } from './screens/SignUp';


function AuthRoute() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}

export default AuthRoute
