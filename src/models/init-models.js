const DataTypes = require("sequelize").DataTypes;
const _accepted = require("./accepted");
const _chat = require("./chat");
const _district = require("./district");
const _employee = require("./employee");
const _employeeGig = require("./employeeGig");
const _employeeLocation = require("./employeeLocation");
const _employeeProfession = require("./employeeProfession");
const _employer = require("./employer");
const _employerLocation = require("./employerLocation");
const _gig = require("./gig");
const _notified = require("./notified");
const _profession = require("./profession");
const _rating = require("./rating");
const _reviews = require("./reviews");

function initModels(sequelize) {
  const accepted = _accepted(sequelize, DataTypes);
  const chat = _chat(sequelize, DataTypes);
  const district = _district(sequelize, DataTypes);
  const employee = _employee(sequelize, DataTypes);
  const employeeGig = _employeeGig(sequelize, DataTypes);
  const employeeLocation = _employeeLocation(sequelize, DataTypes);
  const employeeProfession = _employeeProfession(sequelize, DataTypes);
  const employer = _employer(sequelize, DataTypes);
  const employerLocation = _employerLocation(sequelize, DataTypes);
  const gig = _gig(sequelize, DataTypes);
  const notified = _notified(sequelize, DataTypes);
  const profession = _profession(sequelize, DataTypes);
  const rating = _rating(sequelize, DataTypes);
  const reviews = _reviews(sequelize, DataTypes);

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
