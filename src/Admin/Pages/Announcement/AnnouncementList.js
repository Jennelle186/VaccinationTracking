import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  makeStyles,
  Grid,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Pagination from "@material-ui/lab/Pagination";
import { firestore } from "../../../Firebase/utils";
import parse from "html-react-parser";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1.5rem",
    padding: "1rem",
    marginTop: "1.5rem",
    borderRadius: "12px",
    transition: "transform 1s",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
    margin: "0 auto",
  },
}));

const AnnouncementList = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("announcement")
      .orderBy("createdDate", "desc")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setData(arr);
        setIsLoading(true);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  //for pagination
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const rawPages = data.length / itemsPerPage;
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

  const handleDelete = (uid) => {
    try {
      const userRef = firestore
        .collection("announcement")
        .doc(uid)
        .delete()
        .then(() => {
          console.log("saved");
        })
        .catch((error) => {
          console.log("error");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (uid) => {
    props.history.push("/edit-announcement", uid);
  };

  return (
    <div>
      {isLoading ? (
        <>
          {data &&
            data
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((index, i) => (
                <Grid key={index.id}>
                  <Card className={classes.root} elevation={10}>
                    <CardHeader
                      title={index.title}
                      subheader={new Date(
                        index.createdDate.seconds * 1000
                      ).toDateString()}
                      action={
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => handleEdit(`${index.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                      }
                    />

                    <CardActions disableSpacing>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Tooltip title="Show More">
                          <IconButton
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: expanded,
                            })}
                            onClick={() => handleExpandClick(i)}
                            aria-expanded={expandedId === i}
                            aria-label="show more"
                            color="primary"
                            style={{ margin: "0 auto" }}
                          >
                            <ExpandMoreIcon fontSize="large" edge="start" />
                          </IconButton>
                        </Tooltip>

                        <Grid item>
                          <IconButton
                            onClick={() => {
                              handleDelete(`${index.id}`);
                            }}
                            color="secondary"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardActions>

                    <Collapse
                      in={expandedId === i}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>{parse(index.text)}</CardContent>
                    </Collapse>
                  </Card>
                </Grid>
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
        <h1>Loading..</h1>
      )}
    </div>
  );
};

export default withRouter(AnnouncementList);
