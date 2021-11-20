import React, { useEffect, useState } from "react";
import { firestore } from "../../../Firebase/utils";
import { useLocation, useHistory } from "react-router-dom";
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Loading from "../../../components/Loading/loading";

const UserDetails = () => {
  const location = useLocation();
  const rowData = location.state;
  const [user, setUser] = useState([]);
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const usersRef = firestore.collection("users").doc(rowData);
      const doc = await usersRef.get();
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        setUser(doc.data());
        setLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let sideEffects1 = [];
  const userItems1 = user[1]?.sideEffects1;
  if (userItems1) {
    for (const [key, value] of Object.entries(userItems1)) {
      sideEffects1.push(key, ",");
    }
  }

  let sideEffects2 = [];
  const userItems2 = user[2]?.sideEffects2;
  if (userItems2) {
    for (const [key, value] of Object.entries(userItems2)) {
      sideEffects2.push(key, ",");
    }
  }

  const goToPreviousPath = () => {
    history.goBack();
  };

  return (
    <>
      {loading ? (
        <div>
          {" "}
          <Card elevation={10} style={{ padding: "1rem" }}>
            <ArrowBackIcon
              onClick={goToPreviousPath}
              style={{ float: "left" }}
              fontSize="large"
              color="primary"
            />
            <CardHeader
              title={
                user.firstName + " " + user?.middleName + " " + user.lastName
              }
              subheader={user.doses?.id}
            />
            <CardContent>
              <Grid item>
                <h4>Category {user.doses?.category}</h4>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div>
                    <List>
                      <Typography variant="h6">User Information: </Typography>
                      <ListItem>
                        <Typography>Phone Number : </Typography>
                        <ListItemText primary={user.phoneNumber} />
                      </ListItem>
                      <ListItem>
                        <Typography>Email : </Typography>
                        <ListItemText primary={user.email} />
                      </ListItem>
                      <ListItem>
                        <Typography>Address : </Typography>
                        <ListItemText primary={user.address} />
                      </ListItem>
                      <ListItem>
                        <Typography>Birthdate : </Typography>
                        <ListItemText
                          primary={new Date(
                            user.birthdate
                          ).toLocaleDateString()}
                        />
                      </ListItem>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div>
                    <List>
                      <Typography variant="h6">
                        Vaccine Information:{" "}
                      </Typography>

                      <ListItem>
                        <Typography>Vaccine : </Typography>
                        <ListItemText primary={user.doses?.selectedVaccine} />
                      </ListItem>

                      <ListItem>
                        <Typography>First Dose : </Typography>
                        <ListItemText
                          primary={
                            new Date(
                              user.doses?.firstDose.seconds * 1000
                            ).toDateString() +
                            " at " +
                            new Date(
                              user.doses?.firstDose.seconds * 1000
                            ).toLocaleTimeString()
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <Typography>Batch Number : </Typography>
                        <ListItemText primary={user.doses?.batchNo} />
                      </ListItem>
                      <ListItem>
                        <Typography>First Vaccinator : </Typography>
                        <ListItemText primary={user.doses?.firstVaccinator} />
                      </ListItem>

                      <Divider />
                      {user.doses?.secondVaccinator ? (
                        <>
                          <ListItem>
                            <Typography>Second Dose : </Typography>
                            <ListItemText
                              primary={
                                new Date(
                                  user.doses?.secondDose.seconds * 1000
                                ).toDateString() +
                                " at " +
                                new Date(
                                  user.doses?.secondDose.seconds * 1000
                                ).toLocaleTimeString()
                              }
                            />
                          </ListItem>
                          <ListItem>
                            <Typography>Batch Number : </Typography>
                            <ListItemText primary={user.doses?.batchNo2} />
                          </ListItem>
                          <ListItem>
                            <Typography>Second Vaccinator: </Typography>
                            <ListItemText
                              primary={user.doses?.secondVaccinator}
                            />
                          </ListItem>
                        </>
                      ) : (
                        <>
                          {user.doses?.selectedVaccine === "J&J" ? (
                            <></>
                          ) : (
                            <>
                              {" "}
                              <ListItem>
                                <Typography>Expected Second Dose : </Typography>
                                <ListItemText
                                  primary={new Date(
                                    user.doses?.secondDose.seconds * 1000
                                  ).toDateString()}
                                />
                              </ListItem>
                            </>
                          )}
                        </>
                      )}
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div>
                    <List>
                      <Typography variant="h6">Side Effects </Typography>

                      <ListItem>
                        <Typography>First Dose : </Typography>
                        <ListItemText primary={sideEffects1} />
                      </ListItem>
                      <ListItem>
                        <Typography>Others : </Typography>
                        <ListItemText primary={user[1]?.others} />
                      </ListItem>

                      {user.doses?.selectedVaccine === "J&J" ? ( //if selectedVaccine is equals to J&J
                        <></> //if yes, show nothing
                      ) : (
                        <>
                          {/* if not, then show the second dose  */}
                          <ListItem>
                            <Typography>Second Dose : </Typography>
                            <ListItemText primary={sideEffects2} />
                          </ListItem>
                          <ListItem>
                            <Typography>Others : </Typography>
                            <ListItemText primary={user[2]?.others} />
                          </ListItem>
                        </>
                      )}
                    </List>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Complaints or Concerns </Typography>
                  <ListItem>
                    <ListItemText primary={user?.complaints} />
                  </ListItem>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserDetails;
