import { Box, TextField, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography, Button, RadioGroup, Radio,Grid } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';


const IdeatorReg = () => {
  const [formData, setFormData] = useState({
    District: '',
    Institution: '',
    Name: '',
    Email: '',
    MobNumber: '',
    Gender: '',
    DOB: '',
    Category: '',
    institusionCategory: '',
    Year_Sem_Class: '',
    DepartmentDivision: '',
    TypeOfProof: '',
    Idcard: null,
    Photo: null,
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((formData) => ({ ...formData, [name]: files[0] }));
  };

  const RegisterData = () => {
    // all field validation
    if (!formData.District || !formData.Institution || !formData.Name || !formData.Email
      || !formData.MobNumber || !formData.Gender || !formData.DOB || !formData.Category ||
      !formData.institusionCategory|| !formData.Year_Sem_Class || !formData.DepartmentDivision || !formData.TypeOfProof
      || !formData.Idcard || !formData.Photo) {
      alert('Please fill in all the required fields.');
      return;
    }
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      alert('Please enter a valid email address.');
      return;
    }
    // mobile validation
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.MobNumber )) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    console.log("Clicked");
    const formDataToSend = new FormData();
    formDataToSend.append('District', formData.District);
    formDataToSend.append('Institution', formData.Institution);
    formDataToSend.append('Name', formData.Name);
    formDataToSend.append('Email', formData.Email);
    formDataToSend.append('MobNumber', formData.MobNumber);
    formDataToSend.append('Gender', formData.Gender);
    formDataToSend.append('DOB', formData.DOB);
    formDataToSend.append('Category', formData.Category);
    formDataToSend.append('institusionCategory', formData.institusionCategory);
    formDataToSend.append('Year_Sem_Class', formData.Year_Sem_Class);
    formDataToSend.append('DepartmentDivision', formData.DepartmentDivision);
    formDataToSend.append('TypeOfProof', formData.TypeOfProof);
    formDataToSend.append('Idcard', formData.Idcard);
    formDataToSend.append('Photo', formData.Photo);

    axios.post('http://localhost:3025/reg', formDataToSend)
      .then((response) => {
        console.log(response.data);
         alert('Profile Updation Completed')
      })
      .catch((error) => {
        console.error(error); // Handle errors
      });
  }

 

  return (
    <div style={{ paddingTop:'340px',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',paddingBottom:'250px' }}>
      <Box sx={{ bgcolor: '#cfe8fc', p: 3, width: '80vh' }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="cuisine-type-label">District</InputLabel>
          <Select
            labelId="cuisine-type-label"
            id="cuisine-type-select"
            label="District"
            name="District"
            value={formData.District}
            onChange={handleChange}
          >
            <MenuItem >Select..</MenuItem>
            <MenuItem value="Alappuzha">Alappuzha</MenuItem>
            <MenuItem value="Ernakulam">Ernakulam</MenuItem>
            <MenuItem value="Idukki">Idukki</MenuItem>
            <MenuItem value="Kannur">Kannur</MenuItem>
            <MenuItem value="Kasaragod">Kasaragod</MenuItem>
            <MenuItem value="Kollam">Kollam</MenuItem>
            <MenuItem value="Kottayam">Kottayam</MenuItem>
            <MenuItem value="Kozhikode">Kozhikode</MenuItem>
            <MenuItem value="Malappuram">Malappuram</MenuItem>
            <MenuItem value="Palakkad">Palakkad</MenuItem>
            <MenuItem value="Pathanamthitta">Pathanamthitta</MenuItem>
            <MenuItem value="Thiruvananthapuram">Thiruvananthapuram</MenuItem>
            <MenuItem value="Thrissur">Thrissur</MenuItem>
            <MenuItem value="Wayanad">Wayanad</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Institution"
          variant="filled"
          fullWidth
          sx={{ mb: 3 }}
          name='Institution'
          value={formData.Institution}
          onChange={handleChange}
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Add Ideator Details</Typography>

        <div>
          <TextField
            label="Name"
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
            name='Name'
            value={formData.Name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
            name='Email'
            value={formData.Email}
            onChange={handleChange}
          />
          <TextField
            label="Mob Number"
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
            name='MobNumber'
            value={formData.MobNumber}
            onChange={handleChange}
          />

<label>Gender</label>
          <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
            <RadioGroup row aria-label="gender" name="Gender" value={formData.Gender} onChange={handleChange} defaultValue="Male">
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <TextField
            variant="filled"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            name='DOB'
            value={formData.DOB}
            onChange={handleChange}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              label="Category"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
            >
              <MenuItem >Select..</MenuItem>
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="OBC">OBC</MenuItem>
              <MenuItem value="OEC">OEC</MenuItem>
              <MenuItem value="SC/ST">SC/ST</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="institusion-category-label">Institution Category</InputLabel>
            <Select
              labelId="institusion-category-label"
              id="institusion-category-select"
              label="Institution Category"
              name="institusionCategory"
              value={formData.institusionCategory}
              onChange={handleChange}
            >
              <MenuItem >Select..</MenuItem>
              <MenuItem value="Government">Government</MenuItem>
              <MenuItem value="Aided">Aided</MenuItem>
              <MenuItem value="Self Finance">Self Finance</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Year-Sem-Class"
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
            name='Year_Sem_Class'
            value={formData.Year_Sem_Class}
            onChange={handleChange}
          />
          <TextField
            label="Department Division"
            variant="filled"
            fullWidth
            sx={{ mb: 2 }}
            name='DepartmentDivision'
            value={formData.DepartmentDivision}
            onChange={handleChange}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="type-of-proof-label">Type of Proof</InputLabel>
            <Select
              labelId="type-of-proof-label"
              id="type-of-proof-select"
              label="Type of Proof"
              name="TypeOfProof"
              value={formData.TypeOfProof}
              onChange={handleChange}
            >
              <MenuItem >Select..</MenuItem>
              <MenuItem value="Adhar">Adhar</MenuItem>
              <MenuItem value="Driving licence">Driving licence</MenuItem>
              <MenuItem value="CollegeId">CollegeId</MenuItem>
              <MenuItem value="Pancard">Pancard</MenuItem>
            </Select>
          </FormControl>

          <label>Id Card Upload</label>
          <TextField
            variant="filled"
            type="file"
            fullWidth
            sx={{ mb: 2 }}
            accept=".png, .jpeg, .jpg"
            name='Idcard'
            onChange={handleImageChange}
          />
          <label>Photo Upload</label>
          <TextField
            variant="filled"
            type="file"
            fullWidth
            name='Photo'
            accept=".png, .jpeg, .jpg"
            onChange={handleImageChange}
          />
        </div>
        <div style={{ paddingTop: '30px' }}>
          <Grid container spacing={2} justifyContent="left">
            <Grid item>
              <Button  >Save Draft</Button>
            </Grid>
            <Grid item>
              <Button variant='contained'  onClick={RegisterData}>Submit</Button>
            </Grid>
            <Grid item>
              <Button  style={{color:'#F14021'}}>Cancel</Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
}

export default IdeatorReg;

