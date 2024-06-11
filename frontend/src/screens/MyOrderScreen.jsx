import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";
import Message from "../components/Message";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const MyOrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);
  const componentRef = useRef();
  const [printMode, setPrintMode] = useState(false);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-8 mx-auto max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800">Order Details</h2>
            <ReactToPrint
              trigger={() => (
                <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded hidden md:inline-block"
                  onClick={() => setPrintMode(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-4 4h4M4 21h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Print Order Details
                </button>
              )}
              content={() => componentRef.current}
              onAfterPrint={() => setPrintMode(false)}
            />
          </div>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div ref={componentRef} className="p-4">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">Order ID</h3>
                      <p className="text-gray-600">{order._id}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Payment Method
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {order.paymentMethod}
                      </p>
                      {order.isPaid ? (
                        <Message variant="success">
                          Paid at: {new Date(order.paidAt).toLocaleString()}
                        </Message>
                      ) : (
                        <Message variant="danger">Not Paid Yet</Message>
                      )}
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Shipping Address
                      </h3>
                      <p className="text-gray-600">
                        {order.shippingAddress.address}
                      </p>
                      <p className="text-gray-600">{`${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`}</p>
                      <p className="text-gray-600 mb-4">
                        {order.shippingAddress.country}
                      </p>
                      {order.isDelivered ? (
                        <Message variant="success">
                          Delivered at:{" "}
                          {new Date(order.deliveredAt).toLocaleString()}
                        </Message>
                      ) : (
                        <Message variant="danger">Not Delivered Yet</Message>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Order Items
                      </h3>
                      {order.orderItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-start justify-between border-b py-4"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex flex-col">
                              <p className="text-lg font-semibold text-indigo-600">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                ${item.price.toFixed(2)}
                              </p>
                              <div className="flex items-center mt-2">
                                <span className="text-lg font-semibold mr-2">
                                  {item.quantity} x ${item.price.toFixed(2)} = $
                                  {(item.quantity * item.price).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Order Summary
                      </h3>
                      <div className="flex justify-between py-2">
                        <span>Items Price:</span>
                        <span>${order.itemsPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Shipping Price:</span>
                        <span>${order.shippingPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Tax Price:</span>
                        <span>${order.taxPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2 font-bold">
                        <span>Total Price:</span>
                        <span>${order.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  {!printMode && (
                    <div>
                      {!order.isPaid && (
                        <div>
                          {loadingPay && <Spinner />}
                          {isPending ? (
                            <Spinner />
                          ) : (
                            <div>
                              <div>
                                <PayPalButtons
                                  createOrder={createOrder}
                                  onApprove={onApprove}
                                  onError={onError}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrderScreen;
