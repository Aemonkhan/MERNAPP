const express = require("express");
const User = require("../../models/users.js");
const router = express.Router();


const User = require("../../models/users.js");

//const users = require('../../Users');



//===========================================Get all users
router.get("/", async (req, res) => {
  try {

    const users = await User.find();
    console.log(users);

    res.json({
      status: 200,
      success: true,
      data: users
    })
  } catch (e) {
    res.json({
      status: 404,
      success: false,
      error: e.message
    })
    // res.status(404).json({ success: false, error: err.message });
  }
});
//=========================================== Create Single User

router.post("/add", async (req, res) => {
  //console.log("....",req)
  try {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          User.create(req.body)
           .then(usr=>res.json({
            success: true,
            dbid: user._id,
            status: 201
          }))
        }//if

      })
      .catch(err=>res.json({
        error:err,
        status:404
      }))



  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }

});

//===================================================================Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }


});
router.put('update/:id', async (req, res) => {
  console.log('update')
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({
      success: true,
      status: 200, //ok
      data: user,
      msg: 'updated successfully'
  })


})
router.delete('/:id', async (req, res) => {
  try {
       const user = await User.findByIdAndDelete(req.params.id);
  res.json({
      success: true,
      status: 200, //ok
      msg: 'post is deleted successfully'
  })
 
  } catch (error) {
      console.log(error)
  }

})

  // let id = parseInt(req.params.id)
  // console.log(id)
  // let result = users.filter((item) => item.id == id)
  // res.json(result[0])
  router.get('/:id', async (req, res) => {
  
    res.json({
        success: true,
        status: 200, //ok
        data: users
    })

})
  router.delete('/:id', async (req, res) => {
    try {
         const user = await User.findByIdAndDelete(req.params.id);
         console.log(req.params.id)
    res.json({
        success: true,
        status: 200, //ok
        msg: 'users is deleted successfully'
    })
   
    } catch (error) {
        console.log(".....",error)
    }

  })
});
router.post('/login', async (req, res) => {
  let {pwd,email} = req.body;
  console.log(req.body)


  try {
    User.findOne({email,pwd})
    .then(user=>{
      console.log(user)
      res.json({
        status:200,
        data:user,
        msg:"login success"
      })
    })
    .catch(err=>console.log('.....',err))
  } catch (error) {
    console.log(error)
  }
}
)
module.exports = router
