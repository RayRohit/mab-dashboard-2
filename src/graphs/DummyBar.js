import React from "react";
import Chart from "react-apexcharts";

const DummyBar = ({ data }) => {
  // Extracting camera names and counts for x and y axes
  const cameraNames = data.map((data) => data.name);
  const cameraCounts = data.map((data) => data.count);
  console.log(cameraCounts)
  // Chart options
  const options = {
    chart: {
      id: "camera-bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: cameraNames,
    },
  };

  // Chart series data
  const series = [
    {
      name: "Count",
      data: cameraCounts,
    },
  ];

  return (
    <div className="chart">
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default DummyBar;
