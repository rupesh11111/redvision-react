import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia, Grid } from '@mui/material';
import axios from 'axios';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token')

    async function getOrder() {
        await axios.get('http://127.0.0.1:5000/api/orders/myOrders',{ headers: { Authorization: token } }).then((res) => {
            setOrders(res?.data?.data);
            console.log(res?.data?.data);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getOrder();
    }, [])

    return (
        <div style={{ padding: '20px' }}>
            {orders.map(order => (
                <Card key={order._id} style={{ marginBottom: '10px', display: 'flex', justifyContent: "center", alignContent: "center", alignItems: "center" , padding:"20px" }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", flex: 1 }}>

                        <Card key={order._id} style={{ marginBottom: '10px', display: 'flex', justifyContent: "center", alignContent: "center", alignItems: "center", width:"100%"}}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", flex: 1 }}>
                                <CardContent>
                                    <Typography variant="h5">{order?.user?.name}</Typography>
                                    <Typography color="textSecondary">{order?.user?.email}</Typography>
                                    <Typography color="textSecondary">{order?.user?.mobile}</Typography>
                                    <Typography color="textSecondary">Total Price : ₹{order?.totalPrice}</Typography>
                                    <Typography color="textSecondary">

                                        {(order.products).map(detail => (
                                            <CardContent>
                                                <Card key={order._id} style={{ marginBottom: '10px', display: 'flex', justifyContent: "center", alignContent: "center", alignItems: "center", minWidth:"100%" }}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", flex: 1 }}>
                                                        <CardContent>
                                                            <Typography variant="h5">{detail?.product?.name}</Typography>
                                                            <Typography color="textSecondary">Price : ₹{detail?.product?.price}</Typography>
                                                            <Typography variant="body2">Quantity: {detail?.quantity}</Typography>
                                                        </CardContent>
                                                    </div>
                                                </Card>
                                            </CardContent>
                                        ))}
                                    </Typography>


                                </CardContent>
                            </div>
                        </Card>



                    </div>
                </Card>
            ))}
        </div>
    );
};

export default MyOrder;
