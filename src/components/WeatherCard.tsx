import { Weather } from '@/lib/weatherClient';

interface WeatherCardProps {
  weather: Weather;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        maxWidth: '400px',
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>{weather.city}</h2>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {weather.temperature}°C
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Humedad:</strong> {weather.humidity}%
      </div>
      <div style={{ textTransform: 'capitalize' }}>
        <strong>Estado:</strong> {weather.description}
      </div>
    </div>
  );
}

