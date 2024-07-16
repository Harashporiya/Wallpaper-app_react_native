const Router = require("express")
const router = Router();
const Edit = require("../model/edit")
router.post("/edit", async(req,res)=>{
    try{
        const { profileUserName, bio } = req.body;
          const edit = await Edit.create({
            profileUserName,
            bio,
          })
          return res.status(200).json(edit);
    }catch(error){
        return res.status(500).json(`Error ${error}`)
    }
})


router.get("/add/bio",async(req,res)=>{
    try{
        const editBio = await Edit.find();
        return res.status(200).json(editBio);
    }catch(error){
        return res.status(500).json(`Error ${error}`)
    }
})


module.exports = router;