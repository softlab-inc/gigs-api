var DataTypes = require("sequelize").DataTypes;
var _accepted = require("./accepted");
var _chat = require("./chat");
var _district = require("./district");
var _employee = require("./employee");
var _employeeGig = require("./employeeGig");
var _employeeLocation = require("./employeeLocation");
var _employeeProfession = require("./employeeProfession");
var _employer = require("./employer");
var _employerLocation = require("./employerLocation");
var _gig = require("./gig");
var _notified = require("./notified");
var _profession = require("./profession");
var _rating = require("./rating");
var _reviews = require("./reviews");

function initModels(sequelize) {
  var accepted = _accepted(sequelize, DataTypes);
  var chat = _chat(sequelize, DataTypes);
  var district = _district(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var employeeGig = _employeeGig(sequelize, DataTypes);
  var employeeLocation = _employeeLocation(sequelize, DataTypes);
  var employeeProfession = _employeeProfession(sequelize, DataTypes);
  var employer = _employer(sequelize, DataTypes);
  var employerLocation = _employerLocation(sequelize, DataTypes);
  var gig = _gig(sequelize, DataTypes);
  var notified = _notified(sequelize, DataTypes);
  var profession = _profession(sequelize, DataTypes);
  var rating = _rating(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);

  accepted.belongsTo(employee, { foreignKey: "employeeId"});
  employee.hasMany(accepted, { foreignKey: "employeeId"});
  accepted.belongsTo(employer, { foreignKey: "employerId"});
  employer.hasMany(accepted, { foreignKey: "employerId"});
  accepted.belongsTo(gig, { foreignKey: "gigId"});
  gig.hasMany(accepted, { foreignKey: "gigId"});
  chat.belongsTo(employee, { foreignKey: "employeeId"});
  employee.hasMany(chat, { foreignKey: "employeeId"});
  chat.belongsTo(employer, { foreignKey: "employerId"});
  employer.hasMany(chat, { foreignKey: "employerId"});
  employeeGig.belongsTo(reviews, { foreignKey: "reviewsId"});
  reviews.hasMany(employeeGig, { foreignKey: "reviewsId"});
  employeeGig.belongsTo(gig, { foreignKey: "gigId"});
  gig.hasMany(employeeGig, { foreignKey: "gigId"});
  employeeGig.belongsTo(employee, { foreignKey: "employeeId"});
  employee.hasMany(employeeGig, { foreignKey: "employeeId"});
  employeeProfession.belongsTo(profession, { foreignKey: "professionId"});
  employee.belongsToMany(profession, { through: employeeProfession, foreignKey: "employeeId", otherKey: "professionId" });
  profession.hasMany(employeeProfession, { foreignKey: "professionId"});
  employeeProfession.belongsTo(employee, { foreignKey: "employeeId"});
  profession.belongsToMany(employee, { through: employeeProfession, foreignKey: "professionId", otherKey: "employeeId" });
  employee.hasMany(employeeProfession, { foreignKey: "employeeId"});
  gig.belongsTo(employer, { foreignKey: "employerId"});
  employer.hasMany(gig, { foreignKey: "employerId"});
  gig.belongsTo(profession, { foreignKey: "professionId"});
  profession.hasMany(gig, { foreignKey: "professionId"});
  notified.belongsTo(gig, { foreignKey: "gigId"});
  gig.hasMany(notified, { foreignKey: "gigId"});
  notified.belongsTo(employee, { foreignKey: "employeeId"});
  employee.hasMany(notified, { foreignKey: "employeeId"});
  reviews.belongsTo(rating, { foreignKey: "ratingId"});
  rating.hasMany(reviews, { foreignKey: "ratingId"});

  return {
    accepted,
    chat,
    district,
    employee,
    employeeGig,
    employeeLocation,
    employeeProfession,
    employer,
    employerLocation,
    gig,
    notified,
    profession,
    rating,
    reviews,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
