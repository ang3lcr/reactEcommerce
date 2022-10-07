import { useState } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import '../styles/productDetails.css'


function ProductDetails() {


  const { id } = useParams();
  const productsList = useSelector(state => state.products);

  const productDetail = productsList.find(product => product.id === Number(id))
  
  const relatedProducts = productsList.filter(
    product => product.category?.id === productDetail.category?.id
    )

  return (
    <Row>
      <Col>
      <div className='main'>

        <h1>{productDetail?.title}</h1>
            <img  className="product-detail-img" src={productDetail?.productImgs[1]}/>
          <h2>{productDetail?.price}</h2>
        <p className='description'>{productDetail?.description}</p>
      </div>
        
      </Col>
      <Col lg={3}>
          <ListGroup variant="flush" className='related-products'>
          {
              relatedProducts.map(product => (
                <ListGroup.Item key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    {product.title}<br/>
                    <img src={product.productImgs[2]}/>
                    </Link>
                </ListGroup.Item>
                
              ))
            }
          </ListGroup>
          </Col>
     </Row>
  )
}

export default ProductDetails;
