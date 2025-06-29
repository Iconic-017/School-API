# School API

A RESTful API for managing schools with location-based functionality. This API allows you to add schools with their geographical coordinates and retrieve schools sorted by distance from a given location.

## Features

- Add schools with name, address, and GPS coordinates
- List schools sorted by distance from a specified location
- Calculate distances using the Haversine formula
- MySQL database integration

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SchoolAPI
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your database configuration:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

4. Create the schools table in your MySQL database:
```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### 1. Add School

**Endpoint:** `POST /addSchool`

**Description:** Adds a new school to the database with its location information.

**Request Body:**
```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Harvard University",
    "address": "Cambridge, MA 02138, USA",
    "latitude": 42.3744,
    "longitude": -71.1169
  }'
```

**Success Response (201):**
```json
{
  "message": "School added successfully."
}
```

**Error Response (400) - Missing Fields:**
```json
{
  "message": "All fields are required."
}
```

**Error Response (500) - Database Error:**
```json
{
  "message": "Database error."
}
```

### 2. List Schools

**Endpoint:** `GET /listSchools`

**Description:** Retrieves all schools sorted by distance from the specified coordinates.

**Query Parameters:**
- `latitude` (required): Latitude of the reference point
- `longitude` (required): Longitude of the reference point

**Example Request:**
```bash
curl "http://localhost:3000/listSchools?latitude=40.7128&longitude=-74.0060"
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "Columbia University",
    "address": "New York, NY 10027, USA",
    "latitude": 40.8075,
    "longitude": -73.9626,
    "created_at": "2024-01-15T10:30:00.000Z",
    "distance": 8.45
  },
  {
    "id": 2,
    "name": "Harvard University",
    "address": "Cambridge, MA 02138, USA",
    "latitude": 42.3744,
    "longitude": -71.1169,
    "created_at": "2024-01-15T11:00:00.000Z",
    "distance": 306.78
  }
]
```

**Error Response (400) - Missing Coordinates:**
```json
{
  "message": "Latitude and longitude are required."
}
```

**Error Response (500) - Server Error:**
```json
{
  "message": "Error fetching schools"
}
```

## Distance Calculation

The API uses the Haversine formula to calculate distances between geographical coordinates. Distances are returned in kilometers and rounded to 2 decimal places.

**Formula:**
```
a = sin²(Δφ/2) + cos(φ1) × cos(φ2) × sin²(Δλ/2)
c = 2 × atan2(√a, √(1−a))
distance = R × c
```

Where:
- φ1, φ2 = latitudes of point 1 and point 2
- Δφ = φ2 - φ1
- Δλ = λ2 - λ1
- R = Earth's radius (6,371 km)

## Project Structure

```
SchoolAPI/
├── app.js                 # Main application file
├── Controller/
│   └── school.Controller.js  # Business logic for school operations
├── Database/
│   └── db.js             # Database connection configuration
├── Routes/
│   └── school.Routes.js  # API route definitions
├── Utils/
│   └── distance.js       # Distance calculation utility
├── package.json          # Project dependencies
└── README.md            # This file
```

## Dependencies

- **express**: Web framework for Node.js
- **mysql2**: MySQL client for Node.js
- **dotenv**: Environment variable management
- **body-parser**: Request body parsing middleware

## Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- Invalid input data
- Database connection issues
- Server errors

All errors return appropriate HTTP status codes and descriptive error messages.

## Testing the API

You can test the API using tools like:
- **cURL** (command line)
- **Postman** (GUI tool)
- **Insomnia** (GUI tool)
- **Thunder Client** (VS Code extension)

## Example Usage Scenarios

### Scenario 1: Adding Multiple Schools
```bash
# Add Harvard University
curl -X POST http://localhost:3000/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Harvard University",
    "address": "Cambridge, MA 02138, USA",
    "latitude": 42.3744,
    "longitude": -71.1169
  }'

# Add MIT
curl -X POST http://localhost:3000/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Massachusetts Institute of Technology",
    "address": "Cambridge, MA 02139, USA",
    "latitude": 42.3601,
    "longitude": -71.0942
  }'

# Add Columbia University
curl -X POST http://localhost:3000/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Columbia University",
    "address": "New York, NY 10027, USA",
    "latitude": 40.8075,
    "longitude": -73.9626
  }'
```

### Scenario 2: Finding Schools Near New York City
```bash
# Get schools sorted by distance from NYC (40.7128, -74.0060)
curl "http://localhost:3000/listSchools?latitude=40.7128&longitude=-74.0060"
```

This will return schools sorted by distance from New York City, with Columbia University appearing first (closest) and Harvard/MIT appearing later (farther away).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 