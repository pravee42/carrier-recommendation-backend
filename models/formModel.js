const { getDB } = require("../config/db");

const getFormCollection = () => getDB().collection("userForm");

module.exports = getFormCollection;
