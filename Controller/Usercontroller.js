const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../Model/User')

// Create a new user

const Register = async(req, res)=> {
   
    const {name, email, password}= req.body

    if(!name || !email || !password) {
        res.json('Please Fill input completely')
    }
     // if user already exist
    const userexist =  await User.findOne({email: email})
    if (userexist) {
        res.status(400).json('Email used already')
    }

    // hasspassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user 
    const user = await User.create({
        email: email,
        name: name,
        password: hashedPassword,
        token: generateToken(User._id)
    })

    if(user) {
        res.json(user)
    } else {
        res.json('user not created')
    }
}


// login a user

const Login = async(req, res)=> {
    if (!req.body.email || !req.body.password) {
        res.status(400).json('Please fill input completely')
    }

    const useremail = await User.findOne({email: req.body.email})
    if (!useremail) {
        res.json('This email has not been registered')
    }
    
    const userpass = await bcrypt.compare(req.body.password, useremail.password)
   
    if (useremail && userpass) {
        // res.json( `${useremail.name} is logged in`)
        res.json({
            name: useremail.name,
            email: useremail.email,
            password: useremail.password,
            token: generateToken(useremail._id),
        })
    } else {
        res.json(`incorret password`)
    }
    // res.json("user logged in")
}

// get user

const Getuser = async(req, res)=> {
    const mainuser = await User.findById(req.user.id)
    res.json(mainuser)
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d'})
}
module.exports= {
    Register, Login, Getuser
}