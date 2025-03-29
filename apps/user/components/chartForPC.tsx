"use client"
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChartPC() {
  // X-axis labels
  const labels = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug"];

  // Data to display on the chart
  const datasetValues1 = [12, 45, 67, 43, 89, 34, 67, 43];
  const datasetValues2 = [80, 35, 327, 43, 83, 24, 17, 53];


  // Define data using ChartData type for a line chart
  const data: ChartData<"line", number[], unknown> = {
    labels,
    datasets: [
      {
        label: "My First Dataset",
        data: datasetValues1,
        fill: false,
        borderColor: "rgb(73, 89, 232)",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Payment Growth ",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Y-axis Label",
        },
        display: true,
        min: 10,
      },
      x: {
        title: {
          display: true,
          text: "X-axis Label",
        },
        display: true,
      },
    },
  };
  const [selectedOptionForTime, setSelectedOptionForTime] = useState("1W");
  return (
    <div className="bg-slate-50 rounded-lg max-w-screen" style={{ minWidth:"700px", maxWidth: "1000px", margin: "10 auto", height: "500px",}}>
      <Line data={data} options={options} />
        <div className="flex justify-center max-w-screen my-14">
          <div className="bg-slate-300 w-max rounded-full">
            <button onClick={() => {
              setSelectedOptionForTime("1W")
            }} className={`${selectedOptionForTime === "1W" ? "bg-white" : ""} items-center rounded-3xl min-h-10 px-2 mx-1 my-1`}>
              1W
            </button>
            <button onClick={() => {
              setSelectedOptionForTime("1M")
            }} className={`${selectedOptionForTime === "1M" ? "bg-white" : ""} items-center rounded-3xl min-h-10 px-3 mx-2 my-1`}>
              1M
            </button>
            <button onClick={() => {
              setSelectedOptionForTime("3M")
            }} className={`${selectedOptionForTime === "3M" ? "bg-white" : ""} items-center rounded-3xl min-h-10 px-3 mx-2 my-1`}>
              3M
            </button>
            <button onClick={() => {
              setSelectedOptionForTime("6M")
            }} className={`${selectedOptionForTime === "6M" ? "bg-white" : ""} items-center rounded-3xl min-h-10 px-3 mx-2 my-1`}>
              6M
            </button>
            <button onClick={() => {
              setSelectedOptionForTime("1Y")
            }} className={`${selectedOptionForTime === "1Y" ? "bg-white" : ""} items-center rounded-3xl min-h-10 px-3 mx-2 my-1`}>
              1Y
            </button>
          </div>
      </div>
    </div>
  );
}
