import axios from 'axios';
import {useEffect,useState} from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({cart}) {
  const [products,setProducts]=useState([]);
  
  // has two values name of data and updater function
  useEffect(()=>{
    const getHomeData=async ()=>{
      const response=await axios.get('/api/products')
      setProducts(response.data);
    };
    getHomeData();
  },[]);
  // [] is a dependency arry and lets us control when useEffect runs 
  // - [] empty means only once
  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products}/>
      </div>
    </>
  );
}