import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

function DataTable(props){
  const deleteItem = id => {
    let confirmDelete = window.confirm('Deseja excluir o produto permanentemente?')
    if(confirmDelete){
      fetch(process.env.REACT_APP_BACKEND_URL + '/Product/' + id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }
  }

  let items = null;

  if (props.items === null || props.items.length === 0) {
    items = (
      <tr key={0}>
        <td colSpan={6} style={{ textAlign: 'center', margin: 20 }}>
          <h4>Nenhum produto encontrado.</h4>
        </td>
      </tr>  
    )
  } else {
    items = props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.description}</td>
          <td>{item.type}</td>
          <td>{new Date(item.launchDate).toLocaleDateString('pt-BR')}</td>
          <td>{item.price}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Editar" item={item} updateState={props.updateState} refreshState={props.refreshState}/>
              {' '}
              <Button color="danger" onClick={() => deleteItem(item.id)}>Excluir</Button>
            </div>
          </td>
        </tr>
        )
      })
  }

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Código</th>
          <th>Descrição</th>
          <th>Tipo do Produto</th>
          <th>Data de Lançamento</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable