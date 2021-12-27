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
  const [selectedDate, handleDateChange] = useState(new Date());
  const [usersSize, setUsersSize] = useState(0);

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

    const getUsers = async () => {
      const ref = firestore.collection("users").onSnapshot((snap) => {
        setUsersSize(snap.size);
      });
    };

    const getData1 = async () => {
      const citiesRef = firestore.collection("users");
      const snapshot = await citiesRef
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .get();
      if (snapshot.empty) {
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
      getUsers();
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

  //-------------booster------------------------------------------------------------
  const booster = d2.reduce(
    (acc, cur) => {
      if (!cur.doses.dose2) return acc;
      const month = new Date(cur.doses?.boosterDate?.seconds * 1000).getMonth();
      acc[month] = acc[month] + 1;

      return acc;
    },
    [...dosesTemplate]
  );
  //-------------booster------------------------------------------------------------

  const realDoses = doses1.map((dose) => {
    return ((dose / usersSize) * 100).toFixed();
  });

  const realDoses2 = doses2.map((dose) => {
    return ((dose / usersSize) * 100).toFixed();
  });

  //---booster-------------------------------------------------------
  const realBooster = booster.map((dose) => {
    return ((dose / usersSize) * 100).toFixed();
  });

  return (
    <div>
      Total Users: {usersSize}
      <div>
        <Grid container>
          {/* select a vaccine */}
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
                data: realDoses,
                backgroundColor: ["red"],
                borderWidth: 2,
                borderColor: "black",
              },
              {
                label: "2nd Dose",
                data: realDoses2,
                backgroundColor: ["orange"],
                borderWidth: 2,
                borderColor: "black",
              },
              {
                label: "Booster", //-----------booster
                data: realBooster,
                backgroundColor: ["green"],
                borderWidth: 2,
                borderColor: "black",
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
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    var label = context.dataset.label || "";
                    if (context.parsed.y !== null) {
                      label += " " + context.parsed.y + "%";
                    }
                    return label;
                  },
                },
              },
            },
            scales: {
              y: {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 20,
                  callback: function (value) {
                    return ((value / this.max) * 100).toFixed(0) + "%"; // convert it to percentage
                  },
                },
              },
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
