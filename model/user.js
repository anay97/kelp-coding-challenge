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