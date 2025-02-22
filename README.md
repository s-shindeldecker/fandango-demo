# Fandango Demo

A demo application showcasing movie showtimes and theater information with feature flags and analytics integration.

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Get the demo running in minutes
- [LaunchDarkly Setup](LAUNCHDARKLY_SETUP.md) - Configure feature flags
- [Analytics Guide](ANALYTICS_GUIDE.md) - Understanding the analytics implementation

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/s-shindeldecker/fandango-demo
cd fandango-demo
```

2. Set up the backend:
```bash
cd server
python3 -m venv myenv
source myenv/bin/activate  # On Windows: myenv\Scripts\activate
pip install -r requirements.txt
cd ..
```

3. Set up the frontend:
```bash
cd client
npm install
cd ..
```

4. Configure environment:
- Copy `server/.env.example` to `server/.env`
- Add your LaunchDarkly SDK key to `server/.env`

5. Start the demo:
```bash
./start_demo.sh
```

The demo will be available at:
- Frontend: http://localhost:3003
- Backend: http://localhost:5003
- Analytics Dashboard: http://localhost:5003/api/analytics/results

To stop the demo:
```bash
./stop_demo.sh
```

## 🏗 Project Structure

```
fandango-demo/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   └── services/      # API services
│   └── public/            # Static assets
└── server/                # Python Flask backend
    ├── app.py            # Main server file
    └── mock_data.py      # Movie and theater data
```

## 🔧 Development

### Frontend (React)

- Built with Create React App
- TypeScript for type safety
- Styled with CSS-in-JS
- Components in `client/src/components/`
- API services in `client/src/services/`

### Backend (Flask)

- Python Flask server
- LaunchDarkly integration for feature flags
- Mock data for movies and theaters
- Analytics tracking endpoints

## 🎯 Feature Flags

The demo uses LaunchDarkly for feature flag management:
- Showtimes availability
- Pricing display
- Theater location features
- Analytics tracking

See [LaunchDarkly Setup](LAUNCHDARKLY_SETUP.md) for configuration details.

## 📊 Analytics

The demo includes built-in analytics tracking:
- Page views
- Movie selections
- Showtime interactions
- Feature flag evaluations

See [Analytics Guide](ANALYTICS_GUIDE.md) for implementation details.

## 🔍 Troubleshooting

### Common Issues

1. **"Failed to load movie data"**
   - Ensure the Flask server is running (port 5003)
   - Check if Python virtual environment is activated
   - Verify all Python dependencies are installed

2. **"Something is already running on port 3003"**
   - Use `stop_demo.sh` to clean up existing processes
   - Manually kill processes: `lsof -i :3003,5003`

3. **LaunchDarkly Connection Issues**
   - Verify SDK key in `server/.env`
   - Check LaunchDarkly dashboard connection
   - Ensure proper flag configuration

### Server Logs

- Frontend logs: Check browser console
- Backend logs: Check terminal running `start_demo.sh`
- Analytics: Visit http://localhost:5003/api/analytics/results

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details
