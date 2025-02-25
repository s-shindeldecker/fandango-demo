from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import random
import os
from dotenv import load_dotenv
from mock_data import MOCK_MOVIE, MOCK_THEATER, MOCK_SHOWTIMES, SORT_VARIATIONS
from ldclient import LDClient, Config

# Load environment variables
load_dotenv()

class LaunchDarklyManager:
    def __init__(self, d):
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
            "showtime-click",  # Changed to match requested name
            user_context,
            metric_value=1,
            data=showtime_data
        )

    def close(self):
        self.client.close()

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

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)

# Get LaunchDarkly SDK key from environment
sdk_key = os.getenv('LAUNCHDARKLY_SDK_KEY')
if not sdk_key:
    raise ValueError("LAUNCHDARKLY_SDK_KEY environment variable is required")

# Initialize LaunchDarkly client
ld_manager = LaunchDarklyManager(sdk_key)

# In-memory analytics storage (replace with proper database in production)
analytics_data = []

@app.route('/api/movie/<movie_id>', methods=['GET'])
def get_movie(movie_id):
    # Return mock movie data with the default poster URL
    # The client will handle the LaunchDarkly flag evaluation for the image URL
    return jsonify(MOCK_MOVIE)

@app.route('/api/theater/<theater_id>', methods=['GET'])
def get_theater(theater_id):
    # For demo purposes, always return our mock theater
    return jsonify(MOCK_THEATER)

@app.route('/api/showtimes/<theater_id>/<movie_id>', methods=['GET'])
def get_showtimes(theater_id, movie_id):
    # Get user context from query params
    user_id = request.args.get('userId', 'default-user')
    
    # Create user context for LaunchDarkly
    user_context = create_user_context(user_id, theater_id, MOCK_MOVIE)
    
    # Get variation from LaunchDarkly
    variation = ld_manager.get_sort_variation(user_context)
    
    # Get the sort order for this variation
    sort_order = SORT_VARIATIONS.get(variation, SORT_VARIATIONS["variation_1"])
    
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

@app.route('/api/analytics/track', methods=['POST'])
def track_event():
    data = request.json
    
    # Add timestamp to the event data
    event_data = {
        **data,
        "timestamp": datetime.utcnow().isoformat()
    }
    
    # In production, you'd want to store this in a proper database
    analytics_data.append(event_data)
    
    return jsonify({"status": "success"})

@app.route('/api/analytics/results', methods=['GET'])
def get_analytics():
    # Simple analytics aggregation
    results = {
        "variation_1": {"clicks": 0, "views": 0},
        "variation_2": {"clicks": 0, "views": 0},
        "variation_3": {"clicks": 0, "views": 0},
        "variation_4": {"clicks": 0, "views": 0}
    }
    
    for event in analytics_data:
        variation = event.get("variation")
        event_type = event.get("type")
        
        if variation and variation in results:
            if event_type == "view":
                results[variation]["views"] += 1
            elif event_type == "click":
                results[variation]["clicks"] += 1
    
    # Calculate click-through rates
    for variation in results:
        views = results[variation]["views"]
        clicks = results[variation]["clicks"]
        ctr = (clicks / views * 100) if views > 0 else 0
        results[variation]["ctr"] = round(ctr, 2)
    
    return jsonify(results)

def track_analytics_event(event_type, user_context, variation, data):
    # Track in LaunchDarkly
    ld_manager.track_event(event_type, user_context, data)
    
    # Track in your analytics system
    analytics_service.track(event_type, {
        "userId": user_context["key"],
        "variation": variation,
        "data": data
    })

if __name__ == '__main__':
    try:
        app.run(debug=True, port=5003)
    finally:
        # Ensure LaunchDarkly client is closed properly
        ld_manager.close()
