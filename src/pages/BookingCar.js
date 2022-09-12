import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from "react-redux";
import {getAllCars} from "../redux/actions/carsAction";
import Spinner from '../components/Spinner';
import {Row, Col, Divider, DatePicker, Modal} from "antd";
import moment from "moment";
import {bookCar} from "../redux/actions/bookingActions";
import StripeCheckout from 'react-stripe-checkout';

function BookingCar({match}) {
  const dispatch = useDispatch();
  const {cars} = useSelector(state=>state.carsReducer);
  const {loading} = useSelector(state=>state.alertsReducer);
  const [car, setCar] = useState({});
  const {RangePicker} = DatePicker; 
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // console.log(car);
  // console.log(cars, "this is cars")
  // console.log(match, "this is match")
  // console.log(totalHours)
  
  function selectTimeSlots(values){
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"))
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"))
    setTotalHours(Math.round(moment.duration(values[1].diff(values[0])).asHours()))
  }

  function bookNow(){
    
  }

  function onToken(token){
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem('user'))._id,
      car: car._id,
      totalHours,
      totalAmount: totalAmt,
      bookedTimeSlot: {
        from,
        to
      }
    }
    dispatch(bookCar(reqObj))
    // console.log(token);
  }
  
  useEffect(()=>{
    if(cars.length === 0){
      dispatch(getAllCars())
    }else{
      setCar(cars.find(o=>o._id === match.params.carid))
    }
  }, [cars]);

  useEffect(()=>{
    setTotalAmt((totalHours * car.rentPerHour))
  }, [totalHours])

  return (
    <DefaultLayout>
      {loading && <Spinner/>}
      <Row justify='center' className='d-flex align-items-center' style={{minHeight: "80vh"}}>
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} className="carimg2 bs1"/>
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal" dashed>Car Info</Divider>
          <div className='text-right'>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per  Hour/-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons: {car.capacity}</p>
          </div>
          <Divider type='horizontal' dashed>Select Time Slots</Divider>
          <div className='text-right'>
            <button className='btn1 mt-2 mb-3' onClick={()=>setShowModal(true)}>See Booked Slots</button>
            <br/>
            <RangePicker showTime={{format:"HH:mm"}} format="MMM DD yyyy HH:mm" onChange={selectTimeSlots}/>
          </div>
          {from && to && 
          <div className='text-right'>
            <p>Total Hours: <b>{totalHours}</b></p>
            <p>Rent Per Hour: <b>₹ {car.rentPerHour}/-</b></p>
            <h3>Total Amount: <b>₹ {totalAmt}/-</b></h3>
            <StripeCheckout
              shippingAddress
              token={onToken}
              currency="INR"
              amount={totalAmt*100}
              stripeKey="pk_test_51Lgwr4SCUQGDmdZ19XIBOf6lbgDzBIxeNM5FOs9QXXOf48FgN8ynM0QPACttQReGTCJnNWCY5SK8gONHltA3ubfi00enwl5IVB"
            >
              <button className='btn1'>Book Now</button>
            </StripeCheckout>
          </div>}
        </Col>
        {car.name && <Modal visible={showModal} closable={false} footer={false} title="Booked Time Slots">
            <div className='p-2'>
              {car.bookedTimeSlots.map(slot=>{
                return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
              })}
              <div className="text-right">
                <button className='btn1' onClick={()=>setShowModal(false)}>Close</button>
              </div>
            </div>
          </Modal>}
      </Row>
    </DefaultLayout>
  )
}

export default BookingCar;