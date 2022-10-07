import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import "../styles/home.css"

function Home() {

  const dispatch = useDispatch();
  const productsList = useSelector( state => state.products )
  const navigate = useNavigate();
  const [ categories, setCategories ] = useState([]);
  const [ productsFiltered, setProductsFiltered ] = useState([]);
  const [ searchValue, setSearchValue ] = useState("");

  useEffect(() => {
    axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
      .then(res => setCategories(res.data.data.categories))
  }, [])


  useEffect(() =>{
    setProductsFiltered(productsList)
  }, [productsList])

    const filterCategory = (categoryId) =>{
      const filtered = productsList.filter(product => product.category.id === categoryId
        )
        setProductsFiltered(filtered);
    }

    const searchProduct = () =>{
      alert(searchValue)
      const filtered = productsList.filter(
        product => product.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      setProductsFiltered(filtered)
    }

  return (
    <Row>
      <Col lg={3}>
        <ListGroup>
        {
          categories.map(category => (
            <ListGroup.Item 
            key={category.id}
            onClick={() => filterCategory(category.id)}
            style={{cursor: "pointer"}}
            >
              {category.name}
            </ListGroup.Item>
            
          ))
        }
        </ListGroup>
      </Col>
      <Col>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Searh product"
          onChange={e => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <Button variant="outline-secondary" onClick={searchProduct}>
          Button
        </Button>
      </InputGroup>
      <Row xs={1} md={2} className="g-4">
      {productsFiltered.map(product => (
        <Col key={product.id}>
          <Card  onClick={() => navigate(`/product/${product.id}`)} className="home-card">
            <div className="img-home-container">
            <Card.Img variant="top" src={product.productImgs[0]} className="card-img"/>
            </div>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {product.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  
      </Col>

    </Row>
  )
}

export default Home
