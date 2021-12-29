//side effects
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { firestore } from "../../../Firebase/utils";
import SelectVaccine from "../SelectVaccine/selectVaccine";

const ChartWithSelect = () => {
  //for the vaccines-------------------------------------------------
  const [vaccines, setVaccines] = useState([]);

  const [selectedVaccine, setSelectedVaccine] = useState("");
  const handleChangeVaccine = (e) => setSelectedVaccine(e.target.value);
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

  const [users, setUsers] = useState([]);
  const [boosterUsers, setBoosterUsers] = useState([]); //--------booster

  useEffect(() => {
    let mounted = true;

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

    //----for booster---------------------------------------
    const getData2 = async () => {
      const citiesRef = firestore.collection("users");
      const snapshot = await citiesRef
        .where("doses.selectedBooster", "==", selectedVaccine)
        .get();
      if (snapshot.empty) {
        setBoosterUsers([]); //for the sputnik where data is empty
        return;
      }

      snapshot.forEach((doc) => {
        if (mounted) {
          const usersData = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          setBoosterUsers(usersData);
        }
      });
    };
    //-------------------------------------------------------

    if (selectedVaccine) {
      getData1();
      getData2();
    }

    return () => {
      mounted = false;
    };
  }, [selectedVaccine]);

  const total = users.length;

  //1st Dose
  const counts = users.reduce((acc, cur) => {
    return !cur["1"]?.sideEffects1
      ? acc
      : Object.entries(cur["1"]?.sideEffects1).reduce((acc, [key, value]) => {
          if (value) {
            acc[key] = (acc[key] || 0) + (1 / total) * 100;
          }
          return acc;
        }, acc);
  }, {});

  //2nd Dose
  const counts2 = users.reduce((acc, cur) => {
    return !cur["2"]?.sideEffects2
      ? acc
      : Object.entries(cur["2"]?.sideEffects2).reduce((acc, [key, value]) => {
          if (value) {
            acc[key] = (acc[key] || 0) + (1 / total) * 100;
          }
          return acc;
        }, acc);
  }, {});

  //----------------------booster-------------------------------------------------
  const counts3 = users.reduce((acc, cur) => {
    return !cur["3"]?.sideEffects3
      ? acc
      : Object.entries(cur["3"]?.sideEffects3).reduce((acc, [key, value]) => {
          if (value) {
            acc[key] = (acc[key] || 0) + (1 / total) * 100;
          }
          return acc;
        }, acc);
  }, {});
  //----------------------booster-------------------------------------------------

  const dose1 = Object.entries(counts).reduce((acc, [key, value]) => {
    return { ...acc, [key]: value.toFixed(2) };
  }, {});

  const dose2 = Object.entries(counts2).reduce((acc, [key, value]) => {
    return { ...acc, [key]: value.toFixed(2) };
  }, {});

  //-----------boooster
  const dose3 = Object.entries(counts3).reduce((acc, [key, value]) => {
    return { ...acc, [key]: value.toFixed(2) };
  }, {});
  //------------------------------------------------------------

  const others1 = users.filter(
    (v) => v["1"]?.others !== undefined && v["1"]?.others !== ""
  );

  const others2 = users.filter(
    (v) => v["2"]?.others !== undefined && v["2"]?.others !== ""
  );

  //-----------booster
  const others3 = users.filter(
    (v) => v["3"]?.others !== undefined && v["3"]?.others !== ""
  );
  //--------------------------------------------------------------

  dose1.others = ((others1.length / total) * 100).toFixed(2);
  dose2.others = ((others2.length / total) * 100).toFixed(2);
  dose3.others = ((others3.length / total) * 100).toFixed(2); //----booster

  const labels = [...new Set([...Object.keys(dose1), ...Object.keys(dose2)])];

  const getData = (data) => {
    return labels.map((label) => data[label]);
  };

  return (
    <div>
      <SelectVaccine
        value={selectedVaccine}
        onChange={handleChangeVaccine}
        vaccines={vaccines}
      />
      {selectedVaccine == "J&J" ? <h5>J&J does not have a 2nd dose</h5> : <></>}
      <h5>Total vaccinated : {total}</h5>
      <div>
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "1st Dose",
                data: getData(dose1),
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
              {
                label: "2nd Dose",
                data: getData(dose2),
                backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                borderColor: ["rgba(255, 159, 64, 1)"],
                borderWidth: 1,
              },
              {
                label: "Booster",
                data: getData(dose3),
                backgroundColor: ["rgba(255, 159, 64, 0.2)"],
                borderColor: ["rgba(255, 159, 64, 1)"],
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
              text: selectedVaccine,
              fontSize: 20,
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
              datalabels: {
                formatter: (val, context) => `${val || 0}%`,
              }, // for the label percentage symbol inside the graph
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

export default ChartWithSelect;
