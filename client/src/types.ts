export interface Movie {
  id: string;
  title: string;
  releaseDate: string;
  rating: string;
  runtime: string;
  description: string;
  poster: string;
}

export interface Theater {
  id: string;
  name: string;
  address: string;
}

export interface Showtime {
  time: string;
  format: string;
  price: string;
}

export interface ShowtimesResponse {
  showtimes: Showtime[];
  variation: string;
}
