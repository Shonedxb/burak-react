import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product } from "../../../lib/types/product";

//** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
    products,
}));

const products = [
    { productName: "Cutlet", imagePath: "/img/cutlet.webp" },     
    { productName: "Kebab", imagePath: "/img/kebab.webp" },     
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },     
    { productName: "Lavash", imagePath: "/img/lavash.webp" },
    { productName: "Cutlet", imagePath: "/img/cutlet.webp" },     
    { productName: "Kebab", imagePath: "/img/kebab.webp" },     
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },     
    { productName: "Lavash", imagePath: "/img/lavash.webp" }, 
];  


export default function Products() {
    return (
        <div className={"products"}>
            <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}>
                        <Stack className={"top-text"}>
                            <p>Burak Restaurant</p>

                            <Stack className={"single-search-big-box"}>
                                <input 
                                    type={"search"}
                                    className={"single-search-input"}
                                    name={"singleReasearch"}
                                    placeholder={"Type here"}
                                />

                                <Button 
                                    className={"single-button-search"}
                                    variant="contained"
                                    endIcon={<SearchIcon />}
                                    >
                                        Search
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                className={"order"}
                            >
                            New
                            </Button>
                            <Button
                                variant={"contained"}
                                color={"secondary"}
                                className={"order"}
                            >
                            Price
                            </Button>
                            <Button
                                variant={"contained"}
                                color={"secondary"}
                                className={"order"}
                            >
                            Views
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <div className={"category-main"}>
                                <Button variant={"contained"} color={"secondary"}>
                                    Other
                                </Button>
                                <Button variant={"contained"} color={"secondary"}>
                                    Dessert
                                </Button>
                                <Button variant={"contained"} color={"secondary"}>
                                    Drink
                                </Button>
                                <Button variant={"contained"} color={"secondary"}>
                                    Salad
                                </Button>
                                <Button variant={"contained"} color={"secondary"}>
                                    Dish
                                </Button>
                            </div>
                        </Stack>

                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ? (
                                products.map((product, index) => {
                                    return (
                                        <Stack key={index} className={"product-card"}>
                                            <Stack
                                                className={"product-img"}
                                                sx={{ backgroundImage: `url(${product.imagePath})` }}
                                            >
                                                <div className={"product-sale"}>Normal size</div>
                                                <Button className={"shop-btn"}>
                                                    <img
                                                        src={"/icons/shopping-cart.svg"}
                                                        style={{ display: "flex" }}
                                                    />
                                                </Button>
                                                <Button className={"view-btn"} sx={{ right: "36px" }}>
                                                    <Badge badgeContent={20} color="secondary">
                                                        <RemoveRedEyeIcon
                                                            sx={{
                                                                color: 0 ? "gray" : "white",
                                                            }}
                                                        />
                                                    </Badge>
                                                </Button>
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>
                                                <div className={"product-desc"}>
                                                    <MonetizationOnIcon />
                                                    {12}
                                                </div>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            ) : (
                                <Box className="no-data">Products not available!</Box>
                            )}
                    </Stack>
                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination
                            count={3}
                            page={1}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                        />
                    </Stack>
                </Stack>
            </Container>

            <div className={"brands-logo"}>
                <Container className={"family-brands"}>
                    <Box className={"category-title"}>Our Family Brands</Box>
                    <Stack className={"brand-list"}>
                        <Box className={"review-box"}>
                            <img src={"/img/gurme.webp"} alt="" />
                        </Box>

                        <Box className={"review-box"}>
                            <img src={"/img/sweets.webp"} alt="" />
                        </Box>

                        <Box className={"review-box"}>
                            <img src={"/img/seafood.webp"} alt="" />
                        </Box>

                        <Box className={"review-box"}>
                            <img src={"/img/doner.webp"} alt="" />
                        </Box>
                </Stack>
                </Container>
            </div>

            <div className={"address"}>
                <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}>Our Address</Box>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.171365426825!2d55.27692297599699!3d25.197442831689653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93b69d!2sDubai%20Mall!5e0!3m2!1sen!2sae!4v1745692698271!5m2!1sen!2sae" 
                        width="600" height="450"
                        ></iframe>
                    </Stack>
                </Container>
            </div>
            </div>
    );
}