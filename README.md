# Smoosly - Production
- https://smoosly.com

### Installation npm packages
- npm install

### Frontend(Vue) build
- cd client
- npm run build

### Flask(Python) server on(background)
- cd flask & conda activate Smoosly
- nohup python -u flask_app.py &
- lsof i:5000, kill -9 PID

### Node Server on(background)
- sudo pm2 start ecosystem.comfig.js --only Smoosly
- sudo pm2 monit Smoosly || sudo pm2 log Smoosly
