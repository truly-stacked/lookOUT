const mongoose = require ('mongoose');
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema({

<<<<<<< HEAD
	username: String,
	phoneNumber: Number,
	salt: String,
	hash: String,
	personalHabits: Object
=======
	name: {
		type: String,
		unique: true,
		required: true
	},

	password: {
		type: String,
		required: true
	},

	first: {
		type: String,
		unique: true,
		required: true
	},

	last: {
		type: String,
		unique: true,
		required: true
	},

	personalTracking : {Object}
>>>>>>> pass

});


//hashing and comparing  methods
//Saves the user. Because we dont want to store real
//passwords, we will salt and hash it and save that as the password
UserSchema.pre('save', function(next){
	var user = this;

<<<<<<< HEAD
let FacebookUserSchema = new mongoose.Schema ({
	fbID: String, 
	email: {type : String, lowercase:true},
	phoneNumber: Number, 
	name: String,
	personalHabits: Object
=======
	if(this.isModified('password') || this.isNew){
		bcrypt.genSalt(10, function(err, salt){
			if(err){
				return next(err);
			}
			bcrypt.hash(user.password, salt, function(err,hash){
				if(err){
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else{
		return next();
	}
>>>>>>> pass
});

//Method to makea comparison.

UserSchema.methods.comparePassword = function(pass, cb){
	bcrypt.compare(pass, this.password, function(err, match){
		if (err){
			return cb(err);
		}
		cb(null, match);
	});
};



module.exports = mongoose.model('User', UserSchema);
