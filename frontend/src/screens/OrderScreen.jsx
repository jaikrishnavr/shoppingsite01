import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetOrderDetailsQuery, useGetPayPalCLientIdQuery, usePayOrderMutation } from "../slices/orderApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending } ,  paypalDispatch] = usePayPalScriptReducer();
  
  const {data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalCLientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(()=> {
    if(!errorPayPal && !loadingPayPal && paypal.clientId){
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'clientId' : paypal.clientId,
            currency:'USD'
          }
        });
        paypalDispatch({ type: 'setLoadingState', value: 'pending' });
      }
      if(order && !order.isPaid){
        if(!window.paypal){
          loadPaypalScript();
        }
      }
    }
  },[order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

  function onApprove(data, actions) { 
    return actions.order.capture().then(async function (details) {
      try{
        await payOrder({ orderId, details});
        refetch();
        toast.success('Payment successful');
      } catch(err){
      toast.error(err?.data?.message || err.message );
      };
    })
   }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {}}});
    refetch();
    toast.success('Payment successful');
   }

  function onError(err) { 
    toast.error(err.message);
  }

  function createOrder(data, actions) { 
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    }).then((orderId)=> {
      return orderId;
    });
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Order: {order._id} </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>

              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>

              { order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ):(
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              { order.isPaid ? (
                <Message variant="success">
                 Paid on:   {order.paidAt}
                </Message>
              ):(
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>

              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Items</strong></Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Shipping</strong></Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Tax</strong></Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Total</strong></Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader/>}
                  {isPending ? <Loader/> : (
                    <div>
                    {/*<Button onClick={onApproveTest} style={{marginBottom: '10px'}}> Test pay order</Button>*/}
                      <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                </ListGroup.Item>
              )}         
              {/* mark order as delivered placeholder*/}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
