
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import { Navigate, Outlet} from "react-router-dom";

function Protected({ children }) {
    const {currentUser} = useContext(userContext)
    return !currentUser ? <Navigate to="/directory/login"  /> : (<Outlet/>)
    // if(!currentUser){
    //   return <Navigate to="/directory/login"  />
    // }

    // return <Outlet />

}
export default Protected;