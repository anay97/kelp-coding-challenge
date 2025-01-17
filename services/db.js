const postgres = require('postgres');


const requestHandler = async () => {
    const sql = postgres(process.env.DATABASE_URL);
    const result = await sql`SELECT version()`;
    const version = result[0];
    return version;
};

const createTableIfNotExists = async () => {
    const sql = postgres(process.env.DATABASE_URL);
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS public.users (
          id SERIAL PRIMARY KEY,
          name VARCHAR NOT NULL,
          age INT NOT NULL,
          address JSONB DEFAULT NULL,
          additional_info JSONB DEFAULT NULL
        )
      `;
        console.log('Table "users" created or already exists.');
    } catch (error) {
        console.error('Error creating table:', error.message);
    } finally {
        await sql.end(); // Close the database connection
    }
};

module.exports = { requestHandler, createTableIfNotExists }