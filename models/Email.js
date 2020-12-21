const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,    
    email_notifications: Boolean,
});



mongoose.model('emails', emailSchema);

