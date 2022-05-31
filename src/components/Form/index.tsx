import { useState } from "react";
import Graphic from "./components/Graphic";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [actives, setActives] = useState({});

  const getActivesContent = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4567/");
      const data = await response.json();
      setLoading(false);
      setActives(data["Time Series (Daily)"]);
    } catch (error) {
      console.log("something went wrong when fetching data", error);
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <button type="button" onClick={getActivesContent}>
          Fetch Data
        </button>
        <Graphic loading={loading} actives={actives}/>
      </section>
    </>
  );
};

export default Form;
