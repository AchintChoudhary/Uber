const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const captainSchema=new mongoose.Schema({
 fullname: {
    firstname: {
      type: String,
      required: true,
      minlength:[3,'Firstname must be  at least 3 characters long']
    },
    lastname: {
      type: String,
      minlength:[3,'Firstname must be  at least 3 characters long']
    }
    },
      email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
     minlength:[5,'Firstname must be  at least 5 characters long']
  },
    password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },

  status:{
    type:String,
    enum:['active', 'inactive'],
    default:'active'
  },

  vehicle:{
    color:{
        type:String,
        minlength:[3,'color must be  at least 3 characters long'],
        required:true
    },
    plate:{
         type: String,
        required:true,
        minlength:[4,'Plate must be  at least 1 characters long']
    },

    capacity:{
        type:Number,
        required:true,
        minlength:[1,'capacity must be  at least 1 characters long']
    },
    vehicleType:{
        type:String,
        required:true,
        enum:['car','motorcycle','auto']
    }
  },

  location:{
latitude:{
type:Number
},
longitude:{
type:Number
}
  }
}
)



// Generates a JWT token for the user
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
  return token;
};

// Compares provided password with stored hashed password
    // Authentication (checking passwords)
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Hashes a password (available on the User model itself, not instances)
    // Password storage preparation
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel=mongoose.model('captain',captainSchema)

module.exports=captainModel;









































































