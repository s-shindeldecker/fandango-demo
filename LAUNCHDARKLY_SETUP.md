# LaunchDarkly Setup Guide

This guide provides detailed instructions for setting up LaunchDarkly feature flags for the Fandango showtime sort experiment.

## Initial Setup

1. **Create LaunchDarkly Account**
   - Sign up at [LaunchDarkly](https://launchdarkly.com)
   - Create a new project for the demo
   - Get your SDK keys from your account settings

2. **Environment Variables**
   - Copy `.env.example` to `.env` in the server directory
   - Add your LaunchDarkly SDK key:
     ```
     LAUNCHDARKLY_SDK_KEY=your-sdk-key-here
     ```

## Feature Flag Configuration

1. **Create the Feature Flag**
   - Name: "Showtime Sort Experiment"
   - Key: `showtime-sort-experiment`
   - Flag Variations:
     ```json
     [
       {
         "value": "variation_1",
         "name": "Standard First",
         "description": "Shows standard format showtimes first"
       },
       {
         "value": "variation_2",
         "name": "IMAX 3D First",
         "description": "Prioritizes IMAX 3D showtimes"
       },
       {
         "value": "variation_3",
         "name": "IMAX First",
         "description": "Leads with IMAX format"
       },
       {
         "value": "variation_4",
         "name": "Digital 3D First",
         "description": "Emphasizes Digital 3D showings"
       }
     ]
     ```

2. **Initial Distribution**
   - For initial testing, set an even distribution:
     - 25% of users see each variation
     - This can be adjusted in the LaunchDarkly dashboard as needed
     - Additional targeting rules can be added later based on experiment results

## Experimentation Setup

1. **Metrics Configuration**
   - Create two metrics:
     1. Page View Metric
        - Name: "Showtime Page Views"
        - Key: `page_view`
        - Type: Custom
        - Event: `page_view`
     
     2. Click-through Metric
        - Name: "Showtime Click-through Rate"
        - Key: `showtime-click`
        - Type: Conversion
        - Event: `showtime-click`

2. **Experiment Settings**
   - Hypothesis: "Showing premium formats first will increase click-through rates"
   - Primary Metric: `showtime-click`
   - Secondary Metrics:
     - Page views (`page_view`)
     - Booking completion rate
     - Average ticket price
   - Minimum Sample Size: 1000 users per variation
   - Duration: 2 weeks

## Code Integration

### 1. Server-Side Integration

```python
# server/app.py

from ldclient import LDClient, Config

class LaunchDarklyManager:
    def __init__(self, sdk_key):
        config = Config(sdk_key)
        self.client = LDClient(config=config)

    def get_sort_variation(self, user_context):
        return self.client.variation(
            "showtime-sort-experiment",
            user_context,
            "variation_1"  # default variation
        )

    def track_page_view(self, user_context, page_data):
        self.client.track(
            "page_view",
            user_context,
            metric_value=1,
            data=page_data
        )

    def track_showtime_click(self, user_context, showtime_data):
        self.client.track(
            "showtime-click",
            user_context,
            metric_value=1,
            data=showtime_data
        )

    def close(self):
        self.client.close()
```

### 2. Context Creation

```python
def create_user_context(user_id, theater_id, movie_data):
    return {
        "kind": "user",
        "key": user_id,
        "custom": {
            "theaterLocation": theater_id,
            "movieType": determine_movie_type(movie_data),
            "timeOfDay": get_current_time_period(),
            "platform": "web"
        }
    }

def determine_movie_type(movie_data):
    # Simple logic to categorize movie based on description
    description = movie_data.get('description', '').lower()
    if 'action' in description or 'adventure' in description:
        return 'blockbuster'
    elif 'drama' in description or 'indie' in description:
        return 'indie'
    return 'general'

def get_current_time_period():
    hour = datetime.now().hour
    if 0 <= hour < 12:
        return 'morning'
    elif 12 <= hour < 17:
        return 'afternoon'
    else:
        return 'evening'
```

### 3. API Endpoints

```python
@app.route('/api/showtimes/<theater_id>/<movie_id>', methods=['GET'])
def get_showtimes(theater_id, movie_id):
    # Get user context from query params
    user_id = request.args.get('userId', 'default-user')
    
    # Create user context for LaunchDarkly
    user_context = create_user_context(user_id, theater_id, MOCK_MOVIE)
    
    # Get variation from LaunchDarkly
    variation = ld_manager.get_sort_variation(user_context)
    
    # Sort showtimes according to the variation
    sorted_showtimes = []
    for format_key in sort_order:
        showtimes = MOCK_SHOWTIMES.get(format_key, [])
        sorted_showtimes.extend(showtimes)
    
    response = {
        "showtimes": sorted_showtimes,
        "variation": variation
    }
    
    # Track the page view event
    ld_manager.track_page_view(
        user_context,
        {
            "variation": variation,
            "movieId": movie_id,
            "theaterId": theater_id,
            "event": "showtimes_page_view"
        }
    )
    
    return jsonify(response)

@app.route('/api/showtimes/select', methods=['POST'])
def select_showtime():
    data = request.json
    user_id = data.get('userId', 'default-user')
    theater_id = data.get('theaterId')
    movie_id = data.get('movieId')
    showtime = data.get('showtime')
    
    # Create user context for LaunchDarkly
    user_context = create_user_context(user_id, theater_id, MOCK_MOVIE)
    
    # Track the showtime click event
    ld_manager.track_showtime_click(
        user_context,
        {
            "movieId": movie_id,
            "theaterId": theater_id,
            "showtime": showtime,
            "event": "showtime_selected"
        }
    )
    
    return jsonify({"status": "success"})
```

### 4. Frontend Integration

```typescript
// client/src/services/api.ts

export const api = {
  // ... other methods ...

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

// client/src/App.tsx

const handleShowtimeClick = async (showtime: Showtime) => {
  try {
    await api.selectShowtime(DEMO_THEATER_ID, DEMO_MOVIE_ID, showtime);
    // In a real app, this would navigate to the booking flow
    alert(`Selected showtime: ${showtime.time} (${showtime.format})`);
  } catch (err) {
    console.error('Error selecting showtime:', err);
  }
};
```

## Testing and Validation

1. **Local Testing**
   ```bash
   # Set environment variables
   export LAUNCHDARKLY_SDK_KEY=your-sdk-key
   
   # Run the demo
   ./start_demo.sh
   
   # Test page view
   curl "http://localhost:5003/api/showtimes/amc-15/237015?userId=test-user-1"
   
   # Test showtime selection
   curl -X POST -H "Content-Type: application/json" \
     -d '{"userId":"test-user-1","theaterId":"amc-15","movieId":"237015","showtime":{"time":"7:00 PM","format":"IMAX"}}' \
     http://localhost:5003/api/showtimes/select
   ```

2. **Debug Mode**
   ```python
   # Enable LaunchDarkly debug mode in Config
   config = Config(sdk_key, debug=True)
   ```

## Monitoring and Analytics

1. **LaunchDarkly Dashboard**
   - Monitor flag evaluation counts
   - Track variation distribution
   - View experimentation results
   - Monitor both page views and click events

2. **Metrics to Monitor**
   - Page view counts per variation
   - Click-through rates per variation
   - User engagement patterns
   - Performance metrics

## Best Practices

1. **User Context**
   - Include all relevant attributes (theater, movie type, time)
   - Use consistent user IDs
   - Include platform information

2. **Event Tracking**
   - Track both page views and interactions
   - Include relevant metadata with events
   - Ensure proper event naming conventions

3. **Error Handling**
   - Handle LaunchDarkly service failures gracefully
   - Provide fallback variations
   - Log and monitor errors

## Additional Resources

- [LaunchDarkly Documentation](https://docs.launchdarkly.com)
- [Python SDK Reference](https://docs.launchdarkly.com/sdk/server-side/python)
- [Experimentation Guide](https://docs.launchdarkly.com/home/experimentation)
