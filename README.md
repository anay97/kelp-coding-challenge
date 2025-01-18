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

The structure allows maintaining much needed separation between different components of the project. This also ensures the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) is not violated.

As the project expands and becomes more complex, the structure will prove to be more useful. This also enables new team members to onboard quickly as the project structure is more nuanced and logically separated.

While creating this structure is relatively easy, the challenge is, in my opinion, following it. Especially during deadlines, important deliveries, client escalations, etc.

## Example Usage
### Fetching Users by Age Range
You can fetch users by providing age range criteria such as `lessThan`, `greaterThan`, or `equalTo`.

If the equal to field is selected, the other two fields are ignored by the code.

#### Fetch vs Efficient Fetch
You can fetch users by providing age range criteria such as `lessThan`, `greaterThan`, or `equalTo`.

If you use the `Fetch` button, the database is queried and all the fields are returned along with showing the name and age in a tabular format. On the other hand, while using the `Efficient Fetch` button, only the count of the users for the given age range are returned. This is far more efficient and is useful when querying tables with large number of rows.

## Further Enhancements
### Using a Frontend framework
Using Angular or React.js was outside the scope for the project. Hence, something barebones yet powerful like the EJS Template Engine was used. Future use could look at using Angular or React.

### Database Connections
I decided to use [Neon](https://neon.tech) for providing a managed PostgreSQL database in the cloud. This allows for quick prototyping and also for showcasing (interviewers don't need to setup anything on their local systems). Needless to say, this couples the application to a given company's offering.

This has been partially mitigated by using **postgres** dependency which is a generic PostgreSQL client instead of **@neon/serverless** dependency which couples the application to the PaaS provider. 

Future efforts could be oriented towards containerizing the PostgreSQL database using Docker. Apart from the usual benefits of containerization, this allows for added security, flexibility and helps the application become platform independant. Furthermore, the entire application can also be a separate container!

### Test-Driven Development
The application was built in a day. In a production project, one would be better off with following Test-Driven Development and writing meaningful test cases to complement their code.

### Gitflow
Since I was the only one working on this project, I decided not to use multiple branches and merging to the main branch. A large team can benefit from something like that in place.

### CI/CD Pipelines
Again, being able to ensure the application works before merging to main would be a great added benefit.

## Contributing
Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.

