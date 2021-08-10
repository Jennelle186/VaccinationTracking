import React, { useState } from "react";
import {
  Typography,
  TextField,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Card,
} from "@material-ui/core";
import ButtonForm from "./../Forms/Button/button";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "0 auto",
    marginBottom: "1rem",
    padding: "1rem",
  },
});

const SideEffects = (props) => {
  const classes = useStyles();
  const [others, setOthers] = useState("");
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
  });
  const handleCheckbox = (event) => {
    console.log(event.target.value);
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(others, state);
  };

  return (
    <Container>
      <Typography>
        Mark the symptoms or side effects you've experienced{" "}
      </Typography>
      {/* https://stackoverflow.com/questions/55968689/how-can-i-use-checkbox-form-in-react */}
      <form onSubmit={handleSubmit}>
        <Card className={classes.root}>
          <FormGroup style={{ alignContent: "center", padding: "1rem" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  name="checkedA"
                  color="primary"
                  value="Fever"
                  onChange={handleCheckbox}
                />
              }
              label="Fever"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  name="checkedB"
                  color="primary"
                  value="Headache"
                  onChange={handleCheckbox}
                />
              }
              label="Headache"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedC}
                  name="checkedC"
                  color="primary"
                  value="Nausea"
                  onChange={handleCheckbox}
                />
              }
              label="Nausea"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedD}
                  name="checkedD"
                  color="primary"
                  value="Muscle Pain"
                  onChange={handleCheckbox}
                />
              }
              label="Muscle Pain"
            />
            <TextField
              type="text"
              label="Ohers:"
              value={others}
              onChange={(e) => setOthers(e.target.value)}
              multiline
            />
          </FormGroup>
          <ButtonForm type="submit">Submit</ButtonForm>
        </Card>
        <br />
      </form>
    </Container>
  );
};

export default SideEffects;
