import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersByUserIdAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import { discountedPrice } from "../../../app/constants";

export default function UserOrders() {
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrdersByUserIdAsync(user.id));
  }, [dispatch, user.id]);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Order #{order.id}
              </h1>
              <h4 className="my-5 font-bold tracking-tight text-red-500">
                Order Status #{order.status}
              </h4>
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href=".#">{item.product.title}</a>
                            </h3>
                            <p className="ml-4">
                              ${discountedPrice(item.product) * item.quantity}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty : {item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                <p>Total Ordered Items</p>
                <p>{order.totalItems} Items</p>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Addresses
              </h2>
              <ul>
                <li className="flex justify-between gap-x-6 px-5 py-5 my-2 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.fullName}
                      </p>
                      <p className="text-sm   leading-6 text-gray-900">
                        {order.selectedAddress.email}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {order.selectedAddress.phone}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.street},{" "}
                      {order.selectedAddress.postalCode}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectedAddress.city}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectedAddress.region}
                    </p>
                  </div>
                </li>
              </ul>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Payment By : {order.selectPaymentMethod}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
