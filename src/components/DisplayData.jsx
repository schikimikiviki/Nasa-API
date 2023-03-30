import { useState, useEffect } from 'react';
import React from 'react';
import './DisplayData.css';

export default function DisplayData() {
  //console.log('Current date is', currentDate);

  const [data, setData] = useState(null);
  const [userInput, setUserInput] = useState('');

  // Um Daten aus einer externen API/Website zu fetchen, muss man
  // den Server nutzen, um die Daten zu fetchen (API -> JSON, HTML -> Text)
  // Danach braucht man nur noch useEffect, um die Daten vom Localhost zu
  // bekommen und im useState zu speichern!

  useEffect(() => {
    const getData = async () => {
      await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=ixxGiSA2WGPRCiVtNYLxnfScNPUgIWJMGAogVSy5&date=${userInput}`
      )
        .then((response) => response.json())
        .then((res) => {
          setData(res);
        });
    };

    getData();
  }, [userInput]);

  const handleInput = (e) => {
    setUserInput(e.target.value);
    console.log('This is the user input', userInput); //2023-03-28
    console.log('This is the API Data', data);
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = `${yyyy}-${mm}-${dd}`;

  return (
    <div>
      <input
        type='date'
        max={formattedToday}
        value={userInput}
        onChange={handleInput}
      ></input>
      <div>
        <br />
        Result:
        <br />
        {data && (
          <div key={data.title}>
            <h1>{data.date}</h1>
            <h2>{data.title}</h2>
            <p>{data.explanation}</p>
            <div>
              {data.media_type === 'image' ? (
                <img
                  width='800px'
                  height='500px'
                  alt={data.title}
                  src={data.url}
                />
              ) : (
                <iframe
                  width='800px'
                  height='500px'
                  title={data.title}
                  src={data.url}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
