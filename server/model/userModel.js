const mongoose = require ('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
	bcrypt = require('bcryptjs');


module.exports.User = mongoose.model('users', new Schema({
	id: ObjectId,
	username: {type: String, unique: true, required: true },
	password: {type: String, required: true },
}));

module.exports.createUser = function (newUser, callback){
	bcrypt.genSalt(10, function (err, salt){
		bcrypt.hash(newUser.password, salt, function (err, hash){
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};


//
// //hashing and comparing  methods
// //Saves the user. Because we dont want to store real
// //passwords, we will salt and hash it and save that as the password
// UserSchema.pre('save', function(next){
// 	var user = this;
//
// 	if(this.isModified('password') || this.isNew){
// 		bcrypt.genSalt(10, function(err, salt){
// 			if(err){
// 				return next(err);
// 			}
// 			bcrypt.hash(user.password, salt, function(err,hash){
// 				if(err){
// 					return next(err);
// 				}
// 				user.password = hash;
// 				next();
// 			});
// 		});
// 	} else{
// 		return next();
// 	}
// });
//
// //Method to makea comparison.
//
// UserSchema.methods.comparePassword = function(pass, cb){
// 	bcrypt.compare(pass, this.password, function(err, match){
// 		if (err){
// 			return cb(err);
// 		}
// 		cb(null, match);
// 	});
// };
//
//
//


