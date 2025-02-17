import { useState, useEffect } from "react";
import ShowData from "./component/Showdata";
import Loading from "./component/Loading";

function App() {
  let [apidata, setdata] = useState();
  let [isloading, setloading] = useState(false)

  let [search, setsearch] = useState("New York");
  let Api_key = "8cc18a4d5f841cdad6b7744b3aff9b44";
 // let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${Api_key}&units=metric`;
  let fetchdata = async () => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${Api_key}&units=metric`
      );
      const result = await response.json();
      console.log(result);
      if (response.status === 200) {
        setdata(result);
      } else if (response.status === 400) {
        alert("Enter city name");
      } else if (response.status === 404) {
        alert("data not found");
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setloading(false)
    }
  };

  function hand(s) {

    setsearch(s);
    setloading(true)
  }


  useEffect(() => {
    fetchdata();
  }, [search]);


  return (
    <>

     

      {!apidata ? (
        <Loading data="Loading Data...."></Loading>
      ) : (
        <ShowData show={apidata} handler={hand} ShowData={isloading} ></ShowData>
      )}
    </>
  );
}

export default App;
