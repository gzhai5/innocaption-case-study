/* eslint-disable @next/next/no-img-element */
"use client";
import Navbar from "../components/navbar/navbar";
import React, { useState, useEffect } from "react";
import { Products, Product } from "../apis/main/interfaces";
import { getAllProducts, addItemToCart, getAllCategories } from "../apis/main/apis";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export default function Main() {
    const [allProducts, setAllProducts] = useState<Products>({} as Products);
    const [products, setProducts] = useState<Products>({} as Products);
    const [categories, setCategories] = useState<string[]>([]);
    const [currentCategories, setCurrentCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        getAllProducts().then((data) => {
            setAllProducts(data);
            setProducts(data);
        });
        getAllCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    // handle adding products to cart
    const addToCart = (productToAdd: Product) => {
        addItemToCart(productToAdd.title)
        setCartItems(prevItems => {
          return [...prevItems, productToAdd];
        });
    };

    // handle changing category: filter products by category
    const handleCategory = (category: string) => {
        let updatedCategories: string[] = [];
        if (currentCategories.includes(category)) {
            updatedCategories = currentCategories.filter(c => c !== category);
        } else {
            updatedCategories = [...currentCategories, category];
        }
        setCurrentCategories(updatedCategories);
    
        let filteredProducts = allProducts.products?.filter(product => 
            updatedCategories.length === 0 || updatedCategories.includes(product.category)
        );
        setProducts({ ...products, products: filteredProducts });
    }

    // handle page content change based on search results
    const handleSearchResults = (results: Product[]) => {
        if (results.length === 0) {
            setProducts(allProducts);
        } else {
            setProducts({ ...products, products: results });
        }
    }

    // handle getting current products for the current page
    const currentProducts = products.products?.slice((currentPage-1)*6, (currentPage-1)*6+6) || [];

    return (
        <>
            <Navbar cartItems={cartItems} onSearch={handleSearchResults}/>

            <div className="w-full bg-gray-500 p-16 flex flex-col gap-16 items-center">

                {/* collapse tags */}
                <div className="collapse">
                    <input type="checkbox" aria-label="Toggle Content" /> 
                    <div className="collapse-title text-xl font-medium">
                        Not sure what you are looking for?
                    </div>
                    <div className="collapse-content"> 
                        {categories.map((category, index) => (
                            <button key={index} className={`btn m-5 ${currentCategories.includes(category) ? 'btn-active' : 'glass'}`} onClick={() => handleCategory(category)}>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* title */}
                <div className="text-5xl">{currentProducts.length > 0? "Shop Top Seller" : "Sorry, We Can Not Find Any Related Product"}</div>

                {/* products */}
                <div className="grid grid-cols-3 gap-20">
                    {currentProducts.map(product => (
                        <div key={product.id} className="card card-compact w-80 bg-base-100 shadow-xl">

                            {/* product sliding images container */}
                            <div className="w-full carousel rounded-t-lg h-72">
                                {product.images.map((image, index) => (
                                    <div className="carousel-item w-full" key={index}>
                                        <img src={image} className="w-full" alt={product.title} />
                                    </div> 
                                ))}
                            </div>
                            
                            {/* product details */}
                            <div className="card-body flex flex-col justify-between">
                                <h2 className="card-title">{product.title}</h2>

                                {/* products prices & cart button */}
                                <div className="card-actions flex flex-row gap-4 justify-end items-start p-2">
                                    <div className="flex flex-row gap-2 items-center mt-3">
                                        <span className="text-black text-sm font-semibold">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                                        {product.discountPercentage > 0 && (
                                            <span className="text-gray-500 text-sm line-through">${product.price}</span>
                                        )}
                                    </div>
                                    <IconButton onClick={() => addToCart(product)}>
                                        <AddShoppingCartIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* pagination */}
                {Math.ceil(products.products?.length / 6) > 1 &&
                    <div className="join">
                        {Array.from({ length: Math.ceil(products.products?.length / 6) }, (_, i) => i + 1).map(number => (
                            <button key={number} onClick={() => setCurrentPage(number)} className="join-item btn">
                                {number}
                            </button>
                        ))}
                    </div>}
            </div>
        </>
    )
}