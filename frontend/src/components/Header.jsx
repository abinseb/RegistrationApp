import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Avatar from '@mui/material/Avatar';

const Header = () => {
  return (
    <div>
      <AppBar
        style={{
            backgroundColor:'#4E9898'
        }}
      >
        <Toolbar style={{display:'flex'}}>
        <Avatar
            alt="Dev-T"
            src={require('../assets/yip.png')}
            className="avatar-image"
            style={{ width:'100px', height:  '100px' }}
          />
          <Typography
            variant={ 'h4'}
            sx={{
              
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#000000',
              textDecoration: 'none',
              paddingLeft:  '20px',
            }}
          >
            YOUNG INTERNS PROGRAM
          </Typography>

        </Toolbar>
        
      </AppBar>
    </div>
  )
}

export default Header
