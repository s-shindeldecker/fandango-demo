MOCK_MOVIE = {
    "id": "237015",
    "title": "Captain America: Brave New World",
    "releaseDate": "2025-02-14",
    "rating": "PG-13",
    "runtime": "2h 15min",
    "description": "Following the events of 'The Falcon and the Winter Soldier,' Sam Wilson takes on the mantle of Captain America in a brave new world. As new threats emerge and old allies return, Sam must navigate the complexities of being Captain America while facing challenges that test not just his strength, but his values and determination.",
    "poster": "https://placehold.co/460x690/0d53f6/ffffff?text=Captain+America:+Brave+New+World"
}

MOCK_THEATER = {
    "id": "amc-15",
    "name": "AMC Century City 15",
    "address": "10250 Santa Monica Blvd., Los Angeles, CA 90067"
}

# Mock showtimes with different formats
MOCK_SHOWTIMES = {
    "standard": [
        {"time": "10:30 AM", "format": "Standard", "price": "$16.99"},
        {"time": "1:45 PM", "format": "Standard", "price": "$16.99"},
        {"time": "4:30 PM", "format": "Standard", "price": "$18.99"},
        {"time": "7:15 PM", "format": "Standard", "price": "$18.99"},
        {"time": "10:00 PM", "format": "Standard", "price": "$18.99"},
    ],
    "imax_3d": [
        {"time": "11:00 AM", "format": "IMAX 3D", "price": "$24.99"},
        {"time": "2:30 PM", "format": "IMAX 3D", "price": "$24.99"},
        {"time": "5:45 PM", "format": "IMAX 3D", "price": "$26.99"},
        {"time": "9:00 PM", "format": "IMAX 3D", "price": "$26.99"},
    ],
    "imax": [
        {"time": "12:15 PM", "format": "IMAX", "price": "$21.99"},
        {"time": "3:30 PM", "format": "IMAX", "price": "$21.99"},
        {"time": "6:45 PM", "format": "IMAX", "price": "$23.99"},
        {"time": "9:45 PM", "format": "IMAX", "price": "$23.99"},
    ],
    "digital_3d": [
        {"time": "11:45 AM", "format": "Digital 3D", "price": "$19.99"},
        {"time": "2:15 PM", "format": "Digital 3D", "price": "$19.99"},
        {"time": "5:00 PM", "format": "Digital 3D", "price": "$21.99"},
        {"time": "8:15 PM", "format": "Digital 3D", "price": "$21.99"},
    ]
}

# Predefined sort variations for the experiment
SORT_VARIATIONS = {
    "variation_1": ["standard", "imax", "imax_3d", "digital_3d"],
    "variation_2": ["imax_3d", "imax", "standard", "digital_3d"],
    "variation_3": ["imax", "digital_3d", "standard", "imax_3d"],
    "variation_4": ["digital_3d", "standard", "imax_3d", "imax"]
}
