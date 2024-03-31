import { useState } from 'react'
import {Routes, Route } from 'react-router-dom'
import './App.css'
import Welcome from './components/Welcome'
import Searched from './components/Searched'

function App() {

  return (
    <>
  <Routes>
              
                    <Route
                    // url for defalut or index page named Welcome page 
                        path="/"
                        element={<Welcome/>}
                    />
 
                    <Route
                    // url will use for Searched.jsx page 
                        exact
                        path="/Searched"
                        element={<Searched/>}
                    />
             
            </Routes>
    </>

  
  )
}

export default App



// // App.js

// import React from "react";
// import {Router, Route, Switch } from "react-router-dom";
// // import from "./HomePage";
// import Welcome from './components/Welcome'
// import Searched from "./components/Searched";

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Welcome} />
//         <Route path="/searched" component={Searched} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;
