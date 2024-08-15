import {Row , Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
    { isLoading ? (<Loader/>) : error ? (<Message varient={'danger'}>{error?.data?.message || error.error}</Message>) : (<>
    <h1>Latest Prodcut</h1>
    <Row>
        {products.map((img)=> (
            <Col key={img._id} sm = {12} md ={6} lg= {4} xl = {3}>
                <Product product={img}/>
            </Col>
        ))}
    </Row></>)}
    
    </>

  )
}

export default HomeScreen