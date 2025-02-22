from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import random
from mock_data import MOCK_MOVIE, MOCK_THEATER, MOCK_SHOWTIMES, SORT_VARIATIONS

app = Flask(__name__)
CORS(app)

# In-memory analytics storage (replace with proper database in production)
analytics_data = []

@app.route('/api/movie/<movie_id>', methods=['GET'])
def get_movie(movie_id):
    # For demo purposes, always return our mock movie
    return jsonify(MOCK_MOVIE)

@app.route('/api/theater/<theater_id>', methods=['GET'])
def get_theater(theater_id):
    # For demo purposes, always return our mock theater
    return jsonify(MOCK_THEATER)

@app.route('/api/showtimes/<theater_id>/<movie_id>', methods=['GET'])
def get_showtimes(theater_id, movie_id):
    # Get user context from query params (in production, this would come from auth)
    user_id = request.args.get('userId', 'default-user')
    
    # For demo purposes, randomly select a variation
    variation = f"variation_{random.randint(1, 4)}"
    
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
    
    return jsonify(response)

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

if __name__ == '__main__':
    app.run(debug=True, port=5001)
