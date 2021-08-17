'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "district", deps: []
 * createTable "employee", deps: []
 * createTable "employeeLocation", deps: []
 * createTable "employer", deps: []
 * createTable "employerLocation", deps: []
 * createTable "profession", deps: []
 * createTable "rating", deps: []
 * createTable "gig", deps: [employer, profession]
 * createTable "chat", deps: [employee, employer]
 * createTable "accepted", deps: [employee, employer, gig]
 * createTable "employeeProfession", deps: [profession, employee]
 * createTable "reviews", deps: [rating]
 * createTable "notified", deps: [gig, employee]
 * createTable "employeeGig", deps: [reviews, gig, employee]
 * addIndex "PRIMARY" to table "accepted"
 * addIndex "FKaccepted19704" to table "accepted"
 * addIndex "FKaccepted7198" to table "accepted"
 * addIndex "FKaccepted69561" to table "accepted"
 * addIndex "PRIMARY" to table "chat"
 * addIndex "FKchat560094" to table "chat"
 * addIndex "FKchat572600" to table "chat"
 * addIndex "PRIMARY" to table "district"
 * addIndex "PRIMARY" to table "employee"
 * addIndex "email" to table "employee"
 * addIndex "PRIMARY" to table "employeeGig"
 * addIndex "FKemployeeGi894008" to table "employeeGig"
 * addIndex "FKemployeeGi524747" to table "employeeGig"
 * addIndex "FKemployeeGi396986" to table "employeeGig"
 * addIndex "PRIMARY" to table "employeeLocation"
 * addIndex "PRIMARY" to table "employeeProfession"
 * addIndex "FKemployeePr917718" to table "employeeProfession"
 * addIndex "FKemployeePr607259" to table "employeeProfession"
 * addIndex "PRIMARY" to table "employer"
 * addIndex "phone" to table "employer"
 * addIndex "email" to table "employer"
 * addIndex "PRIMARY" to table "employerLocation"
 * addIndex "PRIMARY" to table "gig"
 * addIndex "FKgig622562" to table "gig"
 * addIndex "FKgig79484" to table "gig"
 * addIndex "PRIMARY" to table "notified"
 * addIndex "FKnotified822795" to table "notified"
 * addIndex "FKnotified98938" to table "notified"
 * addIndex "PRIMARY" to table "profession"
 * addIndex "name" to table "profession"
 * addIndex "PRIMARY" to table "rating"
 * addIndex "PRIMARY" to table "reviews"
 * addIndex "FKreviews610743" to table "reviews"
 *
 **/

