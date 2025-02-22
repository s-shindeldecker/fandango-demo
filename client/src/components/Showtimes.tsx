import React from 'react';
import { Theater, Showtime } from '../types';
import {
  ShowtimesSection,
  TheaterInfo,
  TheaterName,
  TheaterAddress,
  ShowtimesList,
  FormatGroup,
  FormatTitle,
  ShowtimeButton,
  PriceTag,
} from '../styles';

interface ShowtimesProps {
  theater: Theater;
  showtimes: Showtime[];
  variation: string;
  onShowtimeClick: (showtime: Showtime) => void;
}

export const Showtimes: React.FC<ShowtimesProps> = ({
  theater,
  showtimes,
  variation,
  onShowtimeClick,
}) => {
  // Group showtimes by format
  const showtimesByFormat = showtimes.reduce((acc, showtime) => {
    const format = showtime.format;
    if (!acc[format]) {
      acc[format] = [];
    }
    acc[format].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  const getFormatBadgeClass = (format: string): string => {
    const formatLower = format.toLowerCase().replace(' ', '-');
    switch (formatLower) {
      case 'imax-3d':
        return 'format-badge imax-3d';
      case 'imax':
        return 'format-badge imax';
      case 'digital-3d':
        return 'format-badge digital-3d';
      default:
        return 'format-badge';
    }
  };

  const getFormatIcon = (format: string): string => {
    switch (format) {
      case 'IMAX 3D':
        return '🎬 IMAX 3D';
      case 'IMAX':
        return '🎥 IMAX';
      case 'Digital 3D':
        return '3D Digital';
      default:
        return 'Standard';
    }
  };

  const getFormatDescription = (format: string): string => {
    switch (format) {
      case 'IMAX 3D':
        return 'Premium large-format 3D experience';
      case 'IMAX':
        return 'Premium large-format experience';
      case 'Digital 3D':
        return 'Digital 3D presentation';
      default:
        return 'Standard digital presentation';
    }
  };

  return (
    <ShowtimesSection>
      <TheaterInfo>
        <TheaterName>{theater.name}</TheaterName>
        <TheaterAddress>{theater.address}</TheaterAddress>
      </TheaterInfo>

      {Object.entries(showtimesByFormat).map(([format, times]) => (
        <FormatGroup key={format}>
          <FormatTitle>
            {format}
            <span className={getFormatBadgeClass(format)}>
              {getFormatIcon(format)}
            </span>
          </FormatTitle>
          <div style={{ 
            fontSize: '14px', 
            color: 'var(--text-gray)', 
            marginBottom: '16px',
            marginTop: '-12px' 
          }}>
            {getFormatDescription(format)}
          </div>
          <ShowtimesList>
            {times.map((showtime, index) => (
              <div key={`${format}-${index}`}>
                <ShowtimeButton
                  onClick={() => onShowtimeClick(showtime)}
                  data-testid={`showtime-button-${format}-${index}`}
                >
                  {showtime.time}
                  <PriceTag>{showtime.price}</PriceTag>
                </ShowtimeButton>
              </div>
            ))}
          </ShowtimesList>
        </FormatGroup>
      ))}

      <div className="showtime-info">
        <p>
          <strong>Showtimes and Tickets</strong>
        </p>
        <p>
          * All showtimes are in local time. Pricing varies by location and format.
        </p>
        <p>
          🎬 Premium format experiences available with enhanced picture and sound quality.
        </p>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>
          Select a showtime to proceed to seat selection and checkout.
        </p>
      </div>
    </ShowtimesSection>
  );
};
