import React from "react";
import Chart from "react-apexcharts";

const DummyPie = ({ data }) => {
  const options = {
    labels: data.map(({ name, count }) => `${name} (${count})`),
    legend: {
      show: true,
      position: "right",
    },
    chart: {
      type: "donut",
    },
  };

  const series = data.map(({ count }) => count);

  return (
    <div className="donut-chart">
      <Chart options={options} series={series} type="donut" width="425" />
    </div>
  );
};

export default DummyPie;