var info = {
    "revision": 1,
    "name": "mega-migration",
    "created": "2021-08-17T21:39:16.979Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "district",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "name": {
                        "type": Sequelize.STRING(30),
                        "field": "name",
                        "allowNull": true
                    },
                    "status": {
                        "type": Sequelize.INTEGER,
                        "field": "status",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "employee",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "fullName": {
                        "type": Sequelize.STRING(60),
                        "field": "fullName",
                        "allowNull": true
                    },
                    "bio": {
                        "type": Sequelize.TEXT,
                        "field": "bio",
                        "allowNull": true
                    },
                    "email": {
                        "type": Sequelize.STRING(50),
                        "field": "email",
                        "unique": {
                            "args": true,
                            "msg": "Oops. Looks like you already have an account with this email address. Please try to login.",
                            "fields": [{
                                "fn": "lower",
                                "args": [{
                                    "col": "email"
                                }]
                            }]
                        },
                        "allowNull": true
                    },
                    "phone": {
                        "type": Sequelize.STRING(15),
                        "field": "phone",
                        "allowNull": true
                    },
                    "password": {
                        "type": Sequelize.TEXT,
                        "field": "password",
                        "allowNull": true
                    },
                    "profileImagUri": {
                        "type": Sequelize.TEXT,
                        "field": "profileImagUri",
                        "allowNull": true
                    },
                    "documentImageUri": {
                        "type": Sequelize.TEXT,
                        "field": "documentImageUri",
                        "allowNull": true
                    },
                    "nationalIdImageUri": {
                        "type": Sequelize.TEXT,
                        "field": "nationalIdImageUri",
                        "allowNull": true
                    },
                    "status": {
                        "type": Sequelize.INTEGER,
                        "field": "status",
                        "defaultValue": 0,
                        "allowNull": true
                    },
                    "pushToken": {
                        "type": Sequelize.TEXT,
                        "field": "pushToken",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "employeeLocation",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "longitude": {
                        "type": Sequelize.DECIMAL(10, 6),
                        "field": "longitude",
                        "allowNull": true
                    },
                    "latitude": {
                        "type": Sequelize.DECIMAL(10, 6),
                        "field": "latitude",
                        "allowNull": true
                    },
                    "districtId": {
                        "type": Sequelize.INTEGER,
                        "field": "districtId",
                        "allowNull": false
                    },
                    "employeeId": {
                        "type": Sequelize.INTEGER,
                        "field": "employeeId",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "employer",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "fullName": {
                        "type": Sequelize.STRING(60),
                        "field": "fullName",
                        "allowNull": true
                    },
                    "companyName": {
                        "type": Sequelize.STRING(30),
                        "field": "companyName",
                        "allowNull": true
                    },
                    "email": {
                        "type": Sequelize.STRING(50),
                        "field": "email",
                        "unique": {
                            "args": true,
                            "msg": "Oops. Looks like you already have an account with this email address. Please try to login.",
                            "fields": [{
                                "fn": "lower",
                                "args": [{
                                    "col": "email"
                                }]
                            }]
                        },
                        "allowNull": true
                    },
                    "phone": {
                        "type": Sequelize.STRING(15),
                        "field": "phone",
                        "unique": "phone",
                        "allowNull": true
                    },
                    "password": {
                        "type": Sequelize.TEXT,
                        "field": "password",
                        "allowNull": true
                    },
                    "licenseImageUri": {
                        "type": Sequelize.TEXT,
                        "field": "licenseImageUri",
                        "allowNull": true
                    },
                    "profileImagUri": {
                        "type": Sequelize.TEXT,
                        "field": "profileImagUri",
                        "allowNull": true
                    },
                    "status": {
                        "type": Sequelize.INTEGER,
                        "field": "status",
                        "defaultValue": 0,
                        "allowNull": true
                    },
                    "pushToken": {
                        "type": Sequelize.TEXT,
                        "field": "pushToken",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "employerLocation",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "longitude": {
                        "type": Sequelize.DECIMAL(10, 6),
                        "field": "longitude",
                        "allowNull": true
                    },
                    "latitude": {
                        "type": Sequelize.DECIMAL(10, 6),
                        "field": "latitude",
                        "allowNull": true
                    },
                    "employerId": {
                        "type": Sequelize.INTEGER,
                        "field": "employerId",
                        "allowNull": false
                    },
                    "districtId": {
                        "type": Sequelize.INTEGER,
                        "field": "districtId",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "profession",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "name": {
                        "type": Sequelize.STRING(30),
                        "field": "name",
                        "unique": "name",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "rating",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "value": {
                        "type": Sequelize.INTEGER,
                        "field": "value",
                        "allowNull": true
                    },
                    "tag": {
                        "type": Sequelize.STRING(15),
                        "field": "tag",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "gig",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "name": {
                        "type": Sequelize.TEXT,
                        "field": "name",
                        "allowNull": true
                    },
                    "details": {
                        "type": Sequelize.TEXT,
                        "field": "details",
                        "allowNull": true
                    },
                    "paymentMethod": {
                        "type": Sequelize.INTEGER,
                        "field": "paymentMethod",
                        "defaultValue": 0,
                        "allowNull": true
                    },
                    "budget": {
                        "type": Sequelize.DECIMAL(10, 2),
                        "field": "budget",
                        "allowNull": true
                    },
                    "duration": {
                        "type": Sequelize.INTEGER,
                        "field": "duration",
                        "allowNull": true
                    },
                    "hourlyRate": {
                        "type": Sequelize.DECIMAL(7, 2),
                        "field": "hourlyRate",
                        "allowNull": true
                    },
                    "status": {
                        "type": Sequelize.INTEGER,
                        "field": "status",
                        "defaultValue": 0,
                        "allowNull": true
                    },
                    "employerId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "employerId",
                        "references": {
                            "model": "employer",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "professionId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "professionId",
                        "references": {
                            "model": "profession",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "neededBy": {
                        "type": Sequelize.DATE,
                        "field": "neededBy",
                        "allowNull": true
                    },
                    "hoursPerDay": {
                        "type": Sequelize.INTEGER,
                        "field": "hoursPerDay",
                        "allowNull": true
                    },
                    "days": {
                        "type": Sequelize.INTEGER,
                        "field": "days",
                        "allowNull": true
                    },
                    "location": {
                        "type": Sequelize.TEXT,
                        "field": "location",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "chat",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "content": {
                        "type": Sequelize.TEXT,
                        "field": "content",
                        "allowNull": true
                    },
                    "employeeId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "employeeId",
                        "references": {
                            "model": "employee",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "employerId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "employerId",
                        "references": {
                            "model": "employer",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "from": {
                        "type": Sequelize.INTEGER,
                        "field": "from",
                        "allowNull": true
                    },
                    "to": {
                        "type": Sequelize.INTEGER,
                        "field": "to",
                        "allowNull": true
                    },
                    "fullName": {
                        "type": Sequelize.STRING(60),
                        "field": "fullName",
                        "allowNull": true
                    },
                    "avatar": {
                        "type": Sequelize.TEXT,
                        "field": "avatar",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "accepted",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "pushToken": {
                        "type": Sequelize.TEXT,
                        "field": "pushToken",
                        "allowNull": true
                    },
                    "fullName": {
                        "type": Sequelize.STRING(60),
                        "field": "fullName",
                        "allowNull": true
                    },
                    "isRead": {
                        "type": Sequelize.INTEGER,
                        "field": "isRead",
                        "defaultValue": 0,
                        "allowNull": true
                    },
                    "hasAccepted": {
                        "type": Sequelize.INTEGER,
                        "field": "hasAccepted",
                        "defaultValue": 0,
                        "allowNull": true
                    },
                    "employeeId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "employeeId",
                        "references": {
                            "model": "employee",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "employerId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "employerId",
                        "references": {
                            "model": "employer",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "gigId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "gigId",
                        "references": {
                            "model": "gig",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "phone": {
                        "type": Sequelize.STRING(15),
                        "field": "phone",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "employeeProfession",
                {
                    "professionId": {
                        "type": Sequelize.INTEGER,
                        "unique": "employeeProfession_professionId_employeeId_unique",
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "professionId",
                        "references": {
                            "model": "profession",
                            "key": "id"
                        },
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "employeeId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "unique": "employeeProfession_professionId_employeeId_unique",
                        "field": "employeeId",
                        "references": {
                            "model": "employee",
                            "key": "id"
                        },
                        "primaryKey": true,
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "reviews",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "status": {
                        "type": Sequelize.INTEGER,
                        "field": "status",
                        "allowNull": true
                    },
                    "message": {
                        "type": Sequelize.TEXT,
                        "field": "message",
                        "allowNull": true
                    },
                    "ratingId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "ratingId",
                        "references": {
                            "model": "rating",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "notified",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "gigId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "gigId",
                        "references": {
                            "model": "gig",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "employeeId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "employeeId",
                        "references": {
                            "model": "employee",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "status": {
                        "type": Sequelize.INTEGER,
                        "field": "status",
                        "defaultValue": 0,
                        "allowNull": true
                    },
                    "pushToken": {
                        "type": Sequelize.TEXT,
                        "field": "pushToken",
                        "allowNull": true
                    },
                    "name": {
                        "type": Sequelize.TEXT,
                        "field": "name",
                        "allowNull": true
                    },
                    "details": {
                        "type": Sequelize.TEXT,
                        "field": "details",
                        "allowNull": true
                    },
                    "isRead": {
                        "type": Sequelize.INTEGER,
                        "field": "isRead",
                        "defaultValue": 0,
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "employeeGig",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "primaryKey": true,
                        "allowNull": false,
                        "autoIncrement": true
                    },
                    "imageUrl": {
                        "type": Sequelize.TEXT,
                        "field": "imageUrl",
                        "allowNull": true
                    },
                    "status": {
                        "type": Sequelize.INTEGER,
                        "field": "status",
                        "defaultValue": 0,
                        "allowNull": true
                    },
                    "likeCount": {
                        "type": Sequelize.INTEGER,
                        "field": "likeCount",
                        "allowNull": true
                    },
                    "isStarted": {
                        "type": Sequelize.INTEGER,
                        "field": "isStarted",
                        "defaultValue": 0,
                        "allowNull": false
                    },
                    "reviewsId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "field": "reviewsId",
                        "references": {
                            "model": "reviews",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "gigId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "gigId",
                        "references": {
                            "model": "gig",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "employeeId": {
                        "type": Sequelize.INTEGER,
                        "onUpdate": "CASCADE",
                        "onDelete": "NO ACTION",
                        "field": "employeeId",
                        "references": {
                            "model": "employee",
                            "key": "id"
                        },
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "accepted",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "accepted",
                [{
                    "name": "employeeId"
                }],
                {
                    "indexName": "FKaccepted19704",
                    "name": "FKaccepted19704",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "accepted",
                [{
                    "name": "employerId"
                }],
                {
                    "indexName": "FKaccepted7198",
                    "name": "FKaccepted7198",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "accepted",
                [{
                    "name": "gigId"
                }],
                {
                    "indexName": "FKaccepted69561",
                    "name": "FKaccepted69561",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "chat",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "chat",
                [{
                    "name": "employeeId"
                }],
                {
                    "indexName": "FKchat560094",
                    "name": "FKchat560094",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "chat",
                [{
                    "name": "employerId"
                }],
                {
                    "indexName": "FKchat572600",
                    "name": "FKchat572600",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "district",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employee",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employee",
                [{
                    "name": "email"
                }],
                {
                    "indexName": "email",
                    "name": "email",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employeeGig",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employeeGig",
                [{
                    "name": "reviewsId"
                }],
                {
                    "indexName": "FKemployeeGi894008",
                    "name": "FKemployeeGi894008",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employeeGig",
                [{
                    "name": "gigId"
                }],
                {
                    "indexName": "FKemployeeGi524747",
                    "name": "FKemployeeGi524747",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employeeGig",
                [{
                    "name": "employeeId"
                }],
                {
                    "indexName": "FKemployeeGi396986",
                    "name": "FKemployeeGi396986",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employeeLocation",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employeeProfession",
                [{
                    "name": "professionId"
                }, {
                    "name": "employeeId"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employeeProfession",
                [{
                    "name": "professionId"
                }],
                {
                    "indexName": "FKemployeePr917718",
                    "name": "FKemployeePr917718",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employeeProfession",
                [{
                    "name": "employeeId"
                }],
                {
                    "indexName": "FKemployeePr607259",
                    "name": "FKemployeePr607259",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employer",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
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
        },
        {
            fn: "addIndex",
            params: [
                "employer",
                [{
                    "name": "email"
                }],
                {
                    "indexName": "email",
                    "name": "email",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "employerLocation",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "gig",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "gig",
                [{
                    "name": "employerId"
                }],
                {
                    "indexName": "FKgig622562",
                    "name": "FKgig622562",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "gig",
                [{
                    "name": "professionId"
                }],
                {
                    "indexName": "FKgig79484",
                    "name": "FKgig79484",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "notified",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "notified",
                [{
                    "name": "gigId"
                }],
                {
                    "indexName": "FKnotified822795",
                    "name": "FKnotified822795",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "notified",
                [{
                    "name": "employeeId"
                }],
                {
                    "indexName": "FKnotified98938",
                    "name": "FKnotified98938",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "profession",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "profession",
                [{
                    "name": "name"
                }],
                {
                    "indexName": "name",
                    "name": "name",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "rating",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "reviews",
                [{
                    "name": "id"
                }],
                {
                    "indexName": "PRIMARY",
                    "name": "PRIMARY",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "reviews",
                [{
                    "name": "ratingId"
                }],
                {
                    "indexName": "FKreviews610743",
                    "name": "FKreviews610743",
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["accepted", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["chat", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["district", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["employee", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["employeeGig", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["employeeLocation", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["employeeProfession", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["employer", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["employerLocation", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["gig", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["notified", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["profession", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["rating", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["reviews", {
                transaction: transaction
            }]
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
