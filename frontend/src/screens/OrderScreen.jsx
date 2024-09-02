import {Link , useParams} from "react-router-dom"
import {Row , Col  , ListGroup , Image , Form  , Button , Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery , usePayOrderMutation , useGetPayPalClientIdQuery } from "../slices/orderApiSlice"
import { useDispatch , useSelector } from "react-redux"
import { PayPalButtons , usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {toas} from 'react-toastify'
import { useEffect } from "react"

const OrderScreen = () => {
    const { id : orderId } = useParams()
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
    const [payOrder , {isLoading : loadingPay}] = usePayOrderMutation()

    const {useInfo} = useSelector((state) => state.auth)

    const [{isPending} , paypalDispatch] = usePayPalScriptReducer()
    const {data: paypal , isLoading: loadingPayPal , error : errorPayPal} = useGetPayPalClientIdQuery()
    const auth  = useSelector((state) => state.auth)

    useEffect(()=>{
        if(!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async() =>{
                paypalDispatch ({
                    type : 'resetOptions',
                    value : {
                        'clientId' : paypal.clientId,
                        currency : 'USD',
                    }
                });
                paypalDispatch({type : 'setLoadingStatus' , value : 'pending'});
            } 
            if (order && !order.isPaid){
                if (!window.paypal){
                    loadPayPalScript();
                }
            }
        }
    } , [order , paypal , paypalDispatch , loadingPayPal , errorPayPal])
    console.log(order)


    return isLoading ?  <Loader /> : error ? <Message variant='danger' /> : (
        <>
            <h1>Order : #{orderId}</h1>
            <ListGroup>
                <Row md={2}>
                
                <Col md={9}>
                <ListGroup.Item>
                    <h2>Ship to : {order.user.name}</h2>
                    <p>Email : {order.user.email}</p>
                    <p>Address : {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                    {order.isDelivered? (
                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                    ) : (
                        <Message variant='danger'>Not Delivered</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method : {order.paymentMethod}</h2>
                    {order.isPaid? (
                        <Message variant='success'>Paid on {order.paidAt}</Message>
                    ) : (
                        <Message variant='danger'>Not Paid</Message>
                    )}
                </ListGroup.Item>

                    <h2>Order Items</h2>
                <ListGroup.Item>
                    {order.orderItems.map((item) => (
                        <Row key={item.id}>
                            <Col md={1}>
                                <Image src={item.image} alt={item.name} fluid />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={3}>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                        </Row>
                    ))}
                </ListGroup.Item>
                </Col>

                <Col md={3}>
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                    <p>Items : {order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</p>
                    <p>Subtotal : ${order.itemsPrice}</p>
                    <p>Shipping : ${order.shippingPrice}</p>
                    <p>Tax : ${order.taxPrice}</p>
                    <p>Total : ${order.totalPrice}</p>
                    {order.isDelivered && order.paid && (
                        <Button type='button' disabled>
                            Mark As Paid
                        </Button>
                    )}
                </ListGroup.Item>
                </Col>
                </Row>
            </ListGroup>

        </>
    )
}

export default OrderScreen