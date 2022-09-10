const bxureSchema = require('../Model/Xuremodel')
const User = require('../Model/User')

const getxure = async (req, res) => {
    const bx = await bxureSchema.find({ user: req.user.id})
    // either findById(req.user.id) or find({user: req.user.id})

    res.json(bx)
}
const postxure = async (req, res) => {
    if (!req.body.name && !req.body.post) {
        res.status(401).send('Please input text field')
    }
    const bx = await bxureSchema.create({
        user: req.user.id,
        name: req.body.name,
        post: req.body.post
    })
    res.status(200).json(bx)}

const putxure = async (req, res) => {
    const bxid = await bxureSchema.findById(req.params.id)
    if (!bxid) {
        res.json("No name found")
    }

    const eachUser = await User.findById(req.user.id)
    if(!eachUser) {
        res.status(400).json('No User Found')
    }

    if(bxid.user.toString() !== eachUser.id) {
        res.status(400).json('user not authorized')
    }

    const bx = await bxureSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(bx)
}

const delxure = async (req, res) =>{
    const bxid = await bxureSchema.findById(req.params.id)
    if (!bxid) {
        res.json("No name found")
    }

    const eachUser = await User.findById(req.user.id)
    if(!eachUser) {
        res.status(400).json('No User Found')
    }

    if(bxid.user.toString() !== eachUser.id) {
        res.status(400).json('user not authorized')
    }
    
    await bxid.remove()   
     res.status(200).json({id: req.params.id})
 }
module.exports = {
    getxure,
    postxure,
    putxure,
    delxure
}