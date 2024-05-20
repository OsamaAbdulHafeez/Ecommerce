import { useRef, useState } from "react";
import "./newProduct.css";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
// import {v2 as cloudinary}  from 'cloudinary';

// cloudinary.config({
//   cloud_name: import.meta.env.VITE_CLOUD_NAME,
//   api_key: import.meta.env.VITE_API_KEY,
//   api_secret: import.meta.env.VITE_API_SECRET
// })
// const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
// const API_KEY = import.meta.env.VITE_API_KEY
// const API_SECRET = import.meta.env.VITE_API_SECRET
export default function NewProduct() {
  const file = useRef()
  const Title = useRef()
  const Description = useRef()
  const Price = useRef()
  const Categories = useRef([])
  const Size = useRef([])
  const Color = useRef([])
  const Stock = useRef()

  const dispatch  = useDispatch()
  const createHandler = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("title",Title.current.value)
    data.append("desc",Description.current.value)
    data.append("img",file.current.files[0])
    data.append("categories",Categories.current.value.split(','))
    data.append("size",Size.current.value.split(','))
    data.append("color",Color.current.value.split(','))
    data.append("price",Price.current.value)
    data.append("inStock",Stock.current.value)
    addProduct(data,dispatch)
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={createHandler}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" ref={file} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Apple Airpods" ref={Title} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="description..." ref={Description} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="text" placeholder="100" ref={Price} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,shirts" ref={Categories} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="S,M,L" ref={Size} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="Black,White" ref={Color} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select ref={Stock}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit" className="addProductButton">Create</button>
      </form>
    </div>
  );
}
