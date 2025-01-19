const postgres = require('postgres');

/**
 * Method to check if DB is connecting
 * @returns String DB Version
 */
const requestHandler = async () => {
    const sql = postgres(process.env.DATABASE_URL);
    const result = await sql`SELECT version()`;
    const version = result[0];
    return version;
};

/**
 * Method to create a table if it doesn't exist
 */
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

/**
 * Create multiple users based on UsersData Array
 * @param {Array<UserData>} usersData 
 */
const createUser = async (usersData) => {
    const sql = postgres(process.env.DATABASE_URL);
    try {
        await sql`INSERT INTO public.users ${sql(usersData, 'name', 'age', 'address', 'additional_info')}`
    } catch (error) {
        console.error('Error creating table:', error.message);
    } finally {
        await sql.end(); // Close the database connection
    }
}

/**
 * Fetches all users in the database
 * @returns {Array<UserData>}
 */
const fetchAllUsers = async () => {
    const sql = postgres(process.env.DATABASE_URL);
    let result;
    try {
        result = await sql`SELECT * FROM public.users;`;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await sql.end(); // Close the database connection
    }
    return result;
}

/**
 * Fetches count of users in the database
 * @returns Count of Users
 */
const fetchUserCount = async () => {
    const sql = postgres(process.env.DATABASE_URL);
    let result;
    try {
        result = await sql`SELECT count(*) FROM public.users;`;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await sql.end(); // Close the database connection
    }
    return result[0].count;
}

/**
 * 
 * @param {*} ageRange 
 * @param {boolean} isEfficient 
 * @returns {*} List of Users or Count of Users in Range
 */
const fetchUsersInRange = async (ageRange, isEfficient) => {
    if (!ageRange['lessThan']) {
        ageRange['lessThan'] = 1000;
    }
    if (!ageRange['greaterThan']) {
        ageRange['greaterThan'] = -1000;
    }
    const sql = postgres(process.env.DATABASE_URL);
    let result;
    const olderThan = x => sql` and age > ${x}`
    const lessThan = x => sql` and age < ${x}`;
    const equalTo = x => sql` and age=${x}`;
    const efficient = () => sql`count(*)`;
    try {
        result = await sql`SELECT ${isEfficient ? efficient() : sql`*`} FROM public.users WHERE TRUE
        ${ageRange['equalTo']
                ? equalTo(ageRange['equalTo'])
                : sql``
            }
         ${!ageRange['equalTo'] ? olderThan(ageRange['greaterThan']) : sql``} ${!ageRange['equalTo'] ? lessThan(ageRange['lessThan']) : sql``}`;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await sql.end(); // Close the database connection
    }
    return result;
}
module.exports = { requestHandler, createTableIfNotExists, createUser, fetchAllUsers, fetchUserCount, fetchUsersInRange }