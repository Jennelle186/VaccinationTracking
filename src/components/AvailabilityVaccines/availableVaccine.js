import React, { useState, useEffect } from "react";
import { Grid, Card, GridList, Typography } from "@material-ui/core";
import { firestore } from "../../Firebase/utils";
const AvailableVaccine = () => {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
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

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs="6">
          <Typography variant="h5">Available Vaccine(s)</Typography>
        </Grid>
        <Grid item xs="6">
          <GridList cols={3}>
            {vaccines &&
              vaccines.map((index) => (
                <>
                  {/* either index.availability == true or this */}
                  {index.stocks > 0 ? (
                    <Card
                      style={{
                        margin: "1rem",
                        padding: "1.5rem",
                        justifyContent: "center",
                        borderRadius: "12px",
                      }}
                    >
                      <Typography variant="body">
                        Vaccine: {index.vaccine} <br />
                        Dose: {index.dose} <br />
                        Days Apart: {index.daysApart} days
                      </Typography>
                    </Card>
                  ) : (
                    <></>
                  )}
                </>
              ))}
          </GridList>
        </Grid>
      </Grid>
    </div>
  );
};

export default AvailableVaccine;
