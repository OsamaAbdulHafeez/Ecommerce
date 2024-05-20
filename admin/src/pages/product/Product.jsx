import { Link, useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { baseConverter } from "../../utils/baseurl";
export default function Product() {
    console.log("hello Uncle")
    const file = useRef()
    const [profileImg, setProfileImg] = useState('')
    const Title = useRef()
    const Description = useRef()
    const Price = useRef()
    const Categories = useRef([])
    const Size = useRef([])
    const Color = useRef([])
    const Stock = useRef()
    const dispatch = useDispatch()
    const loaction = useLocation()
    const naviagte = useNavigate()
    const productId = loaction.pathname.split('/')[2]
    const [pStat, setPStat] = useState([])
    const MONTHS = useMemo(() => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ], [])
    useEffect(() => {
        const getStat = async () => {
            try {
                const res = await userRequest.get(`/order/income?pId=${productId}`)
                const list = res.data.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map(item => {
                    setPStat(prev => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total }
                    ])
                })
            } catch (error) {

            }
        }
        getStat()
    }, [MONTHS, productId])
    const product = useSelector(state => state.product.product?.find((product) => product._id === productId))
    console.log(product)
    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await baseConverter(file)
        setProfileImg(base64)
        console.log(base64)
    }
    const updateHandler = (e) => {
        e.preventDefault()

        const category = Categories.current.value ? Categories.current.value.split(',') : product.categories
        const sizes = Size.current.value ? Size.current.value.split(',') : product.size
        const colors = Color.current.value ? Color.current.value.split(',') : product.color
        const data = new FormData()
        data.append("title", Title.current.value || product.title)
        data.append("desc", Description.current.value || product.desc)
        data.append("img", file.current.files[0] || product.img)
        category.map((category, index) => {
            data.append(`categories[${index}]`, category)
        })
        sizes.map((size, index) => {
            data.append(`size[${index}]`, size)
        })
        colors.map((color, index) => {
            data.append(`color[${index}]`, color)
        })
        data.append("price", Price.current.value || product.price)
        data.append("inStock", Stock.current.value || product.inStock)


        data.forEach((value, key) => {
            console.log(key + ': ' + value);
        });
        updateProduct(productId, data, dispatch)
        naviagte('/products')
    }
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStat} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Product ID:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                {/* <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product.title} />
                        <label>Product Description</label>
                        <input type="text" placeholder={product.desc} />
                        <label>Price</label>
                        <input type="text" placeholder={product.price} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form> */}
                <h2>UPDATE PRODUCT</h2>
                <form className="updateProductForm" onSubmit={updateHandler}>
                    <div className="updateProductRow">
                        <div className="updateProductItem">
                            <label>Title</label>
                            <input type="text" placeholder={product.title} ref={Title} />
                        </div>
                        <div className="updateProductItem">
                            <label>Description</label>
                            <input type="text" placeholder={product.desc} ref={Description} />
                        </div>
                        <div className="updateProductItem">
                            <label>Price</label>
                            <input type="text" placeholder={product.price} ref={Price} />
                        </div>
                        <div className="updateProductItem">
                            <label>Categories</label>
                            <input type="text" placeholder={product.categories} ref={Categories} />
                        </div>
                    </div>
                    <div className="updateProductRow">
                        <div className="updateProductItem">
                            <label>Size</label>
                            <input type="text" placeholder={product.size} ref={Size} />
                        </div>
                        <div className="updateProductItem">
                            <label>Color</label>
                            <input type="text" placeholder={product.color} ref={Color} />
                        </div>
                        <div className="updateProductItem">
                            <label>Stock</label>
                            <select ref={Stock}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="updateProductRow">
                        <div className="updateProductItem" style={{ justifyContent: 'center' }}>
                            <img src={profileImg || product.img} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e)} ref={file} />
                        </div>
                        <button className="updateProduct" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
