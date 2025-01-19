/**
 * This file can also contain models that define what UserData object
 * contains based on data types of its key-value pairs
 */

/**
 * Converts JSON Data to UserData object for storing in DB
 * @param {*} jsonData 
 * @returns UserData object
 */
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
module.exports = { convertJSONToUserDataObject }