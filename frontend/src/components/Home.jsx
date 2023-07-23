import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, InputLabel, FormControl, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
// import  emailjs from 'emailjs-com';

const Home = () => {
  const [inpt, setinput] = useState({
    prereg_name: '',
    prereg_email: '',
    prereg_mob: '',
    districtd: ''
  });

  const [user_id, setUser_id] = useState('');
  const [password, setPassword] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [openlog,setOpenlog] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinput((inpt) => ({ ...inpt, [name]: value }));
    console.log(inpt);
  };
  // generate random password
  const generateRandomPassword = () => {
    const length = 4; // Adjust the length of the generated password as needed
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const registerData = () => {
    if (!inpt.prereg_name || !inpt.prereg_email || !inpt.prereg_mob || !inpt.districtd) {
      alert('Please fill in all the required fields.');
      return;
    }
    // email and mobile validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inpt.prereg_email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(inpt.prereg_mob)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

     const formData = new FormData();
    formData.append('prereg_name', inpt.prereg_name);
    formData.append('prereg_email', inpt.prereg_email);
    formData.append('prereg_mob', inpt.prereg_mob);
    formData.append('districtd', inpt.districtd);
   

    axios.post('https://yip.kerala.gov.in/yipapp/index.php/Idea2021/add_pre_reg', formData)
      .then(() => {
        alert('Registered Successfully');
        setOpenDialog(true);
      })
      .catch((err) => {
        console.log(err);
        alert('Successfully Registered and an OTP Send to Your MobileNumber');
        setOpenDialog(true);
      });

    
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const dialogStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  };

  const buttonContainerStyle = {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const otpVerification = () => {
    const formData = new FormData();
    formData.append('otp_received', inpt.otp_received);
    formData.append('user_id', inpt.prereg_email);
    formData.append('prereg_name', inpt.prereg_name);
    formData.append('prereg_email', inpt.prereg_email);
    formData.append('prereg_mob', inpt.prereg_mob);
    formData.append('districtd', inpt.districtd);
  
    axios.post("https://dev.yip.kerala.gov.in/yipapp/index.php/Com_mobile_otp/checkotp", formData)
      .then(() => {
        const password = generateRandomPassword();
        const user_id = inpt.prereg_email;
        // to db login
        const ldata = {
          user_id: user_id,
          password: password,
        };
        axios.post("http://localhost:3025/yiplogin", ldata)
          .then(() => {
            // email to
            // emailjs.send("service_cwdg3pp", "template_4zx0lro", {
            //   user_id,
            //   password,
            // }, "aBzJ-vFB_GKCfIblw")
            //   .then((response) => {
                alert("Registration Details Successfully Saved. Login Credentials shared to your registered email id. Now you can continue to complete the registration.");
                setUser_id(user_id);
                setPassword(password);
                setOpenlog(true);
                // navigate('/ideatorReg');
                setinput({
                  prereg_name: '',
                  prereg_email: '',
                  prereg_mob: '',
                  districtd: '',
                  otp_received: '', // Make sure to clear the OTP field as well
                });
              // })
              // .catch((error) => {
              //   console.error("Email sending failed:", error);
              //   alert("An error occurred during registration. Please try again later.");
              // });
          })
          .catch((err) => {
            console.log(err);
            
          });
      })
      .catch((err) => {
        alert("An error occurred during OTP verification. Please try again later.");
        console.log(err);
      });
  };

  const logclose =()=>{
    setOpenlog(false);
    navigate('/login');
  }
  
  
  


  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#ECF5F7' }}>
      <section>
        <div style={{ backgroundColor: '#ECF5F7', padding: '20px' }}>
          <Typography variant='h4' textAlign={'center'}>YIP 2023- Pre Registration</Typography>
          <Container maxWidth="sm">
            {/* Use Flexbox to place boxes in the same row */}
            <Box sx={{ display: 'flex',width:'150vh' }}>
              <Box sx={{ bgcolor: '#cfe8fc', height: '70vh', width: '80vh', marginRight: '30px' }}>
                <img src={require('../assets/tech.png')} alt='Limage' style={{ height: '100%', width: '100%' }} />
              </Box>
              <Box sx={{marginLeft:'30px', bgcolor: '#cfe8fc', height: '35vh', width: '40vh', padding: '10px' }}>
                <Typography variant='h5'>YIP Steps</Typography>
                <ol>
                  <li>Pre Registration</li>
                  <li>Ideator Registration</li>
                  <li>Group Formation</li>
                  <li>Voice of Stakeholder Training</li>
                  <li>Quiz</li>
                  <li>Stakeholder Survey</li>
                  <li>Idea Submission</li>
                </ol>
              </Box>
            </Box>
          </Container>
        </div>
      </section>
     
      <section>
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <Typography variant='h3'>Registration</Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            maxWidth={700}
            bgcolor={'#D6EFF5'}
            alignSelf="center"
            marginLeft="auto"
            marginRight="auto"
            padding="20px"
            borderRadius="8px"
          >
            <TextField
              label="Name"
              variant='filled'
              fullWidth
              name='prereg_name'
              value={inpt.prereg_name}
              onChange={handleChange}
              sx={{ my: 2 }}
            />
            <TextField
              label="Email"
              variant='filled'
              name='prereg_email'
              value={inpt.prereg_email}
              onChange={handleChange}
              fullWidth
              sx={{ my: 2 }}
            />
              <TextField
              label="Mob Number"
              variant='filled'
              type='number'
              name='prereg_mob'
              value={inpt.prereg_mob}
              onChange={handleChange}
              inputProps={{ maxLength: 10 }}
              sx={{ my: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="district-label">District</InputLabel>
              <Select
                labelId="district-label"
                id="district-select"
                label="District"
                name="districtd"
                value={inpt.districtd}
                onChange={handleChange}
                sx={{ my: 2 }}
              >
                <MenuItem>Select..</MenuItem>
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
            {/* <TextField
              label="District"
              variant='filled'
              name='districtd'
              value={inpt.districtd}
              onChange={handleChange}
              fullWidth
              sx={{ my: 2 }}
            /> */}
            <div style={{ paddingTop: '30px' }}>
              <Button variant='contained' sx={{ mx: 1 }} onClick={registerData} >Submit</Button>
              <Button variant='contained' sx={{ mx: 1 }}>Cancel</Button>

            </div>
            <Link to={'/login'}><p style={{paddingRight:'240px',color:'red'}}>Click here to login. If already registered</p></Link> 
          </Box>
        </div>
      </section>
      <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle component="h3">Enter OTP(One Time Password)</DialogTitle>
        <DialogContent style={dialogStyle}>
          <p color='#FF2201'>Your OTP has been send to your Mobile Number.
            Please enter the number below.
          </p>
          <label>Enter OTP</label>
          <TextField 
            label="Enter OTP Here"
            variant='filled'
            name='otp_received'
            value={inpt.otp_received}
            onChange={handleChange}
             
          />
          <div style={buttonContainerStyle}>

            <Button variant="contained" color="primary" 
            onClick={otpVerification}
            >
              Verify Your OTP
            </Button>
            <Button color='error' onClick={handleDialogClose}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* display userid and password */}
      <Dialog open={openlog} onClose={logclose}>
        <DialogTitle>userId and Password</DialogTitle>
        <DialogContent>
          <p>This password is only generated once, so please note it carefully before closing the application.
             It will be used for your future logins.</p>  
          <Typography variant='h6'>User Id:{user_id}</Typography>
          <Typography variant='h6'>Password:{password}</Typography>
          <DialogActions>
          <Button onClick={logclose} >Close</Button>
          </DialogActions>
          

        </DialogContent>
      </Dialog>
     
    </div>
  );
}

export default Home;
