import React, { useState, useEffect } from "react";
import { firestore } from "../../../Firebase/utils";
import { Pie } from "react-chartjs-2";
import SelectVaccine from "../SelectVaccine/selectVaccine";

import "chartjs-plugin-datalabels";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const PieGraph = () => {
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const handleChangeVaccine = (e) => setSelectedVaccine(e.target.value);
  const [users, setUsers] = useState([]);
  const [size, setSize] = useState([]);

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
    return firestore.collection("users").onSnapshot((snap) => {
      setSize(snap.size);
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    //dependin on the selected vacccine
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
    }

    return () => {
      mounted = false;
    };
  }, [selectedVaccine]);

  const doses1 = users.filter((v) => v.doses?.dose1 == true);

  const doses2 = users.filter(
    (v) => v.doses?.dose1 == true && v.doses?.dose2 == true
  );

  let dose1Percent = ((doses1.length / size) * 100).toFixed(2);
  let dose2Percent = ((doses2.length / size) * 100).toFixed(2);

  return (
    <div>
      <div>
        <SelectVaccine
          value={selectedVaccine}
          onChange={handleChangeVaccine}
          vaccines={vaccines}
        />
      </div>
      {selectedVaccine == "J&J" ? <h5>J&J does not have a 2nd dose</h5> : <></>}
      <h5>Total Registered Users: {size}</h5>
      <div>
        <Pie
          data={{
            labels: ["1st Dose", "2nd Dose"],
            datasets: [
              {
                data: [dose1Percent, dose2Percent],
                backgroundColor: ["#ffa600", "#ff6361"],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Selected",
              fontSize: 20,
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
            plugins: {
              datalabels: {
                backgroundColor: function (context) {
                  return context.dataset.backgroundColor;
                },
                formatter: (val, context) => `${val}%`,

                borderRadius: 25,
                borderWidth: 3,
                color: "white",
                font: {
                  weight: "bold",
                },
                padding: 6,
              },

              tooltip: {
                callbacks: {
                  label: (ttItem) => `${ttItem.label}: ${ttItem.parsed}%`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieGraph;
