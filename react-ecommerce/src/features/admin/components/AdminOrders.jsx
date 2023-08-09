import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  updateOrderAsync,
  selectTotalOrders,
} from "../../order/orderSlice";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { Pagination } from "../../shared/Pagination";

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [editStatus, setEditStatus] = useState(-1);

  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  // const params = useParams();
  // console.log(params);

  const dispatch = useDispatch();

  function handleViewOrder() {
    console.log("handleViewOrder");
  }

  const handleEditOrder = (order) => {
    setEditStatus(order.id);
  };

  const handleOrderStatus = (e, order) => {
    const changedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(changedOrder));
    setEditStatus(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };
  const handleSort = (option) => {
    let newSort = { _sort: option.sort, _order: option.order };
    // console.log({ newSort });
    setSort(newSort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  function chooseStatus(status) {
    switch (status) {
      case "Pending":
        return "bg-purple-200 text-purple-600";
      case "Dispatched":
        return "bg-orange-200 text-orange-600";
      case "Delivered":
        return "bg-green-200 text-green-600";
      case "Cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen bg-indigo-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-indigo-200 text-gray-600 capitalize text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order Number{" "}
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-left">Shipping Address</th>
                  <th
                    className="py-3 px-6 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>

                    <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center py-1">
                          <div className="mr-2">
                            <img
                              className="w-10 h-10"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                          </div>
                          <div>
                            <span> {item.product.title} </span>&nbsp;
                            <span>
                              {" "}
                              Price : ${discountedPrice(item.product)}
                            </span>
                            {"  "}
                            <span className="line-through">
                              ${item.product.price}
                            </span>
                            &nbsp;
                            <span> qty: {item.quantity} </span>
                            <h5> User : {order.user.email}</h5>
                          </div>
                        </div>
                      ))}
                    </td>

                    <td className="py-3 px-6 text-left">
                      <div className="items-center justify-center">
                        <ul>
                          <li>{order.selectedAddress.fullName}</li>
                          <li>{order.selectedAddress.email}</li>
                          <li>{order.selectedAddress.phone}</li>
                          <li>
                            {order.selectedAddress.street},{"  "}
                            {order.selectedAddress.city}
                          </li>
                          <li></li>
                          <li>
                            {order.selectedAddress.region},{"  "}
                            {order.selectedAddress.postalCode}
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <strong>Total </strong>{" "}
                      <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-base">
                        ${order.totalAmount}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editStatus ? (
                        <select
                          onChange={(e) => handleOrderStatus(e, order)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                        >
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseStatus(
                            order.status
                          )} py-1 px-3 rounded-full text-sm`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div
                          onClick={() => handleViewOrder(order)}
                          className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                        <div
                          onClick={() => {
                            handleEditOrder(order);
                          }}
                          className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </div>
                        {/* <div className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Starts */}
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}
