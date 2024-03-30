import React from "react";
import Chart from "react-apexcharts";

const CameraPieChart = () => {
  // Assuming person count for each camera, modify this data according to your actual data
  const cameraPersonCount = [10, 15, 8, 12, 6, 18, 5, 9, 7];

  const options = {
    labels: cameraPersonCount.map(
      (count, index) => `Camera ${index + 1} (${count})`
    ),
    legend: {
      show: true,
      position: "right",
    },
    chart: {
      type: "donut",
    },
  };

  const series = cameraPersonCount;

  return (
    <div className="donut-chart">
      <Chart options={options} series={series} type="donut" width="430" />
    </div>
  );
};

export default CameraPieChart;
