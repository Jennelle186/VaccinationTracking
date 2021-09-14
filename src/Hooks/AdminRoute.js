import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { checkUserAdmin } from "./../Admin/AdminRoute/checkAdmin";
import Loading from "../components/Loading/loading";

export const AdminRoute = (props) => {
  const { authPending, currentUser } = useSelector((state) => state.user);

  if (authPending) {
    return <Loading />; // or maybe a loading spinner
  }

  return checkUserAdmin(currentUser) ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};
