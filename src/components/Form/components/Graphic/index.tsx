import styles from "./Graphic.module.css";
import dateDiffInDays from "../../../../helpers/dateDiffInDays";

type GraphicProps = {
  loading: Boolean;
  actives: Object;
  activeName: string;
  initialDate: string;
  finalDate: string;
};

const Graphic = ({
  loading,
  actives,
  activeName,
  initialDate,
  finalDate,
}: GraphicProps) => {

  const a = new Date(initialDate),
    b = new Date(finalDate)
    let difference = dateDiffInDays(a, b);
    if (difference < 0) {
        return (<h3>Por favor, preencha uma data de início menor que a data final.</h3>)
    }
  const dailyActives = Object.entries(actives);
  const arrDailyActives = Object.entries(dailyActives[0][1]);
  const filteredDailyActives = arrDailyActives.filter(
    (element: any, index: number) => index <= difference
  );

  return (
    <section className={styles.graphicContainer}>
      <ul>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          Object.keys(actives).length !== 0 &&
          filteredDailyActives.map((element: any, index: number) => (
            <li key={index}>
              {element[0]} = {element[1]["4. close"]}
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default Graphic;
