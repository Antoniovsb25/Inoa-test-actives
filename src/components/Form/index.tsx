import { useState } from "react";
import Graphic from "./components/Graphic";
import axios from "axios";
import styles from "./Form.module.css"

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
    try {
      const { data } = await axios.post("http://localhost:4567/", { inputActive })
      getActivesContent();
    } catch (error) {
        console.log(error);
    }
  };

  const getActivesContent = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:4567/");
      setLoading(false);
      setActives(data["Time Series (Daily)"]);
    } catch (error) {
      console.log("something went wrong when fetching data", error);
      setLoading(false);
    }
  };

  const handleInput = (e: any) => {
    const newData = { ...inputActive };
    newData[e.target.id] = e.target.value;
    setInputActive(newData);
  };

  return (
    <>
      <section className={styles.formContainer}>
          <h1>consulte o preço de fechamento diário de um ou mais ativos da B3</h1>
        <form className={styles.form} onSubmit={postActivesName}>
          <label htmlFor="active">Nome do ativo: </label>
          <input
            type="text"
            id="active"
            name="active"
            value={inputActive.active}
            onChange={(e) => handleInput(e)}
          />
          <label htmlFor="initial_date">Data de início da consulta: </label>
          <input
            type="date"
            id="initial_date"
            name="initial_date"
            value={inputActive.initial_date}
            onChange={(e) => handleInput(e)}
          />
          <label htmlFor="final_date">Data de fim da consulta: </label>
          <input
            type="date"
            id="final_date"
            name="final_date"
            value={inputActive.final_date}
            onChange={(e) => handleInput(e)}
          />
          <button>POST DATA</button>
        </form>
      </section>
      <Graphic loading={loading} actives={actives} />
    </>
  );
};

export default Form;
