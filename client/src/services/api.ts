import axios from 'axios';
import { Movie, Theater, ShowtimesResponse, Showtime } from '../types';

const API_BASE_URL = 'http://localhost:5003/api';

// Get or create a stable user ID from localStorage
const getStableUserId = () => {
  let userId = localStorage.getItem('fandango_demo_user_id');
  if (!userId) {
    userId = Math.random().toString(36).substring(7);
    localStorage.setItem('fandango_demo_user_id', userId);
  }
  return userId;
};

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
        params: { userId: getStableUserId() }
      }
    );
    return response.data;
  },

  async selectShowtime(theaterId: string, movieId: string, showtime: Showtime): Promise<void> {
    await axios.post(`${API_BASE_URL}/showtimes/select`, {
      userId: getStableUserId(),
      theaterId,
      movieId,
      showtime
    });
  }
};

export const getUserId = () => getStableUserId();
