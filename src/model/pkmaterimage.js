"use strict";

var mongoose = require("mongoose");
var ec = require("../lib/error_consts");
var moment= require("moment")
//console.log(cons.year);
var Schema = mongoose.Schema;

var pkDataSchema = new mongoose.Schema({
    name:{ type: String },
    age:{ type: String },
    city:{ type: String },
    pincode:{ type: String },
    gender:{ type: String },
    address:{ type: String },
    phone:{ type: String },
    email:{ type: String },
    image:{ type: String },
    remark:String,
    // video:{ type: String },
    date:String,
    utm_source: String,
    utm_medium: String,
    utm_campaign: String,
},
    { timestamps: true 
});
var pkimageModel = mongoose.model("pk-image", pkDataSchema);

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
    
            // const duplicateEmail = await pkimageModel.findOne({ email: params.email });
            // console.log("duplicateEmail", duplicateEmail);
            // if (duplicateEmail) {
            //     return cb(
            //       ec.appError({
            //         status: ec.EMAIL_EXISTS,
            //         message: "You have already submitted the form",
            //       })
            //     );
            // }

            // const duplicatePhone = await pkimageModel.findOne({ phone: params.phone });
            // if (duplicatePhone) {
            //     return cb(
            //       ec.appError({
            //         status: ec.PHONE_EXISTS,
            //         message: "You have already submitted the form",
            //       })
            //     );
            // }
        

        console.log("params", params);
        pkimageModel.create({
          name: params.name || '',
          age: params.age || '',
          city: params.city || '',
          pincode: params.pincode || '',
          gender: params.gender || '',
          address: params.address || '',
          phone: params.phone || '',
          email: params.email || '',
          image: params.image || '',
          remark: params.remark || '',
          date: params.date || '',
          utm_source: params.utm_source || '',
          utm_medium: params.utm_medium || '',
          utm_campaign: params.utm_campaign || '',
        }, function (err, result) {
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
        pkimageModel.find(function(err, result) {
          if (err) {
              console.log(err);
              return cb(ec.appError({
                  status: ec.DB_ERROR,
                  message: "DB Fetch Error"
              }));
          }
          return cb(err, result);
  
      });
      },  

      fetchAllPkDurgaToDate: function (params,cb) {
        const startDate = params.startDate;
        const endDate = params.endDate

        if(params.startDate){
          pkimageModel.find({date: { $gte: startDate,$lte: endDate}}, function(err, result) {
            if (err) {
                console.log(err);
                return cb(ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB Fetch Error"
                }));
            }
  
            console.log("fetch data", result);
  
            return cb(err, result);
    
        });
        }else{
          pkimageModel.find(function(err, result) {
            if (err) {
                console.log(err);
                return cb(ec.appError({
                    status: ec.DB_ERROR,
                    message: "DB Fetch Error"
                }));
            }
  
            console.log("fetch data", result);
  
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