import styles from "./Graphic.module.css"

type GraphicProps = {
  loading: Boolean;
  actives: Object;
};

const Graphic = ({ loading, actives }: GraphicProps) => {
  
  const dailyActive = Object.values(actives)[0];
  
  return (
    <section className={styles.graphicContainer}>
      {loading ? (<h2>Loading...</h2>) : (Object.keys(actives).length !== 0 && <h2>{dailyActive["4. close"]}</h2>)}
    </section>
  );
};

export default Graphic;
