# LaunchDarkly Integration Setup

This document explains how to set up the LaunchDarkly integration for the Fandango demo project.

## Feature Flags

### 1. Movie Image Flag
- **Key**: `movie-image-flag`
- **Type**: String
- **Purpose**: Controls the movie poster image URL
- **Default**: Uses the default movie poster URL from the API
- **Variations**: Can be configured to serve different image URLs for A/B testing

## Setup Instructions

1. Create a LaunchDarkly account if you haven't already
2. Create a new project in LaunchDarkly
3. Create the following feature flags:
   - `movie-image-flag` (String variation type)
4. Get your Client-side ID:
   - Go to Account Settings > Projects
   - Find your project and copy the Client-side ID
5. Configure the client:
   - Copy `.env.example` to `.env` in the client directory
   - Set `REACT_APP_LAUNCHDARKLY_CLIENT_ID` to your Client-side ID

## Testing the Integration

1. Start the application:
   ```bash
   cd server && python app.py
   cd client && npm start
   ```

2. The movie poster image will be controlled by the `movie-image-flag` in LaunchDarkly
3. Changes to the flag in LaunchDarkly will be reflected immediately without page refresh

## Flag Targeting

You can use the following user attributes for targeting:
- `theaterLocation`: The theater ID
- `movieType`: The type of movie (blockbuster, indie, general)
- `timeOfDay`: Time period (morning, afternoon, evening)
- `platform`: The platform (web)

## Development Notes

- The client uses the LaunchDarkly JavaScript SDK for real-time updates
- Flag changes are applied immediately without requiring a page refresh
- If LaunchDarkly is unavailable, the application falls back to default values
