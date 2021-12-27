import React, { useState } from "react";
import { firestore } from "../../../Firebase/utils";
import {
  Grid,
  TextField,
  makeStyles,
  Divider,
  Button,
} from "@material-ui/core";
import firebase from "firebase/app"; //---------------------booster increment counter
import SelectVaccine from "./../SelectVaccine/selectVaccine";
import SelectVaccinator from "../SelectVaccinator/selectVaccinator";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 auto",
    marginBottom: "1rem",
  },
});

const Booster = ({ data, vaccine, vaccinator, users }) => {
  const classes = useStyles();
  const [boosterDate, setBoosterDate] = useState(new Date());

  const [selectedBooster, setSelectedBooster] = useState("");
  const handleChangeVaccine = (e) => setSelectedBooster(e.target.value);

  const [boosterVaccinator, setBoosterVaccinator] = useState("");
  const handleChange = (e) => setBoosterVaccinator(e.target.value);

  const [batchNo3, setBatchNo3] = useState("");

  //---------------------booster increment counter
  function incrementCounter() {
    const collRef = firestore
      .collection("vaccines")
      .where("vaccine", "==", selectedBooster);

    collRef.get().then(async (qSnap) => {
      const batch = firestore.batch();

      qSnap.docs.forEach((doc) => {
        batch.update(doc.ref, {
          stocks: firebase.firestore.FieldValue.increment(-1),
        });
      });

      await batch.commit();
    });
  }
  //----------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userRef = firestore.collection("users").doc(data);
      const ref = userRef.set(
        {
          doses: {
            selectedBooster,
            boosterVaccinator,
            batchNo3,
            boosterDate,
          },
        },
        { merge: true }
      );
      incrementCounter(); //---------------------booster increment counter
      console.log(" saved");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Divider />
      <h1>Booster</h1>
      {users &&
        users.map((user) => (
          <li style={{ listStyle: "none" }}>
            {user.doses?.selectedBooster ? (
              <>
                <Grid item>
                  <SelectVaccine
                    vaccines={vaccine}
                    value={user.doses?.selectedBooster}
                    disabled={true}
                  />
                </Grid>
                <br />
                <Grid item>
                  <TextField
                    value={user.doses?.batchNo3}
                    type="text"
                    label="Batch Number"
                    variant="outlined"
                    fullWidth
                    disabled={true}
                  />
                </Grid>

                <Grid item>
                  <SelectVaccinator
                    names={vaccinator}
                    value={user.doses?.boosterVaccinator}
                    disabled={true}
                  />
                </Grid>
                <br />
                <Grid item>
                  <TextField
                    type="text"
                    label="Booster Date"
                    variant="outlined"
                    value={new Date(
                      user.doses.boosterDate.seconds * 1000
                    ).toDateString()}
                    fullWidth
                    disabled={true}
                  />
                </Grid>
              </>
            ) : (
              <>
                {" "}
                <form onSubmit={handleSubmit}>
                  <Grid item>
                    <SelectVaccine
                      vaccines={vaccine}
                      value={selectedBooster}
                      onChange={handleChangeVaccine}
                    />
                  </Grid>
                  <br />
                  <Grid item>
                    <TextField
                      value={batchNo3}
                      type="text"
                      label="Batch Number"
                      variant="outlined"
                      onChange={(e) => setBatchNo3(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item>
                    <SelectVaccinator
                      names={vaccinator}
                      value={boosterVaccinator}
                      onChange={handleChange}
                    />
                  </Grid>
                  <br />
                  <Grid item>
                    <TextField
                      type="text"
                      label="Booster Date"
                      variant="outlined"
                      value={boosterDate}
                      fullWidth
                      required
                    />
                  </Grid>
                  <br />
                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      variant="outlined"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                </form>
              </>
            )}
          </li>
        ))}
      <br /> <br /> <br />
    </>
  );
};

export default Booster;
