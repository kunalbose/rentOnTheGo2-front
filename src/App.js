import './App.css';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import BookingCar from "../src/pages/BookingCar";
import UserBookings from './pages/UserBookings';
import "antd/dist/antd.css";
import AddNewCar from './pages/AddNewCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ProtectedRoute path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <ProtectedRoute path="/booking/:carid" exact component={BookingCar}/>
        <ProtectedRoute path="/userbookings" exact component={UserBookings}/>
        <ProtectedRoute path="/addcar" exact component={AddNewCar}/> 
        <ProtectedRoute path="/editcar/:carid" exact component={EditCar}/> 
        <ProtectedRoute path="/admin" exact component={AdminHome}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props){
  if(localStorage.getItem('user')){
    return <Route {...props} /> 
  }else{
    return <Redirect to="/login"/>
  }
}