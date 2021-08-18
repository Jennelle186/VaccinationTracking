import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkUserAdmin } from "../Admin/AdminRoute/checkAdmin";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAdmin = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserAdmin(currentUser)) {
      history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export default useAdmin;
