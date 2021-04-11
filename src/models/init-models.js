var DataTypes = require("sequelize").DataTypes;
var _district = require("./district");
var _employee = require("./employee");
var _employeeGig = require("./employeeGig");
var _employeeLocation = require("./employeeLocation");
var _employeeProfession = require("./employeeProfession");
var _employer = require("./employer");
var _employerLocation = require("./employerLocation");
var _gig = require("./gig");
var _profession = require("./profession");
var _rating = require("./rating");
var _reviews = require("./reviews");

function initModels(sequelize) {
  var district = _district(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var employeeGig = _employeeGig(sequelize, DataTypes);
  var employeeLocation = _employeeLocation(sequelize, DataTypes);
  var employeeProfession = _employeeProfession(sequelize, DataTypes);
  var employer = _employer(sequelize, DataTypes);
  var employerLocation = _employerLocation(sequelize, DataTypes);
  var gig = _gig(sequelize, DataTypes);
  var profession = _profession(sequelize, DataTypes);
  var rating = _rating(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);

  employeeGig.belongsTo(reviews, { foreignKey: "reviewsId"});
  reviews.hasMany(employeeGig, { foreignKey: "reviewsId"});
  employeeGig.belongsTo(gig, { foreignKey: "gigId"});
  gig.hasMany(employeeGig, { foreignKey: "gigId"});
  employeeGig.belongsTo(employee, { foreignKey: "employeeId"});
  employee.hasMany(employeeGig, { foreignKey: "employeeId"});
  employeeLocation.belongsTo(district, { foreignKey: "districtId"});
  district.hasMany(employeeLocation, { foreignKey: "districtId"});
  employeeLocation.belongsTo(employee, { foreignKey: "employeeId"});
  employee.hasMany(employeeLocation, { foreignKey: "employeeId"});
  employeeProfession.belongsTo(profession, { foreignKey: "professionId"});
  employee.belongsToMany(profession, { through: employeeProfession, foreignKey: "employeeId", otherKey: "professionId" });
  profession.hasMany(employeeProfession, { foreignKey: "professionId"});
  employeeProfession.belongsTo(employee, { foreignKey: "employeeId"});
  profession.belongsToMany(employee, { through: employeeProfession, foreignKey: "professionId", otherKey: "employeeId" });
  employee.hasMany(employeeProfession, { foreignKey: "employeeId"});
  employerLocation.belongsTo(employer, { foreignKey: "employerId"});
  employer.hasMany(employerLocation, { foreignKey: "employerId"});
  employerLocation.belongsTo(district, { foreignKey: "districtId"});
  district.hasMany(employerLocation, { foreignKey: "districtId"});
  gig.belongsTo(employer, { foreignKey: "employerId"});
  employer.hasMany(gig, { foreignKey: "employerId"});
  reviews.belongsTo(rating, { foreignKey: "ratingId"});
  rating.hasMany(reviews, { foreignKey: "ratingId"});

  return {
    district,
    employee,
    employeeGig,
    employeeLocation,
    employeeProfession,
    employer,
    employerLocation,
    gig,
    profession,
    rating,
    reviews,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
