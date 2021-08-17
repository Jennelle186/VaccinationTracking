//HOC A.K.A HIGER ORDER COMPONENT

//if the user is not logged in, then we want to be logged in to access Registration
import { useAuth } from "../CustomHooks/index";
import { withRouter } from "react-router-dom";

const WithAuth = (props) => useAuth(props) && props.children;

export default withRouter(WithAuth);
