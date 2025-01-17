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

const createUser = async (userData) => {
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
    return result;
}

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
    console.log(result);

    return result;

}
module.exports = { requestHandler, createTableIfNotExists, createUser, fetchAllUsers, fetchUserCount, fetchUsersInRange }