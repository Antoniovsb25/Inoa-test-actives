import React, { useState } from "react";
import Graphic from "./components/Graphic";
import axios from "axios";
import styles from "./Form.module.css";
import fullDate from "../../helpers/fullDate.js";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [actives, setActives] = useState([]);
  const [activeName, setActiveName] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState(fullDate);

  const postActivesName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:4567/?activeName=${activeName}&initialDate=${initialDate}&finalDate=${finalDate}`
      );
      setLoading(false);
      if (data["Time Series (Daily)"]) {
        setActives(data["Time Series (Daily)"]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.formContainer}>
        <h1>
          consulte o preço de fechamento diário de um ou mais ativos da B3
        </h1>
        <form className={styles.form} onSubmit={postActivesName}>
          <label htmlFor="active">Nome do ativo: </label>
          <input
            type="text"
            id="active"
            name="active"
            value={activeName}
            required
            onChange={(e) => setActiveName(e.currentTarget.value)}
          />
          <label htmlFor="initial_date">Data de início da consulta: </label>
          <input
            type="date"
            id="initial_date"
            name="initial_date"
            value={initialDate}
            required
            max={fullDate}
            onChange={(e) => setInitialDate(e.currentTarget.value)}
          />
          <label htmlFor="final_date">Data de fim da consulta: </label>
          <input
            type="date"
            id="final_date"
            name="final_date"
            value={finalDate}
            required
            max={fullDate}
            onChange={(e) => setFinalDate(e.currentTarget.value)}
          />
          <button>Pesquisar Ativo</button>
        </form>
        <button className={styles.deleteButton} onClick={() => setActives([])}>Deletar dados</button>
      </section>
      {actives.length !== 0 && (
        <Graphic
          loading={loading}
          actives={actives}
          activeName={activeName}
          initialDate={initialDate}
          finalDate={finalDate}
        />
      )}
    </>
  );
};

export default Form;
