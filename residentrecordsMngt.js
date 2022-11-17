'use strict'

const { arrayify } = require("seneca-entity/lib/common");

//Pluguin to manage resident records
//TO DO - manage exeptions - Delete all records
var plugin = function(options) {
    var seneca = this;
    //Modify a resident record
    seneca.add("area:residentRecords,action:modify_record", function(msg, done){
        console.log("-->modify_record: " + msg.args.query.id);
        var residentRecords = this.make("residentRecords");
        residentRecords.list$({ id: msg.args.query.id }, function (err, result) {
            console.log("-->-->: residentRecord.list$ sin:" + msg.args.query.id);
            console.log("-->-->: residentRecord.data$");
            console.log("-->-->: result[0]: " + result[0].id);
            // TODO: if not found, return error
            var record = result[0]; // first element
            record.data$(
                {
                    user_id: msg.args.query.user_id,
                    day: msg.args.query.day,
                    blood_presure: msg.args.query.blood_presure,
                    respiration_rate: msg.args.query.respiration_rate,
                    blood_oxygen: msg.args.query.blood_oxygen,
                    heart_beat: msg.args.query.heart_beat,
                }
            );
            console.log("-->-->: record.save$");
            record.save$(function (err, result) {
                console.log("-->-->-->: record.data$, service: " + record);
                done(err, result.data$(false));
            });
        }); 
    });

    //List a unique record
    seneca.add("area:residentRecords,action:list_record", function(msg, done){
        console.log("-->list_record: " + msg.args.params.id);
        var residentRecords = this.make("residentRecords");
        residentRecords.list$({ id:msg.args.params.id }, done);
    });

    //List all resident records
    seneca.add("area:residentRecords,action:list_records", function(msg, done){
        console.log("-->list_records");
        var residentRecords = this.make("residentRecords");
        residentRecords.list$({user_id:msg.args.query.user_id}, done);
    });

    //Create a new resident record
    seneca.add("area:residentRecords,action:create_record", function(msg, done) {
        console.log("-->create_record, user_id: "+ msg.args.query.user_id);
       
        var residentRecords = this.make("residentRecords");
        residentRecords.user_id = msg.args.query.user_id;
        residentRecords.day = msg.args.query.day;
        residentRecords.blood_presure = msg.args.query.blood_presure;
        residentRecords.respiration_rate = msg.args.query.respiration_rate;
        residentRecords.blood_oxygen = msg.args.query.blood_oxygen;
        residentRecords.heart_beat = msg.args.query.heart_beat;
        
        residentRecords.save$(function(err, residentRecords) {
            done(err, residentRecords.data$(false));
        })
    });

    //Delete a resident record
    seneca.add("area: residentRecords,action:delete_record", function(msg, done) {
        console.log("-->delete_record, residentid: " + msg.args.params.id );
        var residentRecords = this.make("residentRecords");
        residentRecords.remove$(msg.args.params.id, function(err) {
            done(err, null);
        });
    });
}
module.exports = plugin;