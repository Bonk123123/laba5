import React from 'react';
import axios from "axios"
import logo from './logo.svg';
import './App.css';

interface value {
  CharCode: String,
  ID: String,
  Name: String,
  Nominal: Number,
  NumCode: String,
  Previous: Number,
  Value: Number,
}


function App() {
  const [data, setData] = React.useState<value[]>([])
  const [display, setDisplay] = React.useState<any>()
  const [currentValue, setCurrentValue] = React.useState<String>()
  

  React.useEffect(() => {
    axios("http://dev.otcreporting.ru/sandbox/").then(response => console.log(response.data))
    axios('https://www.cbr-xml-daily.ru/daily_json.js') 
    .then(response => {
      setData(Object.values(response.data.Valute))
      setDisplay({
        CharCode: "USD",
        ID: "R01235",
        Name: "Доллар США",
        Nominal: 1,
        NumCode: "840",
        Previous: 75.4729,
        Value: 75.4592,
      })
    }) 
  }, [])


  const handle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentValue(e.target.value)
  }

  React.useEffect(() => {
    let value = data.find((elem, i, data) => elem.CharCode === currentValue)
    setDisplay(value)
    
  }, [currentValue])

  return (
    <div className="App">
      <select onChange={handle}>
        {data.map((item) => {
          return (
            <option>{item.CharCode}</option>
          )
        })}
      </select>
      <div>
        <p>Имя: {display?.Name}</p>
        <p>Номинал: {display?.Nominal}</p>
        <p>текущий курс: {display?.Value} ₽</p>
        <p>предыдущий курс: {display?.Previous} ₽</p>
      </div>
    </div>
  );
}

export default App;
