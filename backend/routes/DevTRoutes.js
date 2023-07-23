const router = require('express').Router();
const DevT = require('../model/RegModel');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload files to the 'uploads/' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/reg', upload.fields([{ name: 'Idcard', maxCount: 1 }, { name: 'Photo', maxCount: 1 }]), async (req, res) => {
  try {
    // Create a new DevT model instance
    const data = new DevT({
      Name: req.body.Name,
      Email: req.body.Email,
      District: req.body.District,
      MobNumber: req.body.MobNumber,
      Institution: req.body.Institution,
      Gender: req.body.Gender,
      DOB: req.body.DOB,
      Category: req.body.Category,
      InstitutionCategory: req.body.InstitutionCategory,
      Year_sem_class: req.body.Year_sem_class,
      DepartmentDivision: req.body.DepartmentDivision,
      TypeOfProof: req.body.TypeOfProof,
      Idcard: req.files['Idcard'][0].path, // Save the file path in the database
      Photo: req.files['Photo'][0].path,   // Save the file path in the database
    });

    // Save the data to the database
    await data.save();
    res.json("Data added");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/viewData', async (req, res) => {
    try {
      const data = await DevT.find();
  
      const dataWithImageUrl = data.map(profile => ({
        ...profile._doc,
        Idcard: `http://localhost:3025/${profile.Idcard}`,
        Photo: `http://localhost:3025/${profile.Photo}`
      }));
  
      res.json(dataWithImageUrl);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
