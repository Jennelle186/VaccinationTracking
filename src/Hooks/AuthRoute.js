import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Loading from "../components/Loading/loading";

export const AuthRoute = (props) => {
  const { authPending, currentUser } = useSelector((state) => state.user);

  if (authPending) {
    return <Loading />; // or maybe a loading spinner
  }

  return currentUser ? <Route {...props} /> : <Redirect to="/login" />;
};
