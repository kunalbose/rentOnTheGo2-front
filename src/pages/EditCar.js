import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout';
import {Row, Col, Form, Input} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import {addCar, getAllCars, editCar} from "../redux/actions/carsAction";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

function EditCar({match}) {
    const {cars} = useSelector(state=>state.carsReducer); 
    const dispatch = useDispatch();
    const {loading} = useSelector(state=>state.alertsReducer);
    const [car, setCar] = useState();
    const [totalCars, setTotalCars] = useState([]);
    useEffect(()=>{
        if(cars.length == 0){
            dispatch(getAllCars());
        }else{
            setTotalCars(cars)
            setCar(cars.find(o=>o._id == match.params.carid));
            console.log(match.params.carid)
        }
    }, [cars])

    function onFinish(values){
        values._id = car._id;
        dispatch(editCar(values))
    }
  return (
    <DefaultLayout>
        {loading && <Spinner/>}
        <div className='mt-4 mb-3 text-right mr-4'>
        <Link to="/admin" className='btn1'>Back To Admin</Link>
      </div>
        <Row justify='center' className='mt-5'>
            <Col lg={12} sm={24}>
                {totalCars.length>0 && <Form initialValues={car} className='br1 p-2' layout='vertical' onFinish={onFinish}>
                    <h3>Edit Car</h3>
                    <Form.Item name="name" label="car name" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="image" label="Image Url" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="rentPerHour" label="Rent Per Hour" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="capacity" label="capacity" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="fuelType" label="fuel Type" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <div className='text-right'>
                        <button className='btn1'>Edit Car</button>
                    </div>
                </Form>}
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default EditCar