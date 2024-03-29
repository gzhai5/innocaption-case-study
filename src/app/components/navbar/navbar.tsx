/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Product } from "../../apis/main/interfaces";
import { searchProducts } from "@/app/apis/main/apis";
import AlertBox, { AlertType } from "../alert/alert";


export default function Navbar({ cartItems, onCartChange, onSearch }: { cartItems: Product[], onCartChange: (results: Product[]) => void, onSearch: (results: Product[]) => void }) {
    const cartItemsCount = cartItems.length;
    const cartItemsPrice = cartItems.reduce((total, item) => total + item.price * (1 - item.discountPercentage / 100), 0).toFixed(2);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [alert, setAlert] = useState<AlertType | null>(null);

    // handle cart drawer open/close
    const toggleDrawer = () => {
        const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement;
        if (drawerCheckbox) {
            drawerCheckbox.checked = !drawerCheckbox.checked;
        }
    };

    // handle deleting items from cart
    const handleDelete = (item: Product) => {
        const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
        onCartChange(updatedCartItems);
    };

    // handle search form submit
    const handleSearchSubmit = async (e: any) => {
        e.preventDefault();
        if (!searchTerm) return;
        searchProducts(searchTerm).then((data) => {
            onSearch(data.products);
        });
    };

    // handle purchase items in cart
    const handlePurchase = () => {
        if (cartItems.length === 0) {
            setAlert({ status: "error", message: "Your cart is empty!", onClose: () => {} });
            return;
        } else {
            setAlert({ status: "success", message: "Your order is being placed!", onClose: () => {} });
            onCartChange([]);
        }
    };

    return (
        <div className="navbar bg-slate-100">

            {/* website title */}
            <div className="flex-1">
                <button onClick={() => onSearch([])}>
                    <a className="btn btn-ghost text-xl text-black">InnoCaption</a>
                </button>
            </div>

            <div className="flex-none gap-2">

                {/* search bar */}
                <div className="form-control">
                    <form onSubmit={handleSearchSubmit}>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={searchTerm} 
                            onChange={(e)=>setSearchTerm(e.target.value)} 
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                  handleSearchSubmit(event);
                                }
                            }}
                            className="input input-bordered w-24 md:w-auto bg-slate-100 text-black" 
                        />
                    </form>
                </div>

                {/* cart */}
                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={toggleDrawer}>
                            <div className="indicator text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item bg-slate-100 text-black">{cartItemsCount}</span>
                            </div>
                        </div>
                    </div> 
                    <div className="drawer-side z-50">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-slate-100 text-base-content">
                        
                            {/* Header: Total items and total price */}
                            <li className="menu-title">
                                <span>Your Cart - {cartItemsCount} Items</span>
                                <span>Total: ${cartItemsPrice}</span>
                            </li>

                            {/* List of Cart Items */}
                            {cartItems.map((item, index) => (
                                <li key={index} className="border-b border-gray-200 mb-2">
                                    <div className="flex items-center space-x-3">
                                        <img src={item.images[0]} alt={item.title} className="h-10 w-10 object-cover" />
                                        <div>
                                            <div className="font-semibold">{item.title}</div>
                                            <div>${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}</div>
                                            {item.discountPercentage > 0 && (
                                                <span className="text-gray-500 text-sm line-through">${item.price}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => handleDelete(item)} className="btn btn-outline btn-secondary" aria-label="Remove item">
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}

                            {/* Footer: Checkout button */}
                            <li>
                                <button className="btn btn-primary w-full mt-4" onClick={handlePurchase}>Checkout</button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* profile dropdown */}
                <div className="dropdown dropdown-end ">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-100 text-black rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>

            {/* alert box */}
            {alert && <AlertBox status={alert.status} message={alert.message} onClose={() => setAlert(null)} />}
        </div>
    )
}