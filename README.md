# Kelp Coding Challenge

This is a Node.js project created as part of a coding challenge. It is built using the Express.js framework and includes functionality for interacting with a PostgreSQL database.

## Features
- Fetch and process CSV files.
- Convert CSV data into JSON.
- Store data in a PostgreSQL database.
- Retrieve user data based on age criteria.
- Built-in environment variable management using `.env` files.

## Prerequisites
- Node.js (v16 or higher recommended)
- PostgreSQL database
- npm or yarn package manager

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd kelp-coding-challenge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add the following:
   ```env
   # Database configuration
   DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
   # CSV File
   CSV_FILE_PATH=./test.csv
   # Application settings
   PORT=3000
   ```

4. **Run the application:**
   - For production:
     ```bash
     npm start
     ```
   - For development (with hot-reloading):
     ```bash
     npm run dev
     ```

## Dependencies

- **cookie-parser (~1.4.4):** Middleware for parsing cookies in incoming requests.
- **debug (~2.6.9):** Debugging utility.
- **dotenv (^16.4.7):** Loads environment variables from a `.env` file into `process.env`.
- **ejs (~2.6.1):** Template engine for rendering HTML pages.
- **express (~4.16.1):** Web framework for building server-side applications.
- **http-errors (~1.6.3):** Utility for creating HTTP error objects.
- **morgan (~1.9.1):** HTTP request logger middleware.
- **postgres (^3.4.5):** Postgres.js client for interacting with a PostgreSQL database.

### Dev Dependencies

- **nodemon (^3.1.9):** Development tool that automatically restarts the server on file changes.

## Project Structure
```
kelp-coding-challenge/
├── bin/
│   └── www                # Application entry point
├── model/                 # Models for the project
├── routes/                # Route handlers
├── services/              # Business logic and database operations
├── views/                 # EJS templates
├── public/                # Static files (CSS, JS, etc.)
├── .env                   # Environment variables (not included in version control)
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## Example Usage
### Fetching Users by Age Range
You can fetch users by providing age range criteria such as `lessThan`, `greaterThan`, or `equalTo`.

If the equal to field is selected, the other two fields are ignored by the code.

### CSV to JSON Conversion
The application processes CSV file to convert them into JSON format for further operations.

## Contributing
Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.

