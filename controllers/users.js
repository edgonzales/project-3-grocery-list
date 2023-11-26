const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
};

// import the s3 constructor (class)
const S3 = require('aws-sdk/clients/s3');
// initalize the s3 construcotr to give is the object that can perform
// our crud operations on our s3 bucket
const s3 = new S3()

// require nodes unique id function 
const { v4: uuidv4 } = require('uuid');

async function signup(req, res) {
  console.log(req.body, req.file)

  // check to make sure the user sent over a file
  if (!req.file) return res.status(400).json({ error: 'Please Submit a Photo!' });
  // create the filePath of where we will store our image on s3
  const filePath = `grocerylist/${uuidv4()}-${req.file.originalname}`
  // then make the params object that s3 object wants to send to send to aws s3 bucket
  const params = { Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer }
  // req.file.buffer is the actual image!

  s3.upload(params, async function (err, data) { // <- err, data are the response from aws s3 bucket!
    if (err) {
      console.log('=========================')
      console.log(err, ' <-- error from aws, probably wrong keys in your code ~/.aws/credentials file, or you have the wrong bucket name, are you sure you know what process.env.BUCKET_NAME is, did you log it out?')
      console.log('==========================')
    }

    const user = new User({ ...req.body, photoUrl: data.Location }); // data.Location is the address 
    // of our photo we added to s3
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token }); // set('toJSON',) in user model is being called, and deleting the users password from the token
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  })
}

async function login(req, res) {

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ err: 'bad credentials' });
    user.comparePassword(req.body.password, (err, isMatch) => {

      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: 'bad credentials' });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: '24h' }
  );
}
