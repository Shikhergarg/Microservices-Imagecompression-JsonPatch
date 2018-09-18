var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
	name:{	type:String, required:true },
	email:{
				type:String,
				required:true,
				unique:true,
				match:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/		  
	},
	password:{
				 type:String,
				 required:true    
	}
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');