import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
// import CameraBarGraph from "../graphs/CameraBarGraph";
// import CameraPieChart from "../graphs/CameraPieChart";
// import LineGraph from "../graphs/LineGraph";
// import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import DummyLine from "../graphs/DummyLine";
import data from "../graphs/Dummy.json";
import DummyBar from "../graphs/DummyBar";
import DummyPie from "../graphs/DummyPie";
import axios from "axios";

export default function GraphicalAnalytics() {
  // const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [bar, setBar] = useState("entry");
  const [pie, setPie] = useState("entry");
  const [line, setLine] = useState("entry");
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barGraph, setBarGraph] = useState({
    entry: [],
    exit: [],
  });
  const [pieGraph, setPieGraph] = useState({
    entry: [],
    exit: [],
  });
  useEffect(() => {
    setInterval(() => {
      ServerCall();
    }, 1000);
  }, []);
  async function ServerCall() {
    try {
      console.log("api");
      const response = await axios.get("http://127.0.0.1:5000/analyticsdata");
      console.log(response.data);
      setAnalyticsData(response.data);
      setBarGraph((prev) => {
        return {
          entry: response.data["bar_graph_entry"],
          exit: response.data["bar_graph_exit"],
        };
      });
      setPieGraph((prev) => {
        return {
          entry: response.data["pie_chart_entry"],
          exit: response.data["pie_chart_exit"],
        };
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const pieExit = [
    {
      count: 0,
      name: "Gate_A_E1",
    },
    {
      count: 0,
      name: "Gate_B_E2",
    },
    {
      count: 0,
      name: "Gate_B_E3",
    },
    {
      count: 0,
      name: "Gate_B_E4",
    },
    {
      count: 0,
      name: "Gate_C_E1",
    },
    {
      count: 0,
      name: "Gate_C_E2",
    },
    {
      count: 0,
      name: "Gate_C_E4",
    },
    {
      count: 0,
      name: "Gate_D_E1",
    },
    {
      count: 0,
      name: "IMAX",
    },
  ];

  // const BarGraphEntryData = analyticsData["bar_graph_entry"];
  // const BarGraphExitData = analyticsData["bar_graph_exit"];
  // const PieChartEntryData = analyticsData["pie_chart_entry"];
  // const PieChartExitData = analyticsData["pie_chart_exit"];

  useEffect(() => {
    const newBarData =
      bar === "entry" ? barGraph?.entry : bar === "exit" ? barGraph?.exit : [];
    setBarData(newBarData);
  }, [bar, barGraph]);

  useEffect(() => {
    const newPieData =
      pie === "entry"
        ? pieGraph?.entry
        : pie === "exit" && pieGraph?.exit.length === 0
        ? pieExit
        : pieGraph?.exit;
    setPieData(newPieData);
  }, [pie, pieGraph]);

  const handleBarChange = (event) => {
    setBar(event.target.value);
  };
  const handlePieChange = (event) => {
    setPie(event.target.value);
  };
  const handleLineChange = (event) => {
    setLine(event.target.value);
  };
  // const lineData = [
  //   { time: "10AM", count: "245" },
  //   {
  //     time: "11AM",
  //     count: "245",
  //   },
  //   {
  //     time: "12PM",
  //     count: "145",
  //   },
  //   {
  //     time: "1PM",
  //     count: "150",
  //   },
  //   {
  //     time: "2PM",
  //     count: "350",
  //   },
  //   {
  //     time: "3PM",
  //     count: "625",
  //   },
  //   {
  //     time: "4PM",
  //     count: "551",
  //   },
  //   {
  //     time: "5PM",
  //     count: "800",
  //   },
  //   {
  //     time: "6PM",
  //     count: "1100",
  //   },
  // ];
  return (
    <Box sx={{ m: 1 }}>
      <Box sx={{ border: "2px solid grey", px: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bolder", p: 2 }}>
          Graphical Analytics
        </Typography>
        <Grid container spacing={3} sx={{ py: 3 }}>
          <Grid item xs={6}>
            <Paper elevation={4} sx={{ height: "420px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
                  Bar Graph
                </Typography>
                <Select
                  value={bar}
                  onChange={handleBarChange}
                  sx={{ mr: 2, mt: 1 }}
                >
                  <MenuItem value="entry">Entry Data</MenuItem>
                  <MenuItem value="exit">Exit Data</MenuItem>
                </Select>
              </Box>
              {/* <CameraBarGraph data={barData} /> */}
              {/* <DummyBar data={barData} /> */}
              <DummyBar
                data={bar === "entry" ? barGraph.entry : barGraph.entry}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={4} sx={{ height: "420px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
                  Pie Graph
                </Typography>
                <Select
                  value={pie}
                  onChange={handlePieChange}
                  sx={{ mr: 2, mt: 1 }}
                >
                  <MenuItem value="entry">Entry Data</MenuItem>
                  <MenuItem value="exit">Exit Data</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {/* <CameraPieChart /> */}
                {/* <DummyPie data={pieData} /> */}
                <DummyPie
                  // data={
                  //   pie === "entry"
                  //     ? pieGraph.entry
                  //     : pie === "exit" && pieGraph?.exit.length === 0
                  //     ? pieExit
                  //     : pieGraph?.exit
                  // }
                  data={
                    pie === "entry"
                      ? pieGraph?.entry.length === 0
                        ? pieExit
                        : pieGraph.entry
                      : pie === "exit"
                      ? pieGraph?.exit.length === 0
                        ? pieExit
                        : pieGraph.exit
                      : [] // or whatever default value you want
                  }
                />
              </Box>
            </Paper>
          </Grid>
          {/* <Grid item xs={12}>
            <Paper elevation={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
                  Line Graph
                </Typography>
                <Select
                  value={line}
                  onChange={handleLineChange}
                  sx={{ mr: 2, mt: 1 }}
                >
                  <MenuItem value="entry">Entry Data</MenuItem>
                  <MenuItem value="exit">Exit Data</MenuItem>
                </Select>
              </Box>
              <LineGraph />
            </Paper>
          </Grid> */}
          {/* <Grid item xs={12}>
            <Paper elevation={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
                  Line Graph
                </Typography>
                <Select
                  value={line}
                  onChange={handleLineChange}
                  sx={{ mr: 2, mt: 1 }}
                >
                  <MenuItem value="entry">Entry Data</MenuItem>
                  <MenuItem value="exit">Exit Data</MenuItem>
                </Select>
              </Box>
              <DummyLine data={lineData} />
            </Paper>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}
