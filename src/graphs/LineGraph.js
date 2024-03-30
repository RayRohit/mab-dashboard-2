import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineGraph = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Count",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        type: "category",
        categories: [
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "1:00 PM",
          "2:00 PM",
          "3:00 PM",
          "4:00 PM",
          "5:00 PM",
          "6:00 PM",
        ],
        labels: {
          formatter: function (value) {
            // Ensure the value is not undefined or null before splitting
            if (value) {
              return value.split(" ")[0];
            }
            return "";
          },
        },
      },
      yaxis: {
        title: {
          text: "Count",
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={250}
        />
      </div>
    </div>
  );
};

export default LineGraph;

// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const LineGraph = () => {
//   const [chartData, setChartData] = useState({
//     series: [
//       {
//         name: "Count",
//         data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
//       },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: "line",
//         zoom: {
//           enabled: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "straight",
//       },
//       grid: {
//         row: {
//           colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
//           opacity: 0.5,
//         },
//       },
//       xaxis: {
//         type: "category",
//         categories: [
//           "10:00 AM",
//           "11:00 AM",
//           "12:00 PM",
//           "1:00 PM",
//           "2:00 PM",
//           "3:00 PM",
//           "4:00 PM",
//           "5:00 PM",
//           "6:00 PM",
//         ],
//       },
//       yaxis: {
//         title: {
//           text: "Count",
//         },
//       },
//     },
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart
//           options={chartData.options}
//           series={chartData.series}
//           type="line"
//           height={250}
//         />
//       </div>
//     </div>
//   );
// };

// export default LineGraph;
