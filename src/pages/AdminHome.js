import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from "react-redux";
import {deleteCar, getAllCars} from "../redux/actions/carsAction";
import {Row, Col, Divider, Checkbox, DatePicker, Popconfirm} from "antd";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

function AdminHome() {
  
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

  return (
    <DefaultLayout>
      {loading === true && (<Spinner/>)}

      <div className='mt-4 mb-3 text-right mr-5'>
        <Link to="/addcar" className='btn1'>Add Cars</Link>
      </div>

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
                <div className='mr-4'>
                    <Link to={`/editcar/${car._id}`}><EditOutlined className="mr-3" style={{cursor: "pointer", color: "green"}}/></Link>
                    <Popconfirm
                        title="Are you sure to delete this car?"
                        onConfirm={()=>{dispatch(deleteCar({carid : car._id}))}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{cursor: "pointer", color: "red"}}/>
                    </Popconfirm>
                </div>
              </div>
            </div>
          </Col>)
        })}
      </Row>
    </DefaultLayout>
  )
}

export default AdminHome