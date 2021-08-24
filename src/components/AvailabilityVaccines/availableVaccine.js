import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  GridList,
} from "@material-ui/core";
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
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Card elevation={10} style={{ padding: "1rem" }}>
          <CardHeader title="Announcement" />
          <GridList cols={3}>
            {vaccines &&
              vaccines.map((index) => (
                <>
                  {index.availability == true ? (
                    <CardContent>
                      Vaccine: {index.vaccine} <br />
                      Dose: {index.dose} <br />
                      Days Apart: {index.daysApart} days
                    </CardContent>
                  ) : (
                    <></>
                  )}
                </>
              ))}
          </GridList>
        </Card>
      </Grid>
    </div>
  );
};

export default AvailableVaccine;
