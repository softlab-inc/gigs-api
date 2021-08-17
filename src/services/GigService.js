const PRIORITY_HIGH = 1; // such notification are for some employees
const PRIORITY_LOW = 0; // such notification are for all employees
const EMPTY_LIST = 0;

class GigService {
  constructor(models) {
    this.models = models;
  }

  async notifyAllJobSeekers({ professionId, id }) {
    console.log({ professionId, id });

    const { employeeProfession, notified, employee, gig } = this.models;

    const searchResults = await employeeProfession.findAll({
      where: { professionId },
      include: [employee],
    });

    // Find gig details
    const gigResult = await gig.findOne({ where: { id } });
    const { name, details } = gigResult.dataValues;

    /**
     * if no employer is notified
     * notify all employers
     * else
     * notify only those that conform to the criteria
     */
    if (this.isNotifiable(searchResults)) {
      const employees = await this.notifyAllEmployees(
        employee,
        id,
        name,
        details
      );
      await notified.bulkCreate(employees);
      return employees;
    } else {
      const employees = this.notifySomeEmployees(
        searchResults,
        id,
        name,
        details
      );
      await notified.bulkCreate(employees);
      return employees;
    }
  }

  isNotifiable(searchResults) {
    return searchResults.length === EMPTY_LIST;
  }

  notifySomeEmployees(searchResults, id, name, details) {
    const employees = searchResults.map((data) => ({
      employeeId: data.get("employee").id,
      gigId: id,
      status: PRIORITY_HIGH,
      pushToken: data.get("employee").pushToken,
      name,
      details,
    }));
    return employees;
  }

  async notifyAllEmployees(employee, id, name, details) {
    const employees = await employee.findAll({
      attributes: ["id", "pushToken"],
      raw: true,
    });
    const allEmployees = employees.map((data) => ({
      employeeId: data.id,
      gigId: id,
      status: PRIORITY_LOW,
      pushToken: data.pushToken,
      name,
      details,
    }));
    return allEmployees;
  }

  async notifyJobSeeker({ professionId, employeeId }) {
    const { employeeProfession, employee } = this.models;

    const searchResult = await employeeProfession.findAll({
      where: { professionId, employeeId },
      include: [employee],
    });

    const employeeData = searchResult.map((data) => data.get("employee"));

    return employeeData.length && true;
  }
}

module.exports = GigService;
