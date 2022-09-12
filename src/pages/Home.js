import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from "react-redux";
import {getAllCars} from "../redux/actions/carsAction";
import {Row, Col, Divider, Checkbox, DatePicker} from "antd";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from "moment";

function Home() {
  const {RangePicker} = DatePicker;
  const dispatch = useDispatch();
  const {cars} = useSelector(state=>state.carsReducer);
  const {loading} = useSelector(state=>state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  

  useEffect(()=>{
    dispatch(getAllCars())
  }, []);

  useEffect(()=>{
    setTotalCars(cars)
  }, [cars]);

  function setFilter(values){
    var temp = [];
    for(var car of cars){
      if(car.bookedTimeSlots.length === 0){
        temp.push(car)
      }else{
        var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm").format();
        var selectedTo = moment(values[1], "MMM DD yyyy HH:mm").format();
        for(var booking of car.bookedTimeSlots){
          if(moment(selectedFrom).isBetween(booking.from, booking.to) || moment(selectedTo).isBetween(booking.from, booking.to)
            || moment(booking.from).isBetween(selectedFrom, selectedTo) || moment(booking.to).isBetween(selectedFrom, selectedTo)
          ){}else{
            temp.push(car)
          }
        }
      }
    }
    setTotalCars(temp)
  }

  return (
    <DefaultLayout>
      {loading === true && (<Spinner/>)}

      <Row className="mt-4" justify='center'>
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker showTime={{format:"HH:mm"}} format="MMM DD yyyy HH:mm" onChange={setFilter}/>
        </Col>
      </Row>

      <Row justify='center' gutter={16} className="">
        {totalCars.map(car=>{
          return (<Col lg={5} sm={24} xs={24}>
            <div className='car p-2 br1 mt-3'>
              <img src={car.image} className="carimg"/>
              <div className='car-content d-flex align-items-center justify-content-between'>
                <div>
                  <p>{car.name}</p>
                  <p>{car.rentPerHour} Rent Per Hour/-</p>
                </div>
                <div>
                  <button className='btn1 mr-2'><Link to={`booking/${car._id}`}>Book Now</Link></button>
                </div>
              </div>
            </div>
          </Col>)
        })}
      </Row>
    </DefaultLayout>
  )
}

export default Home