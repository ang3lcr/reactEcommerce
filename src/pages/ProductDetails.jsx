import { useState } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'

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
        <h1>{productDetail?.title}</h1>
        <img src={productDetail?.productImgs[1]}/>
      </Col>
      <Col lg={3}>
          <ListGroup variant="flush">
          {
              relatedProducts.map(product => (
                <ListGroup.Item key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.productImgs[2]}/>
                    {product.title}
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
