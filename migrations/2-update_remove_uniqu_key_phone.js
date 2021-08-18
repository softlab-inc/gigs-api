'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeIndex "phone" from table "employer"
 * changeColumn "phone" on table "employer"
 *
 **/

var info = {
    "revision": 2,
    "name": "update_remove_uniqu_key_phone",
    "created": "2021-08-18T05:13:39.529Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "removeIndex",
            params: [
                "employer",
                "phone",
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "employer",
                "phone",
                {
                    "type": Sequelize.STRING(15),
                    "field": "phone",
                    "allowNull": true
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "changeColumn",
            params: [
                "employer",
                "phone",
                {
                    "type": Sequelize.STRING(15),
                    "field": "phone",
                    "unique": "phone",
                    "allowNull": true
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employer",
                [{
                    "name": "phone"
                }],
                {
                    "indexName": "phone",
                    "name": "phone",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
