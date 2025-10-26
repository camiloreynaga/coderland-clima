import { getCurrentWeather } from '@/lib/weatherClient';

// Mock fetch globally
global.fetch = jest.fn();

describe('weatherClient', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'test-key';
  });

  it('should fetch weather data successfully', async () => {
    const mockWeatherData = {
      name: 'Madrid',
      main: { temp: 288.15, humidity: 65 },
      weather: [{ description: 'cielo claro' }],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const result = await getCurrentWeather('Madrid');

    expect(result.city).toBe('Madrid');
    expect(result.temperature).toBe(15); // 288.15 - 273.15
    expect(result.humidity).toBe(65);
    expect(result.description).toBe('cielo claro');
  });

  it('should throw error when city is not found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getCurrentWeather('InvalidCity123')).rejects.toThrow(
      'Ciudad no encontrada'
    );
  });

  it('should throw error for network failures', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(getCurrentWeather('Test')).rejects.toThrow(
      'Error al obtener el clima. Intenta de nuevo.'
    );
  });

  it('should throw error when API key is missing', async () => {
    delete process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    await expect(getCurrentWeather('Madrid')).rejects.toThrow(
      'Weather API key is not configured'
    );
  });
});

