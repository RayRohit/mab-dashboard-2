import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const DummyLine = ({ data }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Count",
        data: [],
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
        categories: [],
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

  useEffect(() => {
    // Parse data to update chartData state
    const categories = data.map((item) => item.time);
    const counts = data.map((item) => parseInt(item.count)); // Parse count to integer
    setChartData((prevData) => ({
      ...prevData,
      series: [{ ...prevData.series[0], data: counts }],
      options: {
        ...prevData.options,
        xaxis: {
          ...prevData.options.xaxis,
          categories: categories,
        },
      },
    }));
  }, [data]); // Update when data changes

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

export default DummyLine;
