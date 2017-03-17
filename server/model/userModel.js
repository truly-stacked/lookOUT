const mongoose = require ('mongoose');


let LocalUserSchema = new mongoose.Schema ({

	username: String,
	salt: String,
	hash: String,
	personalHabits: Object

});
let Users = mongoose.model('userauths',localUserSchema);



let FacebookUserSchema = new mongoose.Schema ({
	fbID: String, 
	email: {type : String, lowercase:true},
	name: String,
	personalHabits: Object
});
let FbUsers = mongoose.model('fbs',FacebookUserSchema);



