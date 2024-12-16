import React from"react";
import SignUpPage from"./signUpPage.jsx";
import Login from"./loginPage.jsx";

// Component used to display the login and sign up page
const accessPage=()=>{return(
<div className="flex justify-center space-x-4"><SignUpPage></SignUpPage><Login></Login></div>);};

export default accessPage;