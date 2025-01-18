const { convertCSVToJSON } = require('../services/fileService');
const { createUser, fetchAllUsers, fetchUsersInRange, fetchUserCount } = require('../services/db');
const { convertJSONToUserDataObject } = require('../model/user');

const processCSVRoute = async (req, res) => {
    try {
        const jsonData = await convertCSVToJSON();
        const userData = []
        jsonData.forEach(user => {
            userData.push(convertJSONToUserDataObject(user));
        });
        await createUser(userData);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error processing file' });
    }
}

const reportPageRoute = async (req, res) => {
    res.render('report');
}

const reportRoute = async (req, res) => {
    const ageRange = {}
    if (req.body.lessThan) {
        ageRange['lessThan'] = req.body.lessThan;
    }
    if (req.body.greaterThan) {
        ageRange['greaterThan'] = req.body.greaterThan;
    }
    if (req.body.equalTo) {
        ageRange['equalTo'] = req.body.equalTo;
    }
    let isEfficient = false;
    if (req.body.efficient) {
        isEfficient = true;
    }
    try {
        const users = await fetchUsersInRange(ageRange, isEfficient);
        const totalCount = await fetchUserCount();
        res.status(200).json({ success: true, data: users, totalCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error generating report' });
    }
}
module.exports = { processCSVRoute, reportRoute, reportPageRoute }