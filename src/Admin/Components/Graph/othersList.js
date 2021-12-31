//list of the others in side effects
import React, { useState, useEffect } from "react";
import { firestore } from "../../../Firebase/utils";
import { Grid, CardHeader, Typography } from "@material-ui/core";
import SelectVaccine from "../SelectVaccine/selectVaccine";

function Title() {
  return (
    <div>
      <Typography variant="h5">
        List of other side effects entered by the user
      </Typography>
    </div>
  );
}

const OthersList = () => {
  const [users, setUsers] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState(0);
  const handleChangeVaccine = (e) => setSelectedVaccine(e.target.value);

  const [boosterUsers, setBoosterUsers] = useState([]);

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

  //----booster--------------------------
  const getBoosters = async () => {
    const users = await firestore
      .collection("users")
      .where("doses.selectedBooster", "==", selectedVaccine);
    users.get().then((querysnapshot) => {
      const tempDoc = [];
      querysnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setBoosterUsers(tempDoc);
    });
  };
  //------------------------------------

  useEffect(() => {
    getVaccines();
    getUsers();
    getBoosters(); //booster
  }, [selectedVaccine]);

  const others1 = users.filter((d) => d["1"]?.others !== "");
  const others2 = users.filter((d) => d["2"]?.others !== "");
  const others3 = boosterUsers.filter((d) => d["3"]?.others !== ""); //booster

  let red = others1.reduce(
    (a, c) => ((a[c["1"]?.others] = a[c["1"]?.others] || " "), a), //-----sample to only show the list and does not count it
    {}
  );

  let red2 = others2.reduce(
    (a, c) => ((a[c["2"]?.others] = a[c["2"]?.others] || " "), a), //-----sample to only show the list and does not count it
    {}
  );

  //booster-------------------------------------------------
  let red3 = others3.reduce(
    (a, c) => ((a[c["3"]?.others] = a[c["3"]?.others] || " "), a), //-----sample to only show the list and does not count it
    {}
  );
  //---------------------------------------------------------

  function objToString(obj) {
    let str = "";
    for (const [p, val] of Object.entries(red)) {
      if (p !== "undefined") {
        str += `${p},${val}\n`;
      }
    }
    return str;
  }

  function objToString2(obj) {
    let str = "";
    for (const [p, val] of Object.entries(red2)) {
      if (p !== "undefined") {
        str += `${p} ,${val}\n`;
      }
    }
    return str;
  }

  //-----booster-------------------------------------
  function objToString3(obj) {
    let str = "";
    for (const [p, val] of Object.entries(red3)) {
      if (p !== "undefined") {
        str += `${p},${val}\n`;
      }
    }
    return str;
  }
  //--------------------------------------------

  return (
    <div>
      <CardHeader title={<Title />} />
      <SelectVaccine
        value={selectedVaccine}
        onChange={handleChangeVaccine}
        vaccines={vaccines}
      />
      <Grid container style={{ marginTop: "1rem" }}>
        {selectedVaccine == "J&J" ? ( //if selectedVaccine == J&j show only the 1st dose
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">
                First Dose <br />
              </Typography>
              {objToString()}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6">
                Booster <br />
              </Typography>
              {objToString3()}
            </Grid>
          </Grid>
        ) : (
          //else show 1st dose and 2nd dose
          <>
            {objToString() || objToString2 == null ? ( //if objToString and objToString2 is null or empty
              <>
                {/* then show here all the 1st dose and 2nd dose */}
                <Grid item xs={6}>
                  <Typography variant="h6">
                    1st Dose <br />
                  </Typography>
                  {objToString()} <br />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    2nd Dose <br />
                  </Typography>
                  {objToString2()}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    Booster <br />
                  </Typography>
                  {objToString3()}
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
