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

2. **Targeting Rules**
   ```javascript
   {
     "rules": [
       {
         "variation": 0,
         "clauses": [
           {
             "attribute": "theaterLocation",
             "op": "contains",
             "values": ["amc", "regal"]
           }
         ]
       },
       {
         "variation": 1,
         "clauses": [
           {
             "attribute": "movieType",
             "op": "equals",
             "values": ["blockbuster"]
           }
         ]
       }
     ],
     "fallthrough": {
       "rollout": {
         "variations": [
           {
             "variation": 0,
             "weight": 25
           },
           {
             "variation": 1,
             "weight": 25
           },
           {
             "variation": 2,
             "weight": 25
           },
           {
             "variation": 3,
             "weight": 25
           }
         ]
       }
     }
   }
   ```

## Experimentation Setup

1. **Metrics Configuration**
   - Create a new metric:
     - Name: "Showtime Click-through Rate"
     - Key: `showtime_ctr`
     - Type: Conversion
     - Event: `showtime_click`

2. **Experiment Settings**
   - Hypothesis: "Showing premium formats first will increase click-through rates"
   - Primary Metric: `showtime_ctr`
   - Secondary Metrics:
     - Booking completion rate
     - Average ticket price
   - Minimum Sample Size: 1000 users per variation
   - Duration: 2 weeks

## Code Integration Points

1. **Server-Side Integration**

```python
# server/app.py

from ldclient import LDClient, Config

class LaunchDarklyManager:
    def __init__(self, sdk_key):
        self.client = LDClient(sdk_key)

    def get_sort_variation(self, user_context):
        return self.client.variation(
            "showtime-sort-experiment",
            user_context,
            "variation_1"  # default variation
        )

    def track_showtime_click(self, user_context, showtime_data):
        self.client.track(
            "showtime_click",
            user_context,
            metric_value=1,
            data=showtime_data
        )

    def close(self):
        self.client.close()
```

2. **Context Creation**

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
    # Logic to categorize movie (blockbuster, indie, etc.)
    pass

def get_current_time_period():
    # Logic to determine time of day
    pass
```

## Testing and Validation

1. **Local Testing**
   ```bash
   # Set environment variables
   export LAUNCHDARKLY_SDK_KEY=your-sdk-key
   
   # Run with specific user context
   curl "http://localhost:5003/api/showtimes/amc-15/237015?userId=test-user-1&theaterType=amc"
   ```

2. **Debug Mode**
   ```python
   # Enable LaunchDarkly debug mode
   ldclient.set_config(Config(sdk_key, debug=True))
   ```

## Monitoring and Analytics

1. **LaunchDarkly Dashboard**
   - Monitor flag evaluation counts
   - Track variation distribution
   - View experimentation results

2. **Custom Analytics Integration**
   ```python
   def track_analytics_event(event_type, user_context, variation, data):
       # Track in LaunchDarkly
       ld_manager.track_event(event_type, user_context, data)
       
       # Track in your analytics system
       analytics_service.track(event_type, {
           "userId": user_context["key"],
           "variation": variation,
           "data": data
       })
   ```

## Rollout Strategy

1. **Initial Phase**
   - Enable flag for 10% of users
   - Monitor for technical issues
   - Validate analytics data

2. **Ramp Up**
   - Gradually increase to 25% per variation
   - Monitor key metrics
   - Collect user feedback

3. **Full Rollout**
   - Analyze experiment results
   - Choose winning variation
   - Plan permanent implementation

## Troubleshooting

1. **Common Issues**
   - Invalid SDK key
   - Missing user context
   - Flag evaluation timeout

2. **Debug Tools**
   - LaunchDarkly debugger
   - Server logs
   - Analytics dashboard

## Best Practices

1. **User Context**
   - Include relevant attributes
   - Maintain consistent keys
   - Validate context data

2. **Performance**
   - Use flag caching
   - Handle evaluation failures
   - Monitor response times

3. **Analytics**
   - Track all relevant events
   - Validate data accuracy
   - Monitor for anomalies

## Additional Resources

- [LaunchDarkly Documentation](https://docs.launchdarkly.com)
- [Python SDK Reference](https://docs.launchdarkly.com/sdk/server-side/python)
- [Experimentation Guide](https://docs.launchdarkly.com/home/experimentation)
