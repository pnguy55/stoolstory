const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
        googleId: String,
        email: String,
        firstName: String,
        lastName: String,
        pro: Boolean,
        // pro_date_start: 20201201,
        pro_date_start: Number,
        pro_date_end: Number,
        notifications_enabled: Boolean,
        owned_affiliated_prods: Boolean,
        meds_taken: Array,
        regular: Boolean,

}, {

  timestamps: true
});

mongoose.model('users', userSchema);

