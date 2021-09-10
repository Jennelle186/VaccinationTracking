//list of the others in side effects
import React, { useState, useEffect } from "react";
import { firestore } from "../../../Firebase/utils";
import { Grid, CardHeader } from "@material-ui/core";
import SelectVaccine from "../SelectVaccine/selectVaccine";
const OthersList = () => {
  const [users, setUsers] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState(0);
  const handleChangeVaccine = (e) => setSelectedVaccine(e.target.value);

  const getVaccines = async () => {
    const vaccines = await firestore
      .collection("vaccines")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setVaccines(arr);
      });
  };

  const getUsers = async () => {
    const users = await firestore
      .collection("users")
      .where("doses.selectedVaccine", "==", selectedVaccine);
    users.get().then((querysnapshot) => {
      const tempDoc = [];
      querysnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setUsers(tempDoc);
    });
  };

  useEffect(() => {
    getVaccines();
    getUsers();
  }, [selectedVaccine]);

  const others1 = users.filter((d) => d["1"]?.others !== "");
  const others2 = users.filter((d) => d["2"]?.others !== "");

  let red = others1.reduce(
    (a, c) => ((a[c["1"]?.others] = (a[c["1"]?.others] || 0) + 1), a),
    {}
  );

  let red2 = others2.reduce(
    (a, c) => ((a[c["2"]?.others] = (a[c["2"]?.others] || 0) + 1), a),
    {}
  );

  function objToString(obj) {
    let str = "";
    for (const [p, val] of Object.entries(red)) {
      if (p !== "undefined") {
        str += `${p}:${val}\n`;
      }
    }
    return str;
  }

  function objToString2(obj) {
    let str = "";
    for (const [p, val] of Object.entries(red2)) {
      if (p !== "undefined") {
        str += `${p}:${val}\n`;
      }
    }
    return str;
  }

  return (
    <div>
      <CardHeader title="List of others" />
      <SelectVaccine
        value={selectedVaccine}
        onChange={handleChangeVaccine}
        vaccines={vaccines}
      />

      <Grid container style={{ marginTop: "1rem" }}>
        {selectedVaccine == "J&J" ? ( //if selectedVaccine == J&j show only the 1st dose
          <Grid item xs={12}>
            {objToString() == null ? ( //if objToString is null or empty
              <>
                {/* then show here the J&J side effects */}
                {objToString()} <br />
              </>
            ) : (
              // else show this display
              <h5>No result</h5>
            )}
          </Grid>
        ) : (
          //else show 1st dose and 2nd dose
          <>
            {objToString() || objToString2 == null ? ( //if objToString and objToString2 is null or empty
              <>
                {/* then show here all the 1st dose and 2nd dose */}
                <Grid item xs={6}>
                  1st Dose <br />
                  {objToString()} <br />
                </Grid>
                <Grid item xs={6}>
                  2nd Dose <br />
                  {objToString2()}
                </Grid>
              </>
            ) : (
              // else show this
              <Grid item xs={12}>
                <h5>No result</h5>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default OthersList;
