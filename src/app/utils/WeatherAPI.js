import axios from 'axios'

export async function fetchWeatherData3() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {

        axios.get(url).then((response) => {
        setData(response.data)
          // const data = await response.json();
        console.log(response.data)
        return data;
      })

      setLocation('')
    }
  }
}

export async function fetchWeatherData() {
  let location = "Moscow";
  // let location = "Volgograd";
  // let location = "Pyatigorsk";

  try {
    const getPosition = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    const position = await getPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

    const response = await fetch(
      // `/.netlify/functions/fetchWeatherData?lat=${lat}&lon=${lon}&units=metric`
    url
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return fetchDefaultWeatherData();
  }
}

export async function fetchDefaultWeatherData() {
 // let cityName = "Brisbane";
 let cityName = "Moscow";
 // let cityName = "Volgograd";

  try {
    const response = await fetch(
      `/.netlify/functions/fetchWeatherData?cityName=${cityName}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      name: "Moscow",
      main: {
        temp_max: "X",
        temp_min: "Y",
      },
      weather: [
        {
          description: "moderate rain",
          icon: "10d",
        },
      ],
    };
  }
}
