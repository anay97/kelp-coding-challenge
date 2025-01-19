require('dotenv').config();
const fs = require('fs');

/**
 * Reads the path to the CSV file stored in .env
 * @returns String
 */
const getFilePath = () => {
    const filePath = process.env.CSV_FILE_PATH;
    console.log("File Path:", filePath);
    return filePath;
}

/**
 * Reads a CSV file and parses its content into an array of nested objects.
 * 
 * @returns {Promise<Object[]>} A promise that resolves to an array of objects.
 * @throws {Error} If the file operation or parsing fails.
 */
const convertCSVToJSON = async () => {
    const filePath = getFilePath();
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.trim().split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        const data = lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            const obj = {};
            headers.forEach((header, index) => {
                const keys = header.split('.');
                let current = obj;
                keys.forEach((key, keyIndex) => {
                    if (keyIndex === keys.length - 1) {
                        // Assign the value to the last key
                        current[key] = values[index];
                    } else {
                        // Ensure the intermediate object exists
                        current[key] = current[key] || {};
                        current = current[key];
                    }
                });
            });
            return obj;
        });
        return data;
    } catch (error) {
        throw new Error('Error reading or parsing the CSV file: ' + error.message);
    }
};
module.exports = { convertCSVToJSON }