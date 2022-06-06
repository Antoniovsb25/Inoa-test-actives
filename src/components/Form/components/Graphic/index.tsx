import { useState, useEffect } from "react";
import styles from "./Graphic.module.css";
import Chart from "./Chart/";
import dateDiffInDays from "../../../../helpers/dateDiffInDays";
import fullDate from "../../../../helpers/fullDate"

type GraphicProps = {
  loading: Boolean;
  actives: any;
  activeName: string;
  initialDate: string;
  finalDate: string;
};

type ChartProps = {
  labels: string[];
  datasets: [
    {
      label: string;
      data: any[];
      borderColor: string,
      backgroundColor: string
    }
  ];
};

const Graphic = ({
  loading,
  actives,
  activeName,
  initialDate,
  finalDate,
}: GraphicProps) => {
  const consultInitDate = new Date(initialDate);
  const consultFinalDate = new Date(finalDate);
  const todayDate = new Date(fullDate);
  const differenceInitialAndFinalDate = dateDiffInDays(consultInitDate, consultFinalDate);
  const diffTodayAndInitial = dateDiffInDays(consultInitDate, todayDate);
  const diffTodayAndFinal = dateDiffInDays(consultFinalDate, todayDate);

  const dateLabel = Object.keys(actives).slice(diffTodayAndFinal, diffTodayAndInitial   );
  const activeData = Object.values(actives).map(
    (element: any) => element["4. close"]
  ).slice(diffTodayAndFinal, diffTodayAndInitial);

  const [chartData, setChartData] = useState<ChartProps>();

  useEffect(() => {
    setChartData({
      labels: dateLabel,
      datasets: [
        {
          label: activeName,
          data: activeData,
          borderColor: '#9d870c',
          backgroundColor: '#9d870c'
        },
      ],
    });
  }, [actives]);

  if (differenceInitialAndFinalDate < 0) {
    return (
      <h3>Por favor, preencha uma data de início menor que a data final.</h3>
    );
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className={styles.graphicContainer}>
      {chartData && <Chart chartData={chartData} />}
    </section>
  );
};

export default Graphic;
