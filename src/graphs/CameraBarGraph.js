import React from "react";
import Chart from "react-apexcharts";

const CameraBarGraph = () => {
  // Sample data (you can replace it with your actual data)
  const cameraData = [
    { name: "Camera 1", count: 10 },
    { name: "Camera 2", count: 20 },
    { name: "Camera 3", count: 15 },
    { name: "Camera 4", count: 25 },
    { name: "Camera 5", count: 30 },
    { name: "Camera 6", count: 18 },
    { name: "Camera 7", count: 22 },
    { name: "Camera 8", count: 28 },
    { name: "Camera 9", count: 12 },
  ];

  // Extracting camera names and counts for x and y axes
  const cameraNames = cameraData.map((data) => data.name);
  const cameraCounts = cameraData.map((data) => data.count);

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

export default CameraBarGraph;
