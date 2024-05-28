import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import Message from "../components/Message"; // Import the Message component
import ReactToPrint from "react-to-print";

const MyOrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const componentRef = useRef();

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-8 mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Order Details
          </h2>
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
                        Shipping Address
                      </h3>
                      <p className="text-gray-600">
                        {order.shippingAddress.address}
                      </p>
                      <p className="text-gray-600">{`${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`}</p>
                      <p className="text-gray-600">
                        {order.shippingAddress.country}
                      </p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Payment Method
                      </h3>
                      <p className="text-gray-600">{order.paymentMethod}</p>
                    </div>
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
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">
                        Payment Status
                      </h3>
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
                        Delivery Status
                      </h3>
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
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Print Order Details
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default MyOrderScreen;
