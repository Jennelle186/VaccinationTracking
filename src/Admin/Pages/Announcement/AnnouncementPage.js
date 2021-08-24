import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  makeStyles,
  Grid,
  CardHeader,
  CardContent,
  IconButton,
  CardActions,
} from "@material-ui/core";
import { firestore } from "../../../Firebase/utils";
import ButtonForm from "../../../components/Forms/Button/button";

//icons
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Delete from "@material-ui/icons/Delete";
import parse from "html-react-parser";

const useStyles = makeStyles({
  root: {
    // margin: "0 auto",
    marginBottom: "1rem",
    padding: "1rem",
  },
  link: {
    textDecoration: "none",
  },
});

const AnnouncementPage = () => {
  const classes = useStyles();
  const [announcement, setAnnouncement] = useState([]);
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    const unsubscribe = firestore
      .collection("announcement")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setAnnouncement(arr);
        setIsLoading(true);
      });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <Card className={classes.root}>
        <Typography variant="h5">Announcement </Typography>
        <Grid container justify="flex-end">
          <Link to="/add-announcement" className={classes.link}>
            <ButtonForm>
              <AddIcon /> Add Announcement
            </ButtonForm>
          </Link>
          <Card>
            {announcement &&
              announcement.map((index) => (
                <CardContent>{parse(index.text)}</CardContent>
              ))}
          </Card>
        </Grid>
      </Card>
    </div>
  );
};

export default AnnouncementPage;
