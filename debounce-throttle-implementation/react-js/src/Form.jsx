import { useEffect, useState, useRef } from "react";
import classes from "./Form.module.css";

function Form() {
  const [countriesData, setCountriesData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const timer = useRef(null);

  const formHandler = function (e) {
    e.preventDefault();
  };

  useEffect(() => {
    if (searchQuery === "" || searchQuery.length < 2) {
      setCountriesData(null);
      return;
    }
    async function fetchData(query) {
      setIsLoading(true);
      try {
        const req = await fetch(
          `https://api.first.org/data/v1/countries?q=${query}&limit=5&pretty=true`
        );

        const res = await req.json();

        const data = res?.data;

        const countriesData = Object.entries(data);

        if (countriesData.length === 0) {
          throw new Error("no country with the search keyword found");
        }

        setCountriesData(countriesData);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (searchQuery !== "") {
      fetchData(searchQuery);
    }
  }, [searchQuery]);

  const inputHandler = function (e) {
    if (e.target.value === "") return;

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  console.log(countriesData, isLoading);

  return (
    <form onSubmit={formHandler} className={classes.form}>
      <input
        onChange={inputHandler}
        type="search"
        placeholder="Enter country name"
        list="countries"
      />

      {isLoading && <div>Loading...</div>}
      <datalist id="countries">
        {!isLoading &&
          countriesData &&
          countriesData.length > 0 &&
          countriesData.map(([code, data], i) => (
            <option key={i + code}>{data.country}</option>
          ))}
      </datalist>
    </form>
  );
}

export default Form;

