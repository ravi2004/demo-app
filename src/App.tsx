import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import restClient from './api/restClient';
import './App.css';
import { Modal, Table } from 'react-bootstrap';

const restCall = new restClient();

interface IProps {
}

interface IState {
  userData: [],
  restStatus: String,
  showalluser: boolean,
  showstatus: boolean,
  isShow: boolean
}


class App extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      userData: [],
      restStatus: "",
      showalluser: true,
      showstatus: false,
      isShow: false
    }

    this.onDataSubmit = this.onDataSubmit.bind(this);
    this.showAllUser = this.showAllUser.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.showStatus = this.showStatus.bind(this);
    this.hideStatus = this.hideStatus.bind(this);
  }

  async onDataSubmit(event: any) {
    event.preventDefault();
    const formData = {
      'userName': event.target.formFieldName.value,
      'userEmail': event.target.formFieldEmail.value,
      'userPassword': event.target.formFieldPassword.value
    }
    const dt = await restCall.registerUser(JSON.stringify(formData));
    console.log(dt);
    if((dt.status===200) && (dt.statusCode==="OK")){
      alert("Registration successfully completed")
    } else {
      alert("Registration Failed")
    }
  }


  showRegister(event: any) {
    event.preventDefault();
    this.setState({ ...this.state, showalluser: true });
  }

  async showAllUser(event: any) {
    event.preventDefault();
    const dt = await restCall.getAllUser();
    //console.log(dt);
    this.setState({ ...this.state, showalluser: false, userData: dt.result });
  }

  async showStatus(event: any) {
    event.preventDefault();
    const dt = await restCall.getRestStatus();
    const result = dt.result + '(Status Code: ' + dt.status + ' )';
    this.setState({ ...this.state, isShow: true, restStatus: result });
    //alert(dt.result + '(Status Code: ' + dt.status + ' )');
  }

  hideStatus(event: any) {
    event.preventDefault();
    this.setState({ ...this.state, isShow: false, restStatus: "" });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Demo Application
        </header>
        <Modal style={{ marginTop: '10%' }} show={this.state.isShow}>
          <Modal.Header closeButton onClick={this.hideStatus}>
            <Modal.Title>Rest Connectivity Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.restStatus}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.hideStatus}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="App-container">
          <span style={{ borderWidth: '2px', width: '50%' }} className='App-button-container '>
            {
              (this.state.showalluser) ?
                <Button variant="primary" type="button" onClick={this.showAllUser} >
                  Show All User
                </Button>
                :
                <Button variant="primary" onClick={this.showRegister} type="button">
                  Register User
                </Button>
            }
            <Button variant="primary" onClick={this.showStatus} type="button">
              Show Rest Status
            </Button>
          </span>
          {
            (this.state.showalluser) ?
              <div className="App-box">
                <Form className='form-container' onSubmit={this.onDataSubmit}>
                  <Form.Group className="mb-3" controlId="formFieldName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formFieldEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formFieldPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control current-password="false" type="password" placeholder="Password" />
                  </Form.Group>
                  <span className='App-button-container '>
                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                    <Button variant="primary" type="reset">
                      Cancel
                    </Button>
                  </span>
                  <Form.Text style={{ fontWeight: 'bold' }} >This is Demo application working with Rest + Mongo DB</Form.Text>
                </Form>
              </div>
              :
              <div className="App-table-box">
                <Table style={{width:'100%'}} >
                  <thead>
                    <tr className='table-th'>
                    <th className='table-th'>Sr. No.</th>
                      <th className='table-th'>User Name</th>
                      <th className='table-th'>Email ID</th>
                      <th className='table-th'>Password</th>
                    </tr>
                  </thead>
              <tbody>
                  {
                  
                    this.state.userData.map((data: any, index) => {

                      return <tr className='table-tr' key={index}>
                        <td className='table-td' style={{backgroundColor:(index%2)?'seashell': '#cdf6f6'}}>{index+1}</td>
                        <td className='table-td' style={{backgroundColor:(index%2)?'seashell':'#cdf6f6'}}>{data.userName}</td>
                        <td className='table-td' style={{backgroundColor:(index%2)?'seashell':'#cdf6f6'}}>{data.userEmail}</td>
                        <td className='table-td' style={{backgroundColor:(index%2)?'seashell':'#cdf6f6'}}>{data.userPassword}</td>
                      </tr>;
                    })
                  }

</tbody>
                </Table>
              </div>
          }
        </div>



      </div>
    );
  }
}

export default App;
