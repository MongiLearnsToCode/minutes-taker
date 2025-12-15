# Railway Deployment

## Environment Variables

Set these in Railway dashboard:

```
APP_NAME=MinutesTaker
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app.railway.app
APP_KEY=base64:... (generate with: php artisan key:generate --show)

DB_CONNECTION=pgsql
DB_HOST=ep-old-frog-adxsxhvi.c-2.us-east-1.aws.neon.tech
DB_PORT=5432
DB_DATABASE=neondb
DB_USERNAME=neondb_owner
DB_PASSWORD=your-password
DB_SSLMODE=require

OPENAI_API_KEY=your-key
CLOUDFLARE_R2_ACCESS_KEY_ID=your-key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret
CLOUDFLARE_R2_BUCKET=minutes-taker
CLOUDFLARE_R2_ENDPOINT=your-endpoint
CLOUDFLARE_R2_URL=your-url
```

## Deploy

1. Connect your GitHub repo to Railway
2. Add the environment variables above
3. Deploy!
