const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    // usercode: {
    //     type: String,
    //     required: true,
    // },
    contactEmails : {
        type : [String],
        default : []
    },
    heartRate : {
        type : [{
            val : {
                type : Number,
            },
            timeStamp : {
                date : {
                    day : {
                        type : Number
                    },
                    month : {
                        type : Number
                    },
                    year :{
                        type : Number
                    }
                },
                time :{
                    hours : {
                        type : Number
                    },
                    minutes : {
                        type : Number
                    }
                }
            },
            remark : {
                type : String,
            }
        }],
        default : [],
    },
    ecg : {
        type : [{
            val : {
                type : Number,
            },
            timeStamp : {
                date : {
                    day : {
                        type : Number
                    },
                    month : {
                        type : Number
                    },
                    year :{
                        type : Number
                    }
                },
                time :{
                    hours : {
                        type : Number
                    },
                    minutes : {
                        type : Number
                    }
                }
            },
            remark : {
                type : String,
            }
        }],
        default : [],
    },
    temperature : {
        type : [{
            val : {
                type : Number,
            },
            timeStamp : {
                date : {
                    day : {
                        type : Number
                    },
                    month : {
                        type : Number
                    },
                    year :{
                        type : Number
                    }
                },
                time :{
                    hours : {
                        type : Number
                    },
                    minutes : {
                        type : Number
                    }
                }
            },
            remark : {
                type : String,
            }
        }],
    },
    oxygenLevel : {
        type : [{
            val : {
                type : Number,
            },
            timeStamp : {
                date : {
                    day : {
                        type : Number
                    },
                    month : {
                        type : Number
                    },
                    year :{
                        type : Number
                    }
                },
                time :{
                    hours : {
                        type : Number
                    },
                    minutes : {
                        type : Number
                    }
                }
            },
            remark : {
                type : String,
            }
        }],
    },    

},{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
