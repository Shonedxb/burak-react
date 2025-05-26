import React, { ChangeEvent, useEffect, useState } from "react";
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
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

//** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
    products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever);
    const [productSearch, setProductSearch] = useState<ProductInquiry>({
        page: 1,
                limit: 8,
                order: "createdAt",
                productCollection: ProductCollection.DISH,
                search: "",
    });
    
    const [searchText, setSearchText] = useState<string>("");
    const history = useHistory();


    useEffect(() => {
        const product = new ProductService();
        product 
            .getProducts(productSearch)
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    }, [productSearch]);

    /** HANDLERS (FILTERS) **/

    const searchCollectionHandler = (collection: ProductCollection) => {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({ ...productSearch });
    };

    /** PRICE, VIEWS, NEW FILTER **/
    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({ ...productSearch });
    };

    /** SEARCH BAR **/
    const searchProductHandler = () => {
        productSearch.search = searchText;
        setProductSearch({ ...productSearch });
    };

    /** SEARCH BAR "x" clear to default **/
    useEffect(() => {
        if (searchText === "") {
            productSearch.search = "";
            setProductSearch({ ...productSearch });
        }
    }, [searchText]);

     /** PAGINATION HANDLER - 1 to 2 to 3 page **/
     const paginationHandler = ( e: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({ ...productSearch });
     };

    /** CHOOSE PRODUCT ID for URL HANDLER **/
    const chooseDishHandler = (id: string) => {
        history.push(`/products/${id}`);
    };

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
                                    value={searchText}
                                    onChange={(e) => 
                                        setSearchText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") searchProductHandler();
                                    }}
                                />

                                <Button 
                                    className={"single-button-search"}
                                    variant="contained"
                                    endIcon={<SearchIcon />}
                                    onClick={searchProductHandler}
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
                                color={
                                    productSearch.order === "createdAt" ? "primary" : "secondary"
                                }
                                className={"order"}
                                onClick={() => searchOrderHandler("createdAt")}
                            >
                            New
                            </Button>

                            <Button
                                variant={"contained"}
                                color={
                                    productSearch.order === "productPrice" ? "primary" : "secondary"
                                }
                                className={"order"}
                                onClick={() => searchOrderHandler("productPrice")}
                            >
                            Price
                            </Button>

                            <Button
                                variant={"contained"}
                                color={
                                    productSearch.order === "productViews" ? "primary" : "secondary"
                                }
                                className={"order"}
                                onClick={() => searchOrderHandler("productViews")}
                            >
                            Views
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <div className={"category-main"}>
                                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.OTHER 
                                    ? "primary" 
                                    : "secondary"} 
                                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}>
                                    Other
                                </Button>

                                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DESSERT 
                                    ? "primary" 
                                    : "secondary"}
                                onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}>
                                    Dessert
                                </Button>

                                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DRINK 
                                    ? "primary" 
                                    : "secondary"}
                                    onClick={() => searchCollectionHandler(ProductCollection.DRINK)}>
                                    Drink
                                </Button>

                                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.SALAD 
                                    ? "primary" 
                                    : "secondary"}
                                onClick={() => searchCollectionHandler(ProductCollection.SALAD)}>
                                    Salad
                                </Button>

                                <Button 
                                variant={"contained"} 
                                color={
                                    productSearch.productCollection === ProductCollection.DISH 
                                    ? "primary" 
                                    : "secondary"}
                                onClick={() => searchCollectionHandler(ProductCollection.DISH)}>
                                    Dish
                                </Button>
                            </div>
                        </Stack>

                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ? (
                                products.map((product: Product) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    const sizeVolume = product.productCollection === ProductCollection.DRINK 
                                    ? product.productVolume + " litre" 
                                    : product.productSize + " size";
                                    return (
                                        <Stack 
                                            key={product._id} 
                                            className={"product-card"} 
                                            onClick={() => chooseDishHandler(product._id)}
                                            >
                                            <Stack
                                                className={"product-img"}
                                                sx={{ backgroundImage: `url(${imagePath})` }}
                                            >
                                                <div className={"product-sale"}>{sizeVolume}</div>
                                                <Button className={"shop-btn"}
                                                onClick={(e) => {
                                                    onAdd({
                                                        _id: product._id,
                                                        quantity: 1,
                                                        name: product.productName,
                                                        price: product.productPrice,
                                                        image: product.productImages[0],
                                                    });
                                                    e.stopPropagation();
                                                }}>
                                                    <img
                                                        src={"/icons/shopping-cart.svg"}
                                                        style={{ display: "flex" }}
                                                    />
                                                </Button>
                                                <Button className={"view-btn"} sx={{ right: "36px" }}>
                                                    <Badge badgeContent={product.productViews} color="secondary">
                                                        <RemoveRedEyeIcon
                                                            sx={{
                                                                color: 
                                                                    product.productViews === 0 ? "gray" : "white",
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
                                                    {product.productPrice}
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
                            count={products.length !== 0
                                ? productSearch.page + 1
                                : productSearch.page
                            }
                            page={productSearch.page}
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
                            onChange={paginationHandler}
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