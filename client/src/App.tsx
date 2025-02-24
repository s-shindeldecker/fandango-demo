import React, { useEffect, useState, useRef } from 'react';
import { MovieDetails } from './components/MovieDetails';
import { Showtimes } from './components/Showtimes';
import { api, getUserId } from './services/api';
import { Movie, Theater, Showtime } from './types';
import {
  Header,
  HeaderContent,
  Logo,
  Container,
  MainContent,
  Sidebar,
  AdPlaceholder,
  Footer,
  FooterContent
} from './styles';

// Constants for demo
const DEMO_MOVIE_ID = '237015';
const DEMO_THEATER_ID = 'amc-15';

function App() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [theater, setTheater] = useState<Theater | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [variation, setVariation] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataOnce = useRef(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      // Prevent duplicate fetches in Strict Mode
      if (fetchDataOnce.current) return;
      fetchDataOnce.current = true;

      try {
        setLoading(true);
        setError(null);
        
        // Fetch movie and theater data with abort signal
        const movieData = await api.getMovie(DEMO_MOVIE_ID);
        const theaterData = await api.getTheater(DEMO_THEATER_ID);
        const showtimesData = await api.getShowtimes(DEMO_THEATER_ID, DEMO_MOVIE_ID);

        setMovie(movieData);
        setTheater(theaterData);
        setShowtimes(showtimesData.showtimes);
        setVariation(showtimesData.variation);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setError('Failed to load movie data. Please try again later.');
          console.error('Error fetching data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleShowtimeClick = async (showtime: Showtime) => {
    try {
      await api.selectShowtime(DEMO_THEATER_ID, DEMO_MOVIE_ID, showtime);
      // In a real app, this would navigate to the booking flow
      alert(`Selected showtime: ${showtime.time} (${showtime.format})`);
    } catch (err) {
      console.error('Error selecting showtime:', err);
    }
  };

  if (loading) {
    return (
      <div>
        <Header>
          <HeaderContent>
            <Logo>FANDANGO</Logo>
          </HeaderContent>
        </Header>
        <Container>
          <MainContent>Loading...</MainContent>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header>
          <HeaderContent>
            <Logo>FANDANGO</Logo>
          </HeaderContent>
        </Header>
        <Container>
          <MainContent>{error}</MainContent>
        </Container>
      </div>
    );
  }

  if (!movie || !theater) {
    return (
      <div>
        <Header>
          <HeaderContent>
            <Logo>FANDANGO</Logo>
          </HeaderContent>
        </Header>
        <Container>
          <MainContent>No data available</MainContent>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Header>
        <HeaderContent>
          <Logo>FANDANGO</Logo>
          <nav>
            <a href="#movies">MOVIES</a>
          </nav>
        </HeaderContent>
      </Header>

      <Container>
        <MainContent>
          <MovieDetails movie={movie} />
          <Showtimes
            theater={theater}
            showtimes={showtimes}
            variation={variation}
            onShowtimeClick={handleShowtimeClick}
          />
        </MainContent>

        <Sidebar>
          <AdPlaceholder>Advertisement</AdPlaceholder>
          <AdPlaceholder>Advertisement</AdPlaceholder>
          <AdPlaceholder>Advertisement</AdPlaceholder>
        </Sidebar>
      </Container>

      <Footer>
        <FooterContent>
          <p>© 2025 Demo Project - Not affiliated with Fandango</p>
          <p>This is a demo project for testing showtime sorting variations</p>
        </FooterContent>
      </Footer>
    </div>
  );
}

export default App;
