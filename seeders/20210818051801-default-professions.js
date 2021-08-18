'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
      await queryInterface.bulkInsert('profession',[
{name:"Accounting"},
{name:"Administration"},
{name:"Acting "},
{name:"Aviation"},
{name:"Aeronautics"},
{name:"Back-End Developer"},
{name:"Branding"},
{name:"Carpenter"},
{name:"Chef"},
{name:"Copyright "},
{name:"Customer Service "},
{name:"Decorator "},
{name:"Executive Assistant"},
{name:"Event organizer"},
{name:"Financial Analyst"},
{name:"Front-End Developer"},
{name:"Full-Stack Engineer"},
{name:"Graphic Designer"},
{name:"Marketing "},
{name:"Musician "},
{name:"Office Management"},
{name:"Product Manager"},
{name:"Project Manager"},
{name:"Proposal Writing "},
{name:"Photography"},
{name:"Public speaking"},
{name:"Salesperson"},
{name:"Teaching "},
{name:"Training"},
{name:"Web Developer"},
{name:"Other "},
], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};




