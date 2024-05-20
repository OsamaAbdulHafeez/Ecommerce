import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {

  const dispatch  = useDispatch()
  const product = useSelector(state=>state.product.product)
  console.log(product)
  useEffect(()=>{
    getProducts(dispatch)
  },[dispatch])


  const handleDelete = (id) => {
    deleteProduct(dispatch,id)
    
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 210 },
    {
      field: "product",
      headerName: "Product",
      width: 320,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 130 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productListContainer">
    <Link to='/newproduct' className="addNew"><button>Add New Product</button></Link>
    <div className="productList">
      <DataGrid
        rows={product}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row)=>row._id}
        checkboxSelection
      />
    </div>
    </div>

  );
}
