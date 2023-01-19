import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface users {
  name: string;
  user_total: number;
}

interface type {
  type_name: string;
  type_total: number;
}

interface status {
  status_name: string;
  status_total: number;
}

interface env {
  environment_name: string;
  environment_total: number;
}
type allType = users[] | type[] | status[] | env[];

type DashBoard1Props<T> = {
  datas: T[] | null;
  field: string;
  field2: string;
};

const DashBoard1 = <T extends users | type | status | env>({
  datas,
  field,
  field2,
}: DashBoard1Props<T>) => {
  //https://bobbyhadz.com/blog/typescript-no-index-signature-with-parameter-of-type-string
  const key1 = field as string;
  const key2 = field2 as string;
  const data = {
    labels: datas?.map((data) => data[key1 as keyof typeof data]),
    datasets: [
      {
        label: "#",
        data: datas?.map((data) => data[key2 as keyof typeof data]),
        backgroundColor: [
          "rgba(60, 53, 254, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(81, 254, 53, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(254, 172, 53, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 65, 134, 0.2)",
          "rgba(253, 65, 255, 0.2)",
          "rgba(255, 99, 65, 0.2)",
          "rgba(233, 255, 65, 0.2)",
          "rgba(39, 245, 204, 0.2)",
        ],
        borderColor: [
          "rgba(60, 53, 254, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(81, 254, 53, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(254, 172, 53, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 65, 134, 1)",
          "rgba(253, 65, 255, 1)",
          "rgba(255, 99, 65, 1)",
          "rgba(233, 255, 65, 1)",
          "rgba(39, 245, 204, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default DashBoard1;
