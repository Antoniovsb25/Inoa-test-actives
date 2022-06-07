import { useState, useEffect } from "react";
import styles from "./Graphic.module.css";
import Chart from "./Chart/";
import dateDiffInDays from "../../../../helpers/dateDiffInDays";
import fullDate from "../../../../helpers/fullDate";

type activesProps = {
    actives: {},
    final: string,
    initial: string,
    name: string
}

type GraphicProps = {
  loading: Boolean;
  actives: activesProps[];
  activeName: string;
  initialDate: string;
  finalDate: string;
};

type ChartProps = {
  labels: string[];
  datasets?: Object[];
};

const Graphic = ({
  loading,
  actives,
  activeName,
  initialDate,
  finalDate,
}: GraphicProps) => {
  const [chartData, setChartData] = useState<ChartProps>();

  const consultInitDate = new Date(initialDate);
  const consultFinalDate = new Date(finalDate);
  const todayDate = new Date(fullDate);
  const differenceInitialAndFinalDate = dateDiffInDays(
    consultInitDate,
    consultFinalDate
  );
  const diffTodayAndInitial = dateDiffInDays(consultInitDate, todayDate);
  const diffTodayAndFinal = dateDiffInDays(consultFinalDate, todayDate);

  const dateLabel = Object.keys(actives[actives.length - 1].actives).slice(
    diffTodayAndFinal,
    diffTodayAndInitial
  );

  useEffect(() => {
    setChartData({
      labels: dateLabel,
      datasets: actives.map((element: any) => {
        const randomColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
        return {
          label: element.name,
          data: Object.values(element.actives)
            .map((element: any) => element["4. close"])
            .slice(diffTodayAndFinal, diffTodayAndInitial),
          borderColor: randomColor,
          backgroundColor: randomColor,
        };
      }),
    });
  }, [actives]);

  if (differenceInitialAndFinalDate < 0) {
    return (
      <p className={styles.message}>
        Por favor, preencha uma data de início menor ou igual à data final da
        pesquisa.
      </p>
    );
  }

  return (
    <section className={styles.graphicContainer}>
      {chartData && <Chart chartData={chartData} />}
    </section>
  );
};

export default Graphic;
