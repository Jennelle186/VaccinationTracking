import { useEffect } from "react";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

//custom hook
const useAuth = (props) => {
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    //checks if the current user is null
    if (!currentUser) {
      //redirect the user to the log in page
      props.history.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]); //useEffect

  return currentUser;
};

export default useAuth;
