"use client"
import React from "react";
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

export default function LineChartMobile() {
  // X-axis labels
  const labels = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug"];

  // Data to display on the chart
  const datasetValues = [12, 45, 67, 43, 89, 34, 67, 43];

  // Define data using ChartData type for a line chart
  const data: ChartData<"line", number[], unknown> = {
    labels,
    datasets: [
      {
        label: "My First Dataset",
        data: datasetValues,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      // You can add more dataset objects here for a multi-line chart.
    ],
  };

  // Define options using ChartOptions type for a line chart
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

  return (
    <div style={{ width: "400px", margin: "10 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}
