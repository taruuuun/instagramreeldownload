# InstaSave Backend Documentation

## API Endpoints

### 1. Health Check
Check if the server is running.

**Request:**
`GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-06-10T12:00:00.000Z",
  "uptime": 120.5,
  "environment": "development"
}
```

### 2. Download Content
Fetch download links for Instagram content.

**Request:**
`POST /api/download`
```json
{
  "url": "https://www.instagram.com/reel/xxxx/"
}
```

**Response (Success):**
```json
{
  "success": true,
  "thumbnail": "https://...",
  "title": "Amazing video",
  "downloadUrl": "https://...",
  "duration": "00:15",
  "quality": "HD"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid Instagram URL..."
}
```

## React Integration Example

Here is how you can connect your existing React frontend to this backend:

```javascript
import { useState } from 'react';

export default function InstagramDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to process video');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        placeholder="Paste Instagram URL" 
      />
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Processing...' : 'Download'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {result && (
        <div>
          <h3>{result.title}</h3>
          <img src={result.thumbnail} alt="Thumbnail" width="200" />
          <a href={result.downloadUrl} target="_blank" rel="noreferrer" download>
            Download {result.quality}
          </a>
        </div>
      )}
    </div>
  );
}
```

## Postman Testing Examples

### Setup Environment
1. Open Postman
2. Create a new environment called "InstaSave Local"
3. Add variable `BASE_URL` = `http://localhost:5000`

### Test 1: Health Check
- **Method:** GET
- **URL:** `{{BASE_URL}}/api/health`
- **Expected Status:** 200 OK

### Test 2: Valid Reel Download
- **Method:** POST
- **URL:** `{{BASE_URL}}/api/download`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "url": "https://www.instagram.com/reel/C2_vjQ6uL8J/"
  }
  ```
- **Expected Status:** 200 OK

### Test 3: Invalid URL (Error Testing)
- **Method:** POST
- **URL:** `{{BASE_URL}}/api/download`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "url": "https://www.tiktok.com/@user/video/123"
  }
  ```
- **Expected Status:** 400 Bad Request

---

## Deployment Guide

### Option 1: Render (Easiest)

1. Push your backend code to GitHub.
2. Go to [Render.com](https://render.com) and sign in.
3. Click "New" -> "Web Service".
4. Connect your GitHub repository.
5. Configuration:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Expand "Advanced" and add Environment Variables:
   - `NODE_ENV` = `production`
   - `RAPID_API_KEY` = `your_key_here`
   - `RAPID_API_HOST` = `instagram-scraper-api2.p.rapidapi.com`
   - `CORS_ORIGIN` = `https://your-frontend-domain.com`
7. Click "Create Web Service".

### Option 2: VPS Ubuntu + PM2 + Nginx

#### 1. Server Setup
SSH into your Ubuntu server:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 and Nginx
sudo npm install -g pm2
sudo apt install nginx -y
```

#### 2. Deploy Application
```bash
# Clone repository
git clone <your-repo-url> instasave-backend
cd instasave-backend

# Install dependencies
npm install

# Create .env file
nano .env
# (Paste your production environment variables here)
```

#### 3. Start with PM2
```bash
# Start the app
pm2 start server.js --name "instasave-api"

# Save PM2 process list to start on boot
pm2 save
pm2 startup
# (Run the command PM2 outputs)
```

#### 4. Configure Nginx Reverse Proxy
```bash
sudo nano /etc/nginx/sites-available/instasave-api
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Pass real client IP for rate limiting
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/instasave-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. Add SSL (HTTPS)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```
