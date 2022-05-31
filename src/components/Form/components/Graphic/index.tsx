
type GraphicProps = {
  loading: Boolean;
  actives: Object;
};

const Graphic = ({ loading, actives }: GraphicProps) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }
  
  const dailyActive = Object.values(actives)[0];
  return (
    <section>
      {Object.keys(actives).length !== 0 && <h2>{dailyActive["4. close"]}</h2>}
    </section>
  );
};

export default Graphic;
