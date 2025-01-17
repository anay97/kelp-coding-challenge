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

const createData = async (userData) => {
    const sql = postgres(process.env.DATABASE_URL);
    let result;
    try {
        result = await sql`
        INSERT INTO public.users (name, age, address, additional_info)
        VALUES (${userData.name}, ${userData.age}, ${userData.address}, ${userData.additional_info})
        RETURNING id, name, age, address, additional_info;`;

        console.log('User inserted:', result);
    } catch (error) {
        console.error('Error creating table:', error.message);
    } finally {
        await sql.end(); // Close the database connection
    }
    return result;
}

module.exports = { requestHandler, createTableIfNotExists, createData }