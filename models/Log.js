const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
        _user: { 
            type: Schema.Types.ObjectId, ref: 'User' 
        },
        //consistency: 'one of 3 types',
        stool_type: Number,
        form_type: Number,
        //color:  'select from color list',
        color: String,
        // datetime: 'mmddyyyy',
        log_date_time: String,
        log_date: String,
        // time_on_toilet: '00:00:00',
        time_on_toilet: String,
        // time: '00:00:00',
        log_time: String,
        // time_since_last: '00:00:00',
        time_since_last: Date,
        // pain_level: 'none or 1-10',
        pain_lvl: Number,
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
            recommendations: Array,
        }
    }, {

    timestamps: true
});


mongoose.model('logs', LogSchema);

