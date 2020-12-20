const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    email: {
        googleId: String,
        email: String,
        firstName: String,
        lastName: String,
        yes: Boolean,
        no: Boolean,
        notifications_enabled: Boolean,
        owned_affiliated_prods: Boolean,
        meds_taken: Array,
        regular: Boolean,
      }



});



mongoose.model('users', userSchema);

