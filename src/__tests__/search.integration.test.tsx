import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages/index';
import { getCurrentWeather } from '@/lib/weatherClient';

jest.mock('@/lib/weatherClient');
const mockGetCurrentWeather = getCurrentWeather as jest.MockedFunction<
  typeof getCurrentWeather
>;

describe('Weather Search Integration', () => {
  beforeEach(() => {
    mockGetCurrentWeather.mockClear();
  });

  it('should display weather data after successful search', async () => {
    mockGetCurrentWeather.mockResolvedValueOnce({
      city: 'Barcelona',
      temperature: 22,
      humidity: 70,
      description: 'soleado',
    });

    render(<Home />);

    const input = screen.getByPlaceholderText('Nombre de la ciudad');
    const button = screen.getByText('Buscar');

    await userEvent.type(input, 'Barcelona');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Barcelona')).toBeInTheDocument();
      expect(screen.getByText('22°C')).toBeInTheDocument();
      expect(screen.getByText(/70%/)).toBeInTheDocument();
      expect(screen.getByText(/soleado/i)).toBeInTheDocument();
    });

    expect(mockGetCurrentWeather).toHaveBeenCalledWith('Barcelona');
  });

  it('should display error message when city is not found', async () => {
    mockGetCurrentWeather.mockRejectedValueOnce(new Error('Ciudad no encontrada'));

    render(<Home />);

    const input = screen.getByPlaceholderText('Nombre de la ciudad');
    await userEvent.type(input, 'InvalidCity');
    await userEvent.click(screen.getByText('Buscar'));

    await waitFor(() => {
      expect(screen.getByText('Ciudad no encontrada')).toBeInTheDocument();
    });
  });

  it('should disable button while loading', async () => {
    mockGetCurrentWeather.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<Home />);

    const input = screen.getByPlaceholderText('Nombre de la ciudad');
    const button = screen.getByText('Buscar');

    await userEvent.type(input, 'Madrid');
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Buscando...');
  });

  it('should not submit empty search', async () => {
    render(<Home />);

    const button = screen.getByText('Buscar');
    expect(button).toBeDisabled();
    
    await userEvent.click(button);
    expect(mockGetCurrentWeather).not.toHaveBeenCalled();
  });
});

