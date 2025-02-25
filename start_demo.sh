#!/bin/bash

# Kill any existing Python or Node processes
echo "Stopping any existing servers..."
pkill -f flask
pkill -f "react-scripts start"

# Start the Flask server
echo "Starting Flask server on port 5003..."
cd server
source venv/bin/activate && python3 -m flask run --port=5003 &

# Wait a moment for Flask to start
sleep 2

# Start the React development server
echo "Starting React development server on port 3003..."
cd ../client
PORT=3003 npm start &

# Wait for servers to start
sleep 3

# Open the demo in the default browser
echo "Opening demo in browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open http://localhost:3003
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open http://localhost:3003
elif [[ "$OSTYPE" == "msys" ]]; then
    # Windows
    start http://localhost:3003
fi

echo "Demo is running!"
echo "- Frontend: http://localhost:3003"
echo "- Backend: http://localhost:5003"
echo "- Analytics: http://localhost:5003/api/analytics/results"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for Ctrl+C
trap "echo 'Stopping servers...' && pkill -f flask && pkill -f 'react-scripts start'" SIGINT SIGTERM
wait
