#!/bin/bash

echo "Stopping demo servers..."

# Kill Flask server
if pgrep -f "flask run --port=5003" > /dev/null; then
    pkill -f "flask run --port=5003"
    echo "- Flask server stopped"
else
    echo "- Flask server was not running"
fi

# Kill React development server
if pgrep -f "react-scripts start" > /dev/null; then
    pkill -f "react-scripts start"
    echo "- React development server stopped"
else
    echo "- React development server was not running"
fi

echo "All servers stopped successfully!"
