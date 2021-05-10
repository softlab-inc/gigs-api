
class GigService {

  constructor(models) {
    this.models = models;
  }

  async notifyAllJobSeekers({ professionId}){
    const { employeeProfession, notified, gig, employee } = this.models;

    const searchResults = await employeeProfession.findAll({ where: { professionId }, include: [employee]});

    if (searchResults.length === 0) {
      const allEmployees = await employee.findAll({ attributes: ['id'] ,raw:true});
      return allEmployees.map(data => ({employeeId:data.id}));
    } else {
      const employees = searchResults.map(data => ({employeeId:data.get('employee').id}));
      return employees;
    }

  }
  async notifyJobSeeker({ professionId, employeeId }){
    const {employeeProfession,notified,gig,employee} = this.models

    const searchResult = await employeeProfession.findAll({ where: { professionId, employeeId }, include: [employee] });
    
    const employeeData = searchResult.map(data => data.get('employee'));

    return employeeData.length;
    // if (data.id === user.id) {
      // return true;
    // } else if(){
    //   return true;
    // } 

    
  }
   
}


module.exports = GigService;