
module.exports = {
  hasProfession: async (parent, args, { models }) => {
    
    const {employeeProfession,profession } = models;
    let data = await employeeProfession.findAll({where:{employeeId:parent.id}, include: [profession] });
    return data.map(data => data.get('profession'));
  },
}





