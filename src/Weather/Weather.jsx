import React, { useEffect, useState } from 'react';
import "./Weather.css";
import WbSunnyIcon from '@mui/icons-material/WbSunny';


function Weather() {
    const VITE_APP_ID = "9b124c82b4b9a0e9b102f1c0d533e553";
    const [time, setTime] = useState(new Date());
    const [data, setData] = useState(null);
    const [city, setCity] = useState('');
    const [inputCity, setInputCity] = useState('');


    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const tim = time.toLocaleTimeString();
    const date = time.toLocaleDateString();

    const GETAPI = async (city) => {
        if (!city) return

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${VITE_APP_ID}&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }

            const result = await response.json();
            setData({
                humidity: result.main.humidity,
                pressure: result.main.pressure,
                temp: result.main.temp,
                wind: result.wind.speed,
                visibility: result.visibility,
            });


        } catch (error) {
            console.error("Error fetching the weather data:", error);
        }
    };

    const handleCity = () => {
        if (inputCity) {
            const cityCapitilize = inputCity.charAt(0).toUpperCase() + inputCity.slice(1).toLowerCase();
            setCity(cityCapitilize);
        }
    };

    useEffect(() => {
        GETAPI(city);
    }, [city]);

    return (
        <>
            <div className='overlay'>
                <div className='main'>
                    <div className='title'>
                        <h4 style={{ color: '#fff' }}>Weather UI/UX</h4>
                    </div>

                    <div className='content'>
                        <div style={{ display: 'flex' ,alignItems:'end'}}>
                            <h1 style={{ textAlign: 'center', color: 'white' }}>{data.temp.toFixed(0)}°C</h1>
                            <h2 style={{  color: 'white',marginLeft:20,fontSize:35 }}>{city}</h2>
                        </div>
                        <div style={{ display: 'flex', marginTop:20 }}>
                            <p style={{ textAlign: 'start', color: 'white' }}>{tim}</p>
                            <p style={{ textAlign: 'end', color: 'white', marginLeft: 20 }}>{date}</p>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='search-bar'>
                        <input
                            type='text'
                            placeholder='Search City'
                            value={inputCity}
                            onChange={(e) => setInputCity(e.target.value)}
                        />
                        <img
                            alt='Icon'
                            src={require('../Assets/8666693_search_icon.png')}
                            onClick={handleCity}
                        />
                    </div>

                    <div style={{ paddingLeft: '20%', paddingRight: '20%' }}>
                        <div style={{ marginBlock: 20, textAlign: 'center' }}>
                            <WbSunnyIcon className='icon' sx={{ fontSize: 80 }}
                            />
                        </div>
                        <hr />
                    </div>

                    <div className='cities-name'>
                        <h3 style={{
                            color: '#fff',
                            textAlign: 'center',
                            paddingTop: 10
                        }}>Example Citites</h3>
                        <p onClick={() => setCity('Gujranwala')}>Gujranwala</p>
                        <p onClick={() => setCity('New York')}>New York</p>
                        <p onClick={() => setCity('London')}>London</p>
                        <p onClick={() => setCity('Karachi')}>Karachi</p>
                    </div>

                    <div className='details'>
                        {data ? (
                            <>
                                <h3 style={{
                                    color: '#fff',
                                    textAlign: 'center',
                                    paddingTop: 10
                                }}>Details</h3>
                                <div>
                                    <p>Visibility:</p>
                                    <p>{data.visibility} meters</p>
                                </div>
                                <div>
                                    <p>Humidity:</p>
                                    <p>{data.humidity}%</p>
                                </div>
                                <div>
                                    <p>Temperature:</p>
                                    <p>{data.temp.toFixed(0)}°C</p>
                                </div>
                                <div>
                                    <p>Wind:</p>
                                    <p>{data.wind} m/s</p>
                                </div>
                                <div>
                                    <p>Pressure:</p>
                                    <p>{data.pressure} hPa</p>
                                </div>
                            </>
                        ) : (
                            <p>Loading weather data...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather;
