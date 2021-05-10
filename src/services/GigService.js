const PRIORITY_HIGH = 1; //such notification are for all users
const PRIORITY_LOW = 0; //such notification are for qualified players
const EMPTY_LIST = 0;

class GigService {

  constructor(models) {
    this.models = models;
  }

  async notifyAllJobSeekers({ professionId,id}){
    const { employeeProfession, notified, gig, employee } = this.models;

    const searchResults = await employeeProfession.findAll({ where: { professionId }, include: [employee]});

    /**
     * if no employer is notified
     * notify all employers 
     * else 
     * notify only those that conform t the criteria
     */
    if (this.isNotifiable(searchResults)) {
      return await this.notifyAllEmployers(employee, id);
    } else {
      return this.notifySomeEmployers(searchResults, id);
    }

  }



  isNotifiable(searchResults) {
    return searchResults.length === EMPTY_LIST;
  }

  notifySomeEmployers(searchResults, id) {
    const employees = searchResults.map(data => ({ employeeId: data.get('employee').id, gigId: id, status: PRIORITY_HIGH }));
    return employees;
  }

  async notifyAllEmployers(employee, id) {
    const allEmployees = await employee.findAll({ attributes: ['id'], raw: true });
    return allEmployees.map(data => ({ employeeId: data.id, gigId: id, status: PRIORITY_LOW }));
  }

  async notifyJobSeeker({ professionId, employeeId }){
    const {employeeProfession,notified,employee} = this.models

    const searchResult = await employeeProfession.findAll({ where: { professionId, employeeId }, include: [employee] });
    
    const employeeData = searchResult.map(data => data.get('employee'));

    return employeeData.length;
  }
   
}


module.exports = GigService;