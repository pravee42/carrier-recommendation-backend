const { getDB } = require("../config/db");

const getJobCollection = () => getDB().collection("jobs");

module.exports = getJobCollection;
