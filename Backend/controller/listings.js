
const Listing = require('../models/listing');

// All Listings 
module.exports.index =  async (req,res) =>{
    try {
        const allListings = await Listing.find({});
        if(req.user){
            return res.json({allListings, user: req.user});
        }
        return res.json({allListings});
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};



 
//Show Route

module.exports.showListing = async  (req,res)=>{ 
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path : "reviews",
         populate :{ path : "author"}       
        })
        .populate("owner");
      // This is method chaining. we use populate on 2 different fields.
    if(!listing){
           
        }
        
    res.json(listing);
};

// DeleteRoute

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    console.log(id);
    let deletedData = await Listing.findByIdAndDelete(id);
    console.log(deletedData);
    res.json(deletedData);

};

// Create Route
module.exports.createListing = async(req,res, next) => {
    
    
    const data = req.body;
    let newListing = new Listing(data);
    newListing.owner = req.user._id;
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url,filename};
    }
    await newListing.save();
    res.json({success : "Success"});
 
};



//Update Route
module.exports.updateListing = async (req,res) =>{    
    let {id} = req.params;
    let updatedData = await Listing.findByIdAndUpdate(id, {...req.body}, {runValidators : true, new : true});

    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedData.image = {url, filename};
        await updatedData.save();
        console.log("i am here")
    }
    console.log(typeof req.file !== 'undefined');
    console.log("I am out")
    // req.flash("success", "The listing is successfully Updated");
    res.json(updatedData);
};
