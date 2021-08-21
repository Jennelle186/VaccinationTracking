import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@material-ui/core";
import { firestore } from "../../../Firebase/utils";

const EditVaccinator = () => {
  const location = useLocation();
  const rowData = location.state;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("vaccinator-name")
      .doc(rowData)
      .onSnapshot((snapshot) => {
        const arr = [];
        arr.push({
          ...snapshot.data(),
        });

        setUsers(arr);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return <div>Edit</div>;
};

export default EditVaccinator;
