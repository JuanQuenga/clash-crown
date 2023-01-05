import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import PageSection from "../../common/PageSection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// const gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
// gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
// gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");

export const data = {
  labels,
  datasets: [
    {
      label: "Trophies",
      data: labels.map(() => randomNumber()),
      borderColor: "#d171d4",
      // backgroundColor: function (context: any) {
      //   const chart = context.chart;
      //   const { ctx, chartArea } = chart;

      //   if (!chartArea) {
      //     // This case happens on initial chart load
      //     return;
      //   }
      //   return getGradient(ctx, chartArea);
      // },
      backgroundColor: "rgba(209, 113, 212, 0.1)",
      tension: 0.3,
      fill: "start",
    },
  ],
};

const AreaChartComponent = () => {
  return (
    <PageSection title="Progression">
      <Line options={options} data={data} />
    </PageSection>
  );
};

function randomNumber(min = 100, max = 500) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getGradient(ctx: any, chartArea: any) {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0, "transparent");
  gradient.addColorStop(1, "#d171d4");

  return gradient;
}

export default AreaChartComponent;
