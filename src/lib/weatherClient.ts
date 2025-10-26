export interface Weather {
  temperature: number;
  humidity: number;
  description: string;
  city: string;
}

export interface WeatherError {
  message: string;
}

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Convert Kelvin to Celsius - OpenWeatherMap returns temps in Kelvin
function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}

export async function getCurrentWeather(city: string): Promise<Weather> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('Weather API key is not configured');
  }

  const url = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Ciudad no encontrada');
    }
    throw new Error('Error al obtener el clima. Intenta de nuevo.');
  }

  const data = await response.json();
  
  return {
    city: data.name,
    temperature: kelvinToCelsius(data.main.temp),
    humidity: data.main.humidity,
    description: data.weather[0].description,
  };
}

