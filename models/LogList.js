const mongoose = require('mongoose');
const { Schema } = mongoose;

const logListSchema = new Schema({

    logList: {
        _user: { 
            type: Schema.Types.ObjectId, ref: 'User' 
        },
        //consistency: 'one of 3 types',
        consistency: Number,
        //color:  'select from color list',
        color: String,
        // datetime: 'mmddyyyy',
        datetime: String,
        // time_on_toilet: '00:00:00',
        time_on_toilet: String,
        // time: '00:00:00',
        time: String,
        // time_since_last: '00:00:00',
        time_since_last: String,
        // pain_level: 'none or 1-10',
        pain_level: Number,
        // bloodiness: 'none or 1-5',
        bloodiness: Number,
        // note: "",
        note: String,
        business_analysis: {
            // stool_array: ['last 48 times on the loo'],
            stool_array: Array,
            // stool_average_freq: 'average_days_between'
            stool_average_freq: Number,
            // recommendations: ['recommended products'],
            recommdendations: Array,
        }
    }
    // title: {
    //     type: String,
    //     required: true
    // },
    // tags: {
    //     type: [String]
    // },

    // dateCreated: Date
});


mongoose.model('logLists', logListSchema);

