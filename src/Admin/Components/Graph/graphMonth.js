import React, { useState, useEffect } from "react";
import { firestore } from "../../../Firebase/utils";
import SelectVaccine from "../SelectVaccine/selectVaccine";
import { Line } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const GraphMonth = () => {
  const [users, setUsers] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState(0);
  const handleChangeVaccine = (e) => setSelectedVaccine(e.target.value);
  const [error, setError] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());

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

  //----------------------------------------------------
  useEffect(() => {
    let mounted = true;

    const getData1 = async () => {
      const citiesRef = firestore.collection("users");
      const snapshot = await citiesRef
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .get();
      if (snapshot.empty) {
        setError("No matching documents.");
        setUsers([]); //for the sputnik where data is empty
        return;
      }

      snapshot.forEach((doc) => {
        if (mounted) {
          const usersData = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          setUsers(usersData);
        }
      });
    };

    if (selectedVaccine) {
      getData1();
    }

    return () => {
      mounted = false;
    };
  }, [selectedVaccine]);

  const dosesTemplate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const d1 = users.filter(
    (d) =>
      new Date(d.doses.firstDose.seconds * 1000).getFullYear() ==
      selectedDate.getFullYear()
  );

  const doses1 = d1.reduce(
    (acc, cur) => {
      if (!cur.doses.dose1) return acc;
      const month = new Date(cur.doses.firstDose.seconds * 1000).getMonth();
      acc[month] = acc[month] + 1;
      return acc;
    },
    [...dosesTemplate]
  );

  const d2 = users.filter(
    (d) =>
      new Date(d.doses.secondDose.seconds * 1000).getFullYear() ==
      selectedDate.getFullYear()
  );

  const doses2 = d2.reduce(
    (acc, cur) => {
      if (!cur.doses.dose2) return acc;
      const month = new Date(cur.doses.secondDose.seconds * 1000).getMonth();
      acc[month] = acc[month] + 1;

      return acc;
    },
    [...dosesTemplate]
  );

  return (
    <div>
      <div>
        <Grid container>
          <Grid item xs={6}>
            <SelectVaccine
              value={selectedVaccine}
              onChange={handleChangeVaccine}
              vaccines={vaccines}
            />
          </Grid>

          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                views={["year"]}
                label="Year"
                value={selectedDate}
                minDate={new Date("01/01/2021").toString()}
                onChange={handleDateChange}
                animateYearScrolling
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </div>

      <div>
        <Line
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: "1st Dose",
                data: doses1,
                backgroundColor: ["red"],

                borderWidth: 1,
              },
              {
                label: "2nd Dose",
                data: doses2,
                backgroundColor: ["orange"],
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: selectedVaccine,
              fontSize: 20,
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default GraphMonth;
