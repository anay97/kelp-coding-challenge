require('dotenv').config();

/**
 * 
 * @returns String
 */
const getFilePath = () => {
    const filePath = process.env.CSV_FILE_PATH;
    console.log("File Path:", filePath);
    return filePath;
}

module.exports = { getFilePath }