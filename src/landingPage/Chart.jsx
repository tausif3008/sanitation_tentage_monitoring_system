import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useOutlet, useOutletContext } from "react-router";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = (dict, lang) => {
  return [
    dict.lost[lang],
    dict.found[lang],
    dict.reunion[lang],
    dict.pending[lang],
  ];
};

const Chart = () => {
  const [dict, lang] = useOutletContext();
  const data = {
    labels: labels(dict, lang),
    datasets: [
      {
        label: "Sales",
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
        data: [100, 70, 65, 30],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = labels(dict, lang)[context.dataIndex] || "";
            if (label) {
              label += ": ";
            }
            label += context.raw;
            return label;
          },
        },
      },
      legend: {
        display: false, // Hide the legend
        // labels: {
        //   generateLabels: function (chart) {
        //     const dataset = chart.data.datasets[0];
        //     return dataset.backgroundColor.map((color, index) => ({
        //       text: labels[index],
        //       fillStyle: color,
        //       strokeStyle: dataset.borderColor,
        //       lineWidth: dataset.borderWidth,
        //       hidden: !chart.isDatasetVisible(0),
        //       index: index,
        //     }));
        //   },
        // },
      },
    },
  };
  return (
    <div className="mx-auto">
      <div className="relative h-full flex items-center justify-center w-60">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
