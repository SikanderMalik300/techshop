import React from "react";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const MyOrdersScreen = () => {
  const { data: orders, isLoading } = useGetMyOrdersQuery();

  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-8 py-10">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">My Orders</h2>
      {!orders || orders.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">
            No Orders Found.{" "}
            <Link to="/" className="text-indigo-600">
              Go back
            </Link>
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-left">Paid</th>
                <th className="py-3 px-6 text-left">Delivered</th>
                <th className="py-3 px-6 text-left"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {order.totalPrice}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {order.isPaid ? (
                      <span className="flex items-center">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-green-500 mr-1"
                        />
                        {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-red-500 mr-1"
                        />
                        Not Paid
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {order.isDelivered ? (
                      <span className="flex items-center">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-green-500 mr-1"
                        />
                        {order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-red-500 mr-1"
                        />
                        Not Delivered
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <Link
                      to={`/myorder/${order._id}`}
                      className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-indigo-700"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrdersScreen;
