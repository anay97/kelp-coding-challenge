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
        res.redirect('/report')
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error processing file' });
    }
}

const reportPageRoute = async (req, res) => {
    const totalCount = await fetchUserCount();

    // Fetching count of users for each age range
    let ageRange = {};
    ageRange['lessThan'] = 20;
    const result = [];
    let userDetails = await fetchUsersInRange(ageRange, true);
    let distr = 100 * userDetails[0].count / totalCount;
    result.push({
        "Age Group": "< 20",
        "% Distribution": distr
    })
    ageRange['lessThan'] = 41;
    ageRange['greaterThan'] = 19;
    userDetails = await fetchUsersInRange(ageRange, true);
    distr = 100 * userDetails[0].count / totalCount;
    result.push({
        "Age Group": "20 to 40",
        "% Distribution": distr
    })
    ageRange['lessThan'] = 61;
    ageRange['greaterThan'] = 39;
    userDetails = await fetchUsersInRange(ageRange, true);
    distr = 100 * userDetails[0].count / totalCount;
    result.push({
        "Age Group": "40 to 60",
        "% Distribution": distr
    })

    delete ageRange['lessThan'];
    ageRange['greaterThan'] = 60;
    userDetails = await fetchUsersInRange(ageRange, true);
    distr = 100 * userDetails[0].count / totalCount;
    result.push({
        "Age Group": ">60",
        "% Distribution": distr
    })
    // Display using console.table
    console.table(result);
    // Render the page for further calculations
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