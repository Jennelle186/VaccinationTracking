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
import Pagination from "@material-ui/lab/Pagination";

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
  paginator: {
    justifyContent: "center",
    padding: "10px",
    margin: "0 auto",
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

  //for pagination
  const itemsPerPage = 1;
  const [page, setPage] = useState(1);
  const rawPages = announcement.length / itemsPerPage;
  const noOfPages = Math.ceil(rawPages);
  const handleChange = (event, value) => {
    setPage(value);
  };
  //---------------------------------------------
  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState(-1);
  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };
  //----------------------------------------------

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
        </Grid>

        {isLoading ? (
          <>
            {announcement &&
              announcement
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((index) => (
                  <>
                    <CardHeader
                      title={index.title}
                      subheader={new Date(
                        index.createdDate.seconds * 1000
                      ).toDateString()}
                    />
                    <CardContent>{parse(index.text)}</CardContent>
                  </>
                ))}
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              variant="outlined"
              defaultPage={1}
              color="primary"
              siblingCount={0}
              size="large"
              showFirstButton
              showLastButton
              classes={{ ul: classes.paginator }}
            />
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </Card>
    </div>
  );
};

export default AnnouncementPage;
