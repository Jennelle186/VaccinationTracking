// to see if user is currentUser or not - for restricting pages
import { useAuth } from "./../custom-hooks";
import { withRouter } from "react-router-dom";

const WithAuth = (props) => useAuth(props) && props.children;

export default withRouter(WithAuth);
