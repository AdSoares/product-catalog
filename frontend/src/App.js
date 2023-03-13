import React, { useState, useCallback, useEffect } from 'react'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'

function App(props) {

  const [items, setItems] = useState([])
  const[form, setValues] = useState({
    filter: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const getItems= useCallback(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + '/Product?filter=' + form.filter)
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }, [form.filter]);

  const addItemToState = (item) => {
    setItems([...items, item])
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  useEffect(() => {
    getItems()
  }, [getItems]);

  const search = () => {
    getItems()
  }

  return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Catálogo de Produtos</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input type="text" name="filter" id="filter" onChange={onChange} value={form.filter === null ? '' : form.filter}  />
          </Col>
          <Col>
            <Button
              onClick={search}>
                Consultar
            </Button>
          </Col>
          <Col>
            <ModalForm buttonLabel="Novo" item={null} addItemToState={addItemToState} refreshState={search} />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} refreshState={search} />
          </Col>
        </Row>
      </Container>
  )
}

export default App