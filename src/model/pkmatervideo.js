"use strict";

var mongoose = require("mongoose");
var ec = require("../lib/error_consts");
//console.log(cons.year);
var Schema = mongoose.Schema;
var moment = require("moment")

var pkDataSchema = new mongoose.Schema({
    name:{ type: String },
    age:{ type: String },
    city:{ type: String },
    pincode:{ type: String },
    gender:{ type: String },
    address:{ type: String },
    phone:{ type: String },
    email:{ type: String },
    remark:String,
    // image:{ type: String },
    video:{ type: String },
    date: String,
    utm_source: String,
    utm_medium: String,
    utm_campaign: String,
},
    { timestamps: true 
});
var pkreelsModel = mongoose.model("pk-video", pkDataSchema);

var pkmaster = {

    create:async function (params, cb) {
        if (!params) {
          return cb(
            ec.appError({
              status: ec.INVALID_PARAM,
              message: "No data provided",
            })
          );
        }
           

        pkreelsModel.create(params, function (err, result) {
          if (err) {
            console.log(err);
            return cb(
              ec.appError({
                status: ec.DB_ERROR,
                message: "DB Fetch Error",
              })
            );
          }
          console.log("result", result);
    
          return cb(err, result);
        });
      
      },

      fetchAll: function (cb) {
        pkreelsModel.find(function(err, result) {
          if (err) {
              console.log(err);
              return cb(ec.appError({
                  status: ec.DB_ERROR,
                  message: "DB Fetch Error"
              }));
          }

          // console.log("result reels", result);
          return cb(err, result);
  
      });
      },  


      fetchAllPkDurgaexport: function (params, cb) {
        const startDate =params.startDate
        const endDate =params.endDate
        console.log(startDate,endDate);
        if(params.startDate){
          pkreelsModel.find({date: { $gte: startDate,$lte: endDate}},function(err, result) {
            if (err) {
                console.log(err);
                return cb(ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB Fetch Error"
                }));
            }

            console.log("result", result);
            return cb(err, result);
    
        });
        }else{

          pkreelsModel.find(function(err, result) {
            if (err) {
                console.log(err);
                return cb(ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB Fetch Error"
                }));
            }
            return cb(err, result);
    
        });
        }
       
      }, 
    //   fetchById: function(params, cb) {

    //     if(params){
          
    //     }
    //     pkmasterModel.findone(id, function(err, result) {
    //        if (err) {
    //             return cb(err);
    //         }
    //         return cb(err, result);
    //     });
    // },


    }

    module.exports=pkmaster;