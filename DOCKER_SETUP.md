# Docker Setup Guide - HaupCar Project

## Prerequisites
- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose installed (comes with Docker Desktop)

## Quick Start

### 1. Navigate to project root
```bash
cd e:\Project\haupcar-car-management
```

### 2. Environment configuration
The `.env` file is already created in `backend/` folder with Docker MySQL configuration:
```bash
docker-compose up -d
```

This will:
- Start MySQL 8.0 container
- Create `haupcar_db` database
- Create `cars` table with sample data
- Start Node.js backend
- Setup persistent database volume

### 3. Verify services
```bash
docker-compose ps
```

### 4. Test the API
```bash
# Get all cars
curl http://localhost:5000/api/cars

# Create a car
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -d '{"registration_number":"กก 9999 ก","brand":"BMW","model":"X5","notes":"test"}'
```

## Database Configuration

### Environment Variables
Located in `backend/.env`:
- DB_HOST: `mysql`
- DB_USER: `haupcar_user`
- DB_PASSWORD: `haupcar_password`
- DB_NAME: `haupcar_db`

### Cars Table Schema
```sql
CREATE TABLE cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registration_number VARCHAR(50) NOT NULL UNIQUE,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

## Useful Commands

### View logs
```bash
docker-compose logs -f backend    # Backend logs
docker-compose logs -f mysql      # MySQL logs
docker-compose logs -f            # All logs
```

### Access MySQL directly
```bash
docker exec -it haupcar_mysql mysql -u haupcar_user -p
# Password: haupcar_password
mysql> SELECT * FROM cars;
```

### Stop/Restart
```bash
docker-compose down           # Stop all services
docker-compose restart        # Restart services
docker-compose up -d --build  # Rebuild and restart
```

### Clean up (WARNING: deletes database)
```bash
docker-compose down -v
```

## Troubleshooting

### Backend can't connect to MySQL
- Check MySQL is healthy: `docker-compose ps`
- Wait 30-60 seconds for MySQL initialization
- View logs: `docker-compose logs mysql`

### Port already in use
Edit `docker-compose.yml`:
```yaml
mysql:
  ports:
    - "3307:3306"  # Changed port
backend:
  ports:
    - "5001:5000"  # Changed port
```

### Database table missing
Run this to recreate tables:
```bash
docker-compose down -v
docker-compose up -d
```

## Development

### With Docker
```bash
docker-compose up -d
docker-compose logs -f backend
```

### Local (requires MySQL installed)
```bash
cd backend
npm install
npm run dev
```

## API Endpoints

### GET /api/cars
Get all cars

### POST /api/cars
Create car
```json
{
  "registration_number": "กก 1111 ก",
  "brand": "Toyota",
  "model": "Camry",
  "notes": "Notes here"
}
```

### PUT /api/cars/:id
Update car

### DELETE /api/cars/:id
Delete car

---
**Status**: Database initialized | Tables created | Sample data loaded
