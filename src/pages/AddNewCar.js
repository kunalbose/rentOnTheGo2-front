import React from 'react'
import DefaultLayout from '../components/DefaultLayout';
import {Row, Col, Form, Input} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import {addCar} from "../redux/actions/carsAction";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';


function AddNewCar() {
    const dispatch = useDispatch();
    const {loading} = useSelector(state=>state.alertsReducer);

    function onFinish(values){
        values.bookedTimeSlots = [];
        dispatch(addCar(values))
    }
  return (
    <DefaultLayout>
        {loading && <Spinner/>}
        
        <div className='mt-4 mb-3 text-right mr-4'>
            <Link to="/admin" className='btn1'>Back To Admin</Link>
        </div>

        <Row justify='center' className='mt-5'>
            <Col lg={12} sm={24}>
                <Form className='br1 p-2' layout='vertical' onFinish={onFinish}>
                    <h3>Add new Car</h3>
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
                        <button className='btn1'>Add Car</button>
                    </div>
                </Form>
            </Col>
        </Row>
    </DefaultLayout>
  )
}

export default AddNewCar