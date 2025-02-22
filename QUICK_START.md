# Quick Start Guide

Get the Fandango showtime sort experiment demo running in minutes.

## Prerequisites

- Node.js (v14+)
- Python 3.9+
- LaunchDarkly account (optional for initial testing)

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd fandango-demo
```

2. **Set up the backend**
```bash
cd server
python3 -m pip install -r requirements.txt
cp .env.example .env
```

3. **Set up the frontend**
```bash
cd ../client
npm install
```

## Running the Demo

### Using Convenience Scripts

1. **Start all servers**
```bash
./start_demo.sh
```
This will:
- Start the Flask server on port 5003
- Start the React development server on port 3003
- Open the demo in your default browser
- Show server status and URLs

2. **Stop all servers**
```bash
./stop_demo.sh
```
This will cleanly shut down:
- The Flask server
- The React development server

### Manual Start (if needed)

1. **Start the Flask server**
```bash
cd server
python3 -m flask run --port=5003
```

2. **Start the React frontend**
```bash
cd client
PORT=3003 npm start
```

## Quick Demo Scenarios

1. **Test Different Sort Orders**
   - Refresh the page to see random variations
   - Each variation shows formats in different orders
   - Click showtimes to see tracking in action

2. **View Analytics**
   - Visit [http://localhost:5003/api/analytics/results](http://localhost:5003/api/analytics/results)
   - See real-time click-through rates
   - Compare variation performance

## Demo URLs

- Frontend: [http://localhost:3003](http://localhost:3003)
- Backend API: [http://localhost:5003](http://localhost:5003)
- Analytics: [http://localhost:5003/api/analytics/results](http://localhost:5003/api/analytics/results)

## Next Steps

1. **LaunchDarkly Integration**
   - Follow [LAUNCHDARKLY_SETUP.md](./LAUNCHDARKLY_SETUP.md)
   - Replace random assignment with feature flags
   - Set up experimentation

2. **Customize the Demo**
   - Modify sort orders in `server/mock_data.py`
   - Add new formats or showtimes
   - Adjust the UI in React components

3. **Analyze Results**
   - Use [ANALYTICS_GUIDE.md](./ANALYTICS_GUIDE.md)
   - Interpret experiment data
   - Make data-driven decisions

## Common Issues

1. **Port Already in Use**
   ```bash
   # For Flask server
   python3 -m flask run --port=5004  # Try different port

   # For React app
   PORT=3004 npm start  # Try different port
   ```

2. **API Connection Failed**
   - Check if Flask server is running
   - Verify API_BASE_URL in `client/src/services/api.ts`
   - Check browser console for errors

3. **Scripts Not Executing**
   - Ensure scripts are executable:
     ```bash
     chmod +x start_demo.sh stop_demo.sh
     ```
   - Check for correct line endings (LF) on Unix systems

## Need Help?

- Check the full [README.md](./README.md) for detailed documentation
- Review [LAUNCHDARKLY_SETUP.md](./LAUNCHDARKLY_SETUP.md) for feature flag setup
- Consult [ANALYTICS_GUIDE.md](./ANALYTICS_GUIDE.md) for data analysis

## Demo Flow

1. **Initial Setup** (5 minutes)
   - Install dependencies
   - Start servers with `./start_demo.sh`
   - Browser opens automatically

2. **Basic Testing** (10 minutes)
   - View different variations
   - Click showtimes
   - Check analytics

3. **LaunchDarkly Setup** (15 minutes)
   - Create account
   - Configure flag
   - Update code

4. **Custom Configuration** (varies)
   - Modify sort orders
   - Add formats
   - Adjust styling

## Quick Commands Reference

```bash
# Start all servers
./start_demo.sh

# Stop all servers
./stop_demo.sh

# View logs
tail -f server/flask.log

# Reset analytics
curl -X POST http://localhost:5003/api/analytics/reset

# Check status
curl http://localhost:5003/api/health
```

## Minimal Configuration

```python
# server/.env
LAUNCHDARKLY_SDK_KEY=your-key-here  # Optional for initial testing
```

```typescript
// client/src/services/api.ts
const API_BASE_URL = 'http://localhost:5003/api';
```

Happy testing! 🎬
