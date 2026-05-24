# Docker Setup Guide

This guide explains how to run TasteIQ Landing Page using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

1. **Clone the repository and navigate to the project:**
   ```bash
   cd nextjs-setup
   ```

2. **Create a `.env` file (optional, for custom configuration):**
   ```bash
   cp .env.example .env  # If you have an example file
   # Or create .env manually with your environment variables
   ```

3. **Build and start the services:**
   ```bash
   docker-compose up -d
   ```

4. **Run database migrations:**
   ```bash
   docker-compose exec app npx prisma migrate deploy
   ```

5. **Seed the database (optional):**
   ```bash
   docker-compose exec app npx prisma db seed
   ```

6. **Access the application:**
   - Application: http://localhost:3000
   - Database: localhost:5432

## Environment Variables

You can set environment variables in a `.env` file in the project root, or override them in `docker-compose.override.yml`:

```env
# Database (automatically configured via docker-compose)
DATABASE_URL=postgresql://tasteiq_user:tasteiq_password@postgres:5432/tasteiq_db?schema=public

# Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXXXXXXX
NEXT_PUBLIC_LINKEDIN_ID=XXXXXX
NEXT_PUBLIC_MICROSOFT_UET_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://tasteiq.com

# Admin Password
ADMIN_PASSWORD=your-secure-password-here

# Edge Config (Optional)
EDGE_CONFIG_URL=https://edge-config.vercel.app/your-config-id
```

## Docker Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f postgres
```

### Rebuild after code changes
```bash
docker-compose up -d --build
```

### Run database migrations
```bash
docker-compose exec app npx prisma migrate deploy
```

### Generate Prisma Client
```bash
docker-compose exec app npx prisma generate
```

### Access database shell
```bash
docker-compose exec postgres psql -U tasteiq_user -d tasteiq_db
```

### Access app shell
```bash
docker-compose exec app sh
```

### Stop and remove volumes (clean slate)
```bash
docker-compose down -v
```

## Development Mode

For development with hot-reload, you can use a development docker-compose override:

Create `docker-compose.dev.yml`:
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev  # Create a dev Dockerfile
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      NODE_ENV: development
    command: npm run dev
```

Then run:
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## Production Deployment

For production, ensure:

1. **Change default passwords:**
   - Update `POSTGRES_PASSWORD` in `docker-compose.yml`
   - Update `ADMIN_PASSWORD` in environment variables

2. **Use environment-specific configuration:**
   - Set all analytics IDs
   - Configure `NEXT_PUBLIC_SITE_URL` correctly
   - Use strong passwords

3. **Enable SSL/TLS:**
   - Use a reverse proxy (nginx, traefik) with SSL certificates
   - Configure HTTPS redirects

4. **Backup database:**
   ```bash
   docker-compose exec postgres pg_dump -U tasteiq_user tasteiq_db > backup.sql
   ```

5. **Monitor resources:**
   ```bash
   docker stats
   ```

## Troubleshooting

### Database connection issues
- Ensure PostgreSQL container is healthy: `docker-compose ps`
- Check database logs: `docker-compose logs postgres`
- Verify DATABASE_URL matches docker-compose configuration

### Build failures
- Clear Docker cache: `docker system prune -a`
- Rebuild without cache: `docker-compose build --no-cache`

### Port conflicts
- Change ports in `docker-compose.yml` if 3000 or 5432 are already in use
- Update `DATABASE_URL` if you change the database port

### Permission issues
- Ensure Docker has proper permissions
- On Linux, you may need to add your user to the docker group

## Database Persistence

The PostgreSQL data is stored in a Docker volume (`postgres_data`). This means:
- Data persists even if containers are stopped
- To completely reset: `docker-compose down -v`
- To backup: `docker-compose exec postgres pg_dump -U tasteiq_user tasteiq_db > backup.sql`

## Security Notes

⚠️ **Important for Production:**
- Never commit `.env` files with real credentials
- Use strong passwords for database and admin access
- Regularly update Docker images: `docker-compose pull`
- Keep dependencies updated
- Use secrets management for sensitive data
- Enable firewall rules
- Use HTTPS in production

