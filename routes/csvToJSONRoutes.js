const { convertCSVToJSON } = require('../services/fileService');
const { requestHandler, createTableIfNotExists, createData } = require('../services/db');

const processCSVRoute = async (req, res) => {
    try {
        const jsonData = await convertCSVToJSON();
        console.log(typeof jsonData);

        const userData = convertJSONToUserDataObject(jsonData[0]);
        res.status(200).json({ success: true, data: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error processing file' + error });
    }
}

const requestHandlerRoute = async (req, res) => {
    const version = await createTableIfNotExists();
    res.json(version);
}

const convertJSONToUserDataObject = (jsonData) => {
    const userData = {}
    userData['name'] = jsonData['name']['firstName'] + ' ' + jsonData['name']['lastName'];
    userData['age'] = jsonData['age'];
    userData['address'] = jsonData['address'];
    delete jsonData['name'];
    delete jsonData['age'];
    delete jsonData['address'];
    userData['additional_info'] = jsonData;
    return userData;
}

module.exports = { processCSVRoute, requestHandlerRoute }