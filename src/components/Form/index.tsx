import { useState } from "react";
import Graphic from "./components/Graphic";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [actives, setActives] = useState({});
  const [inputActive, setInputActive] = useState({
    active: "",
    initial_date: "",
    final_date: "",
  });

  const postActivesName = async (e: any) => {
    e.preventDefault();
    const teste = { inputActive }
    console.log("lastState", teste)
    try {
      const response = await fetch("http://localhost:4567/", {
        method: "POST",
        body: JSON.stringify(inputActive),
        headers: { "content-type": "application/json" },
      });
      console.log("success!")
      console.log("response", response)
    } catch (error) {
      console.log("something went wrong when fetching data", error);
    }
  };

  const handleInput = (e: any) => {
    const newData = { ...inputActive };
    newData[e.target.id] = e.target.value;
    setInputActive(newData);
  };

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
        <form onSubmit={postActivesName}>
          <label htmlFor="active">Ação: </label>
          <input
            type="text"
            id="active"
            name="active"
            value={inputActive.active}
            onChange={(e) => handleInput(e)}
          />
          <label htmlFor="initial_date">Data Inicial: </label>
          <input
            type="date"
            id="initial_date"
            name="initial_date"
            value={inputActive.initial_date}
            onChange={(e) => handleInput(e)}
          />
          <label htmlFor="final_date">Data Final: </label>
          <input
            type="date"
            id="final_date"
            name="final_date"
            value={inputActive.final_date}
            onChange={(e) => handleInput(e)}
          />
          <button>POST DATA</button>
        </form>
        <button type="button" onClick={getActivesContent}>
          Fetch Data
        </button>
        <Graphic loading={loading} actives={actives} />
      </section>
    </>
  );
};

export default Form;
