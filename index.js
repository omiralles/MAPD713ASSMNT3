'use strict'

/*
@Autors
Name: Oscar Miralles
Student ID: 301250756
Name: Carlos Hernandez
Student ID: 301290263
*/

//Program requeriments
var seneca = require('seneca')()
const entities = require('seneca-entity');
const mongo_store = require('seneca-mongo-store');
const web = require("seneca-web");


//Pluguins declarations
var express = require('express');
  var app = express();
  var config = {
    routes:[{
        prefix : '/users',
        pin: "area:users,action:*",
        map:{
            login: {GET: true},
            list_user: {name:'', GET: true, suffix: '/:id'},
            list_users: {name: '', GET: true},
            create_user: {name: '', POST: true},
            delete_user: {name: '', DELETE:true, suffix: '/:id'},
            change_password: {PUT: true},
            modify_user: {name: '', PUT: true}
        }
    },
    {
        prefix : '/residents',
        pin: "area:residents,action:*",
        map:{
            create_resident: {name: '', POST: true},
            list_resident: {name: '', GET: true, suffix: '/:user_id'},
            list_residents: {name: '', GET: true},
            modify_resident: {name: '', PUT: true},
            delete_resident: {name: '', DELETE: true, suffix: '/:id'}
        }
    },
    {
      prefix : '/services',
      pin: "area:services,action:*",
      map:{
          create_service: {name: '', POST: true},
          list_service: {name: '', GET: true, suffix: '/:id'},
          list_services: {name: '', GET: true},
          modify_service: {name: '', PUT: true},
          delete_service: {name: '', DELETE: true, suffix: '/:id'}
      }
  },
    {
        prefix : '/residentRecords',
        pin: "area:residentRecords,action:*",
        map:{
            create_record: {name: '', POST: true},
            list_record: {name: '', GET: true, suffix: '/:id'},
            list_records: {name: '', GET: true},
            modify_record: {name: '', PUT: true},
            delete_record: {name: '', DELETE: true, suffix: '/:id'}
        }
    }],
    adapter: require('seneca-web-adapter-express'),
    options: {parseBody: false},
    context: app
};

app.use( require("body-parser").json() );

//Import pluguins and create service
seneca
  .use(entities)
  .use('./loginMngt.js')
  .use('./residentsMngt.js')
  .use('./residentRecordsMngt.js')
  .use('./servicesMngt.js')
  .use(web, config)
  .use(mongo_store, {
    uri: 'mongodb://127.0.0.1:27017/clinicDB'
  })
  .ready(() => {
    var server = seneca.export('web/context')()

    server.listen('3000', () => {
      console.log('server started on: 3000')
    })
    console.log("Server listening on: //localhost:"+3000);
    console.log("--- Actions -----------");
    console.log("http://localhost:3000/users/login?user=username&password=password");
    console.log("http://localhost:3000/users/<userid>");
    console.log("http://localhost:3000/users/");
    console.log("http://localhost:3000/users/user=username&password=password&profile=profile");
    console.log("http://localhost:3000/users/<userid>");
    console.log("http://localhost:3000/residents/");
    console.log("http://localhost:3000/residents/<user_id>");
    console.log("http://localhost:3000/residents/sin=sinnumber&completename=complitename&age=age&address=address&servicetype=servicetype&day=day&hour=hour");
    console.log("http://localhost:3000/residents/<id>");
    console.log("http://localhost:3000/residents/<id>");
  })