import { useState } from 'react';
import Head from 'next/head';
import SearchForm from '@/components/SearchForm';
import WeatherCard from '@/components/WeatherCard';
import ErrorBanner from '@/components/ErrorBanner';
import { getCurrentWeather, Weather } from '@/lib/weatherClient';

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCurrentWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <Head>
        <title>Aplicación de Clima</title>
        <meta name="description" content="Busca el clima de cualquier ciudad" />
      </Head>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Aplicación de Clima
      </h1>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {error && <ErrorBanner message={error} />}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

