const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person schema
const personSchema = new mongoose.Schema({
    email:{
        type: String
    },
    password: {
        type: String
    },
    confirmpassword: { 
        type: String
    }
});
personSchema.pre('save', async function(next) {
    const person = this;
    console.log(person.password);
    console.log(person.confirmpassword);
    if (person.confirmpassword !== person.password) {
      return next(new Error('Passwords do not match'));
    }
  
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(person.password, salt);
      person.password = hashedPassword;
      next();
    } catch (err) {
      return next(err);
    }
  });
  
//   personSchema.methods.comparePassword = async function(candidatePassword) {
//     try {
//       const isMatch = await bcrypt.compare(candidatePassword, this.password);
//       return isMatch;
//     } catch (err) {
//       throw err;
//     }
//   };
  
  // Create Person model
  const Person = mongoose.model('Users', personSchema);
  module.exports = Person;