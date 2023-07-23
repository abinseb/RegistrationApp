import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import IdeatorReg from "./components/IdeatorReg";
import Footer from "./components/Footer";
import Login from "./components/Login";



function App() {
  return (<div>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/ideatorReg" element={<IdeatorReg/>} />
      <Route path="/login" element={<Login/>} />
      
    </Routes>
    <Footer/>
    </div>
   
  );
}

export default App;
