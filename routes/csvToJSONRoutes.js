const { convertCSVToJSON } = require('../services/fileService');
const { requestHandler, createTableIfNotExists } = require('../services/db');

const processCSVRoute = async (req, res) => {
    try {
        const jsonData = await convertCSVToJSON();
        res.status(200).json({ success: true, data: jsonData });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Error processing file' });
    }
}

const requestHandlerRoute = async (req, res) => {
    const version = await createTableIfNotExists();
    res.json(version);
}


module.exports = { processCSVRoute, requestHandlerRoute }