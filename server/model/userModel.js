const mongoose = require ('mongoose');


let LocalUserSchema = new mongoose.Schema ({

	username: String,
	phoneNumber: Number,
	salt: String,
	hash: String,
	personalHabits: Object

});
let Users = mongoose.model('userauths',localUserSchema);



let FacebookUserSchema = new mongoose.Schema ({
	fbID: String, 
	email: {type : String, lowercase:true},
	phoneNumber: Number, 
	name: String,
	personalHabits: Object
});
let FbUsers = mongoose.model('fbs',FacebookUserSchema);



