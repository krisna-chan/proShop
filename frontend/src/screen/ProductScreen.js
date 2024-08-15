import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { Row,Col,Image, ListGroup ,  Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const {id : productId} = useParams();
  const {data: product , isLoading , error} = useGetProductDetailQuery(productId);
return (
  <>
  <Link className="btn btn-lightd my-3" to= '/'>Go Back</Link>

  {isLoading ? (<Loader/>) : error? (<Message varient={'danger'}>{error?.data?.message || error.error}</Message>) : (<>
  
  <Row>
    <Col md = {5}>
    <Image src={product.image} alt={product.name} fluid/>
    </Col>
    <Col md = {4}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>{product.name}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating value={product.rating} text={product.numReviews}/>
          <ListGroupItem className="p-3 my-3">Price: ${product.price}</ListGroupItem>
        </ListGroup.Item>

        <ListGroup>
      <ListGroup.Item> Brand: {product.brand} </ListGroup.Item>
      <ListGroup.Item>Stock: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} </ListGroup.Item>
      <ListGroup.Item>Describtion: {product.description} </ListGroup.Item>
    </ListGroup>
        
      </ListGroup></Col>
    <Col md = {3}>


    <ListGroup.Item>
      <Button className="btn-block" disabled={product.countInStock === 0}>Add to Cart</Button>
    </ListGroup.Item>
    </Col>
  </Row>
  </>)}
  </>
  )
}

export default ProductScreen