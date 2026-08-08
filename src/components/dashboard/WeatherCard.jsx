import "./WeatherCard.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function WeatherCard() {

    const {

        weather

    } = useDashboard();

    if (!weather) {

        return (

            <section className="weather-card">

                <h3>

                    Weather

                </h3>

                <p>

                    Weather unavailable

                </p>

            </section>

        );

    }

    return (

        <section className="weather-card">

            <div className="weather-header">

                <h3>

                    Weather

                </h3>

                <span>

                    {weather.location}

                </span>

            </div>

            <div className="weather-main">

                <img

                    src={weather.icon}

                    alt={weather.description}

                />

                <div>

                    <h2>

                        {weather.temperature}°C

                    </h2>

                    <p>

                        {weather.description}

                    </p>

                </div>

            </div>

            <div className="weather-grid">

                <WeatherItem

                    label="Humidity"

                    value={`${weather.humidity}%`}

                />

                <WeatherItem

                    label="Wind"

                    value={`${weather.windSpeed} km/h`}

                />

                <WeatherItem

                    label="Cloud"

                    value={`${weather.cloudCover}%`}

                />

                <WeatherItem

                    label="Pressure"

                    value={`${weather.pressure} hPa`}

                />

            </div>

        </section>

    );

}

function WeatherItem({

    label,

    value

}) {

    return (

        <div className="weather-item">

            <span>

                {label}

            </span>

            <strong>

                {value}

            </strong>

        </div>

    );

}