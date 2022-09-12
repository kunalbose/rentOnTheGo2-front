import React, {useState, useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {useDispatch, useSelector} from "react-redux";
import { getAllBookings } from '../redux/actions/bookingActions';
import { getAllCars } from '../redux/actions/carsAction';
import {Row, Col} from "antd";
import moment from "moment";
import Spinner from '../components/Spinner';

function UserBookings() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    const {bookings} = useSelector(state=>state.bookingsReducer);
    const {cars} = useSelector(state => state.carsReducer);
    const {loading} = useSelector(state => state.alertsReducer);

    useEffect(()=>{
        dispatch(getAllBookings())
        dispatch(getAllCars())
    }, [])

  return (
    <DefaultLayout>
        {loading && <Spinner/>}
        <h3 className='text-center mt-2'>My Bookings</h3>
        <Row justify="center" gutter={16}>
            <Col lg={16} sm={24}>
                {bookings.filter(o=>o.user === user._id).map(booking=>{
                    const car = cars.find(o=> o._id === booking.car);
                    return(
                        <Row className="br1 m-3 text-left">
                            <Col lg={6} sm={24}>
                                <p><b>{booking.car?.name}</b></p>
                                <p>Total Hours: <b>{booking.totalHours}</b></p>
                                <p>Rent Per Hour: <b>{car?.name}</b></p>
                                <p>Total Amount: <b>{booking.totalAmount}</b></p>
                            </Col>
                            <Col lg={12} sm={24}>
                                <p>Transaction Id: <b>{booking.transactionId}</b></p>
                                <p>From: <b>{booking.bookedTimeSlot.from}</b></p>
                                <p>To: <b>{booking.bookedTimeSlot.to}</b></p>
                                <p>Date of Booking: <b>{moment(booking.createdAt).format("MMM DD yyyy HH:mm")}</b></p>
                            </Col>
                            <Col lg={6} sm={24}>
                                <img src={car.image} height={140} className="p-2" style={{borderRadius: 5}}/>
                            </Col>
                        </Row>
                    )
                })}
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default UserBookings