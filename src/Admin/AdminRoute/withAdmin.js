//higher order component for admin
import { useAdmin } from "../../custom-hooks";

const WithAdmin = (props) => useAdmin(props) && props.children;

export default WithAdmin;
