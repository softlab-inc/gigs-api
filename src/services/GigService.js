
class GigService {

  constructor(models) {
    this.models = models;
  }

  async notifyAllJobSeekers({ professionId}){
    const { employeeProfession, notified, gig, employee } = this.models;
    console.log({ professionId });
    const searchResults = await employeeProfession.findAll({ where: { professionId }, include: [employee] });
    const employees = searchResults.map(data => data.get('employee'));
    console.log('Notify all Jobs-Seekers');
    console.log({ employees });
    console.log('Result length=> ',employees.length);
    return employees;
    // if (data.id === user.id) {
      // return true;
    // } else if(){
    //   return true;
    // } 

    
  }
  async notifyJobSeeker({ professionId, user }){
    const {employeeProfession,notified,gig,employee} = this.models
    console.log({ professionId, user })
    const searchResult = await employeeProfession.findAll({ where: { professionId,employeeId:user.id }, include: [employee] });
    const employeeData = searchResult.map(data => data.get('employee'));
    console.log('Result  => ', searchResult);
    console.log(searchResult.length);
    return employeeData;
    // if (data.id === user.id) {
      // return true;
    // } else if(){
    //   return true;
    // } 

    
  }
   
}


module.exports = GigService;