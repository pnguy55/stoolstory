const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
        googleId: String,
        email: String,
        firstName: String,
        lastName: String,
        owned_affiliated_prods: Boolean,
        meds_taken: Array,
        regular: Boolean,

}, {

  timestamps: true
});

mongoose.model('users', userSchema);

