
class GigService {

  constructor(models) {
    this.models = models;
  }

  async notifyJobSeekers({ professionId, user }){
    const {employeeProfession,notified,gig,employee} = this.models
    console.log({ professionId, user })
    const result  = await employeeProfession.findOne({where:{professionId},include:[employee]})
    console.log({ result });
    return true;
  }
   
}


module.exports = GigService;