/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../apis/main/interfaces";


export default function Navbar({ cartItems }: { cartItems: Product[] }) {
    const cartItemsCount = cartItems.length;
    const cartItemsPrice = cartItems.reduce((total, item) => total + item.price * (1 - item.discountPercentage / 100), 0).toFixed(2);

    // handle cart drawer open/close
    const toggleDrawer = () => {
        const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement;
        if (drawerCheckbox) {
            drawerCheckbox.checked = !drawerCheckbox.checked;
        }
    };

    return (
        <div className="navbar bg-base-100">

            {/* website title */}
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">InnoCaption</a>
            </div>

            <div className="flex-none gap-2">

                {/* search bar */}
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>

                {/* cart */}
                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={toggleDrawer}>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">{cartItemsCount}</span>
                            </div>
                        </div>
                    </div> 
                    <div className="drawer-side z-50">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        
                            {/* Header: Total items and total price */}
                            <li className="menu-title">
                                <span>Cart - {cartItemsCount} Items</span>
                                <span>Total: ${cartItemsPrice}</span>
                            </li>

                            {/* List of Cart Items */}
                            {cartItems.map((item, index) => (
                                <li key={index} className="border-b border-gray-200 mb-2">
                                    <div className="flex items-center space-x-3">
                                        <img src={item.images[0]} alt={item.title} className="h-10 w-10 object-cover" />
                                        <div>
                                            <div>{item.title}</div>
                                            <div>${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}</div>
                                            {item.discountPercentage > 0 && (
                                                <span className="text-gray-500 text-sm line-through">${item.price}</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}

                            {/* Footer: Checkout button */}
                            <li>
                                <button className="btn btn-primary w-full mt-4">Checkout</button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* profile dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}