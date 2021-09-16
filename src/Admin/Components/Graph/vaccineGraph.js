//graph for all of the total 1st dose and 2nd dose of vaccination
import React, { useState, useEffect } from "react";
import { firestore } from "../../../Firebase/utils";
import { Bar } from "react-chartjs-2";
import SelectVaccine from "../SelectVaccine/selectVaccine";

const VaccineGraph = (props) => {
  const [size, setSize] = useState(0);
  const [size2, setSize2] = useState(0);
  const [selectedVaccine, setSelectedVaccine] = useState(0);
  const handleChangeVaccine = (e) => setSelectedVaccine(e.target.value);
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

  useEffect(() => {
    let mounted = true;

    //count number of users with this type of vaccine
    const getUsers = async () => {
      const ref = firestore.collection("users");
      const snapshot = await ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .get();

      if (mounted) {
        setUsersSize(snapshot.size);
      }
    };

    const getData1 = async () => {
      const citiesRef = firestore.collection("users");
      const snapshot = await citiesRef
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("doses.dose1", "==", true)
        .get();

      if (mounted) {
        setSize(snapshot.size);
      }
    };

    const getData2 = async () => {
      const citiesRef = firestore.collection("users");
      const snapshot = await citiesRef
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("doses.dose2", "==", true)
        .get();

      if (mounted) {
        setSize2(snapshot.size);
      }
    };

    if (selectedVaccine) {
      getUsers();
      getData1();
      getData2();
    }

    return () => {
      mounted = false;
    };
  }, [selectedVaccine]);

  //percentage computation
  let dose1 = (size / usersSize) * 100;
  let dose2 = (size2 / usersSize) * 100;

  return (
    <div>
      <div>
        <SelectVaccine
          value={selectedVaccine}
          onChange={handleChangeVaccine}
          vaccines={vaccines}
        />
      </div>
      {selectedVaccine == "J&J" ? (
        <h5>J&J only has 1st dose of vaccine</h5>
      ) : (
        <></>
      )}
      <div>
        <Bar
          data={{
            labels: ["1st Dose", "2nd Dose"],
            datasets: [
              {
                label: "1st Dose",
                data: [dose1, dose2],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
              {
                label: "2nd Dose",
                backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                borderColor: ["rgba(158,207,250,0.3)"],
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Hello",
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

export default VaccineGraph;
