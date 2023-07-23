import * as React from 'react'

const Footer = () => {
  return (
    <footer style={{ 
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
        backgroundColor:'#4E9898',
        height:'80px'
        }}>
      <div className="footer-content">
        <h5 style={{color: '#4E9898'}}>Dev-T</h5>
        <p class='paragraph'>Copyright @  Inc.</p>
       
      </div>
    </footer>
  )
}

export default Footer
