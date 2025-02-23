import axios from 'axios';
import { Movie, Theater, ShowtimesResponse, Showtime } from '../types';

const API_BASE_URL = 'http://localhost:5003/api';

// Generate a random user ID for demo purposes
const USER_ID = Math.random().toString(36).substring(7);

export const api = {
  async getMovie(movieId: string): Promise<Movie> {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`);
    return response.data;
  },

  async getTheater(theaterId: string): Promise<Theater> {
    const response = await axios.get(`${API_BASE_URL}/theater/${theaterId}`);
    return response.data;
  },

  async getShowtimes(theaterId: string, movieId: string): Promise<ShowtimesResponse> {
    const response = await axios.get(
      `${API_BASE_URL}/showtimes/${theaterId}/${movieId}`,
      {
        params: { userId: USER_ID }
      }
    );
    return response.data;
  },

  async selectShowtime(theaterId: string, movieId: string, showtime: Showtime): Promise<void> {
    await axios.post(`${API_BASE_URL}/showtimes/select`, {
      userId: USER_ID,
      theaterId,
      movieId,
      showtime
    });
  }
};

export const getUserId = () => USER_ID;
