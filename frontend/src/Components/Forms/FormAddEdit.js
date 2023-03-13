import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {
  const[form, setValues] = useState({
    id: 0,
    description: '',
    type: 'Celular',
    launchDate: '',
    price: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onChangeDate = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const parseDate = (str) => {
    var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if(t !== null){
      var d = +t[1], m = +t[2], y = +t[3];
      var date = new Date(y, m - 1, d);
      if(date.getFullYear() === y && date.getMonth() === m - 1) {
        return date;   
      }
    }
  
    return null;
  }

  const testDate = (str) => {
    var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if(t === null)
      return false;
    var d = +t[1], m = +t[2], y = +t[3];
  
    // Below should be a more acurate algorithm
    if(m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return true;  
    }
  
    return false;
  }

  const isInputValid = () => {

    if (form.description === '') {
      alert("Descrição é obrigatória.");
      return false;
    }

    if (form.description.length > 2000) {
      alert("Descrição deve ter até 2000 caracteres.");
      return false;
    }

    if (form.type === '') {
      alert("Tipo do Produto é obrigatório.");
      return false;
    }

    if (form.launchDate === '') {
      alert("Data de Lançamento é obrigatória.");
      return false;
    }

    if (!testDate(form.launchDate)) {
      alert("Data de Lançamento inválida.");
      return false;
    }

    if (form.price === '') {
      alert("Valor é obrigatório.");
      return false;
    }

    if (isNaN(form.price)) {
      alert("Valor é inválido.");
      return false;
    }

    return true;
  }

  const submitFormAdd = e => {
    e.preventDefault()

    if (!isInputValid()) return;

    fetch(process.env.REACT_APP_BACKEND_URL + '/Product', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: form.description,
        type: form.type,
        launchDate: parseDate(form.launchDate),
        price: Number(form.price)
      })
    })
      .then(response => response.json())
      .then(item => {
        setValues({
          id: 0,
          description: '',
          type: '',
          launchDate: '',
          price: ''
        });
        props.refreshState();
        props.toggle();
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()

    if (!isInputValid()) return;

    fetch(process.env.REACT_APP_BACKEND_URL + '/Product/' + form.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: form.id,
        description: form.description,
        type: form.type,
        launchDate: parseDate(form.launchDate),
        price: Number(form.price)
      })
    })
      .then(response => response.json())
      .then(item => {
        setValues({
          id: 0,
          description: '',
          type: '',
          launchDate: '',
          price: ''
        });
        props.refreshState();
        props.toggle();
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(props.item){

      const { id, description, type, launchDate, price } = props.item
      setValues({ id, description, type, launchDate: new Date(launchDate).toLocaleDateString('pt-BR'), price })
    }
  }, [props.item])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      { form.id !== 0 && <FormGroup>
        <Label for="id">Código</Label>
        <Input type="text" name="id" id="id" onChange={onChange} readOnly={true} value={form.id === null ? '' : form.id} />
      </FormGroup> }
      <FormGroup>
        <Label for="description">Descrição</Label>
        <Input type="text" name="description" id="description" onChange={onChange} value={form.description === null ? '' : form.description} />
      </FormGroup>
      <FormGroup>
        <Label for="type">Tipo do Produto</Label><br></br>
        <Input type={"select"} name="type" value={form.type === null ? '' : form.type} onChange={onChange}
          style={{ width: '100%', height: 30 }}>
          <option value={"Celular"}>Celular</option>
          <option value={"Tablet"}>Tablet</option>
          <option value={"Notebook"}>Notebook</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="launchDate">Data do Lançamento</Label>
        <Input type="text" name="launchDate" id="launchDate" onChange={onChangeDate} value={form.launchDate === null ? '' : form.launchDate}  />
      </FormGroup>
      <FormGroup>
        <Label for="price">Valor</Label>
        <Input type="number" name="price" id="price" onChange={onChange} value={form.price === null ? '' : form.price}  />
      </FormGroup>
      <Button>Salvar</Button>
    </Form>
  )
}

export default AddEditForm