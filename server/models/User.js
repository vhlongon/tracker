const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// runs before trying to actually save the new user
// we need to use a normal function because the user itself is `this` in this call context
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(10, (saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      user.password = hash;
      return next();
    });
  });
});

// here a new method is created for the User model so we use promise instead
// of the callback approach provided by bcrypt
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
      if (error) {
        return reject(error);
      }
      if (!isMatch) {
        return reject(new Error('Passwords do not match'));
      }

      // if there is no error and the incoming password and the one salved in the db do match
      // we resolve the promise

      return resolve(true);
    });
  });
};
mongoose.model('User', userSchema);
