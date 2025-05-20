# MER API REST Documentation

## Overview
This project is a RESTful API built using Node.js and MongoDB. It provides endpoints for managing various entities such as cities, famous personalities, countries, characters, dishes, sites, tags, users, and visits. The API follows the principles of REST and uses JSON for data interchange.

## Project Structure
The project is organized into several directories, each serving a specific purpose:

- **controllers/**: Contains the logic for handling requests and responses for each entity.
- **database/**: Manages the connection to the MongoDB database.
- **helpers/**: Provides utility functions for validation and token generation.
- **middlewares/**: Contains middleware functions for request validation and authentication.
- **models/**: Defines the schemas for each entity in MongoDB.
- **routes/**: Specifies the routes for each entity's endpoints.
- **app.js**: The entry point of the application that initializes the server.
- **package.json**: Lists the project's dependencies and scripts.
- **.env**: Contains environment variables for configuration.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd mer-api-rest
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```
   PORT=8081
   MONGODB_CNN=<your-mongodb-connection-string>
   SECRETORPRIVATEKEY=<your-secret-key>
   ```

## Usage
To start the server, run:
```
npm run dev
```
The API will be available at `http://localhost:8081`.

## Endpoints
The API provides the following endpoints:

- **Cities**: `/api/ciudades`
- **Famous Personalities**: `/api/famosos`
- **Countries**: `/api/paises`
- **Characters**: `/api/personajes`
- **Dishes**: `/api/platos`
- **Sites**: `/api/sitios`
- **Tags**: `/api/tags`
- **Users**: `/api/usuarios`
- **Visits**: `/api/visita`

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the ISC License.