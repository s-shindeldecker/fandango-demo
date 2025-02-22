import React from 'react';
import { Movie } from '../types';
import {
  MovieHeader,
  PosterContainer,
  PosterImage,
  MovieInfo,
  MovieTitle,
  MovieMeta,
  MovieDescription,
} from '../styles';

interface MovieDetailsProps {
  movie: Movie;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <MovieHeader>
      <PosterContainer>
        <PosterImage src={movie.poster} alt={movie.title} />
      </PosterContainer>
      <MovieInfo>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieMeta>
          <span>{movie.rating}</span>
          <span className="meta-separator">•</span>
          <span>{movie.runtime}</span>
          <span className="meta-separator">•</span>
          <span>Release Date: {new Date(movie.releaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </MovieMeta>
        <MovieDescription>{movie.description}</MovieDescription>
      </MovieInfo>
    </MovieHeader>
  );
};
