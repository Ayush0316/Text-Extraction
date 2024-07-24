const Page = require('../models/pageModel');
const Document = require('../models/documentModel');

exports.getUser = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
};

exports.addDocument = async(req, res, next) => {
  console.log(req.body);

  const {images, docName} = req.body;


  const pageRefs = [];
  for(let i=0; i<images.length; i++){
    const page = await Page.create({
      image: images[i],
    })
    pageRefs.push(page._id);
  }

  const newDoc = await Document.create({
    name: docName,
    pages: pageRefs,
  })

  // const User = req.user;

  // User.documents.push(newDoc);
  // await User.save({runValidationBeforeSave: false});

  res.status(200).json({message:"Document successfully added"});
}
