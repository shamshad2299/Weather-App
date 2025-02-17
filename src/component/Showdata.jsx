import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ErrorM from "./Loading";
function ShowData({ show, handler, ShowData }) {
  let [changevalue, setvalue] = useState("");

  function change(e) {
    setvalue(e.target.value);
  }
  // funcion for finding wind direction

  function getWindDirection(degrees) {
    const directions = [
      "North",
      "North-East",
      "East",
      "South-East",
      "South",
      "South-West",
      "West",
      "North-West",
      "North",
    ];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  //function for finding sunrise and sunset
  function convertUnixTimestamp(timestamp) {
    let date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert to 12-hour format
    minutes = minutes.toString().padStart(2, "0"); // Ensure two-digit minutes

    return `${hours}:${minutes} ${ampm}`;
  }

  // Example usage (Replace with API response)
  let sunrise = show.sys.sunrise; // Example Unix timestamp
  let sunset = show.sys.sunset; // Example Unix timestamp

  // Example usage
  let windDeg = show.wind.deg; // Replace with your API wind direction

  //function for converting <span>wind speed</span>
  function convertWindSpeed(speed, unit = "kmh") {
    if (unit === "kmh") {
      return (speed * 3.6).toFixed(2) + " km/h"; // Convert m/s to km/h
    } else if (unit === "mph") {
      return (speed * 2.237).toFixed(2) + " mph"; // Convert m/s to mph
    } else {
      return speed.toFixed(2) + " m/s"; // Default is m/s
    }
  }

  // Example usage (Replace with API response)
  let windSpeed = show.wind.speed; // Example <span>wind speed</span> in m/s

  console.log("<span>Wind Speed</span>:", convertWindSpeed(windSpeed, "kmh")); // Output: "19.80 km/h"
  console.log("<span>Wind Speed</span>:", convertWindSpeed(windSpeed, "mph")); // Output: "12.30 mph"
  console.log("<span>Wind Speed</span>:", convertWindSpeed(windSpeed, "m/s")); // Output: "5.50 m/s"

  function formatVisibility(visibility) {
    return (visibility / 1000).toFixed(2) + " km";
  }

  function getdata(e) {
    e.preventDefault();
    handler(changevalue);
    setvalue("");
  }

  return (
    <>
      <div className=" card1">
        <div className="search">
          <input
            onChange={change}
            type="text"
            name="name"
            value={changevalue}
            className="search-bar"
            placeholder="search city"
            id=""
          />
          <button onClick={getdata} style={{ borderRadius: "50%" }}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
                clip-rule="evenodd"
              ></path>
              <path
                fill-rule="evenodd"
                d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="container">
        <div className="card card1">
          <div className=" loading mt-4">
            {ShowData ? (
              <div
                class="spinner-border text-dark"
                role="status"
                style={{ width: "50px", height: "50px" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : null}
            <h1 className="city">
              <strong> 🌍Location</strong> : <span>{show.name}</span>
            </h1>
            <div className="tempreture">
              <p>
                🌡 Current Tempreture : <span>{show.main.temp}°c</span>
              </p>
              <p>
                🤒 Feels Like : <span>{show.main.feels_like}°c</span>
              </p>
              <p>
                {" "}
                🌫 min temp : <span>{show.main.temp_min - 2.0}°c</span>
              </p>
              <p>
                {" "}
                🌡 max temp :
                <span>{(show.main.temp_max + 1.03).toFixed(2)}°c </span>
              </p>
            </div>
          </div>
        </div>
        <div className="card cards">
          <h5> Weather Condition</h5>
          <div className="flex">
            <div className="weathers">
              <div className="weather">
                {" "}
                <p> ☁️ Weather condition : </p>{" "}
                <span>{show.weather[0].main}</span>
              </div>

              <div className="weather">
                <p> 🌫 Description : </p>
                <span> {show.weather[0].description} </span>
              </div>

              <div className="weather">
                {" "}
                <p>💧 Humidity : </p> <span>{show.main.humidity}%</span>
              </div>
              <div className="weather">
                <p> 👀 Visibility : </p>{" "}
                <span>{formatVisibility(show.visibility)}</span>
              </div>
            </div>
            <img
              style={{
                backgroundColor: "red",
                marginLeft: "10px",
                borderRadius: "50%",
              }}
              src={`https://openweathermap.org/img/wn/${show.weather[0].icon}@2x.png`}
              alt=""
              className="icon"
            />
          </div>
        </div>
        <div className="card card2">
          <div className="windSpeed">
            <img
              height={100}
              src="https://www.semitec-global.com/uploads/Column02.webp"
              alt="wind-Speed image"
            />
          </div>
          <div className="wind ">
            <span>Wind Speed</span>:<p>{convertWindSpeed(windSpeed, "kmh")} </p>
          </div>
          <div className="wind ">
            <span>Wind Speed</span>:<p>{convertWindSpeed(windSpeed, "mph")} </p>
          </div>
          <div className="wind">
            <span>Wind Speed</span>:<p>{convertWindSpeed(windSpeed, "m/s")} </p>
          </div>

          <div className=" windDirection">
            {" "}
            <span> 🌬 Wind direction</span>: <p>{getWindDirection(windDeg)}</p>
          </div>
        </div>
        <div className="card card3">
          <p className="card3-p">
            Here the Information of Sunrise and sunset :{" "}
          </p>
          <div className="contain">
            <div className="sunrise-sunset">
              <div className="country ">
                {" "}
                <p>Country name : </p>
                <span>{show.sys.country}</span>
              </div>
              <div className="sunrise">
                {" "}
                🌅 Sunrise : <span>{convertUnixTimestamp(sunrise)}</span>
              </div>
              <div className="sunrise">
                {" "}
                🌇 Sunset : <span>{convertUnixTimestamp(sunset)}</span>
              </div>
            </div>
           <div className="sun-img">
           <img
              width={100}
              height={100}
              src="https://t4.ftcdn.net/jpg/05/83/87/67/360_F_583876738_eC5lsIKAvQ6tR2HhkXcGk3hCPL2gLPhv.jpg"
              alt="sunrise"
            />
           </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowData;
