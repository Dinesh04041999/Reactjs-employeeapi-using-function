import React, { useState,useEffect } from 'react'
import Addmodel from './Addmodel.js';
import { Modal, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm1 from './components/RegisterForm1';
import { deleteEmployee,addEmployee,fetchEmployee,updateEmployee } from './utils/api/employee';



function App () {

const [users,setusers]=useState([])
const [selecteduser,setselecteduser]=useState(null)
const[detailuser,setdetailuser]=useState(false)
const[showModel,setshowModel]=useState(false)
const[indexid,setindexid]=useState(null)



 const passemployee = async (e) => {
   const empass= await addEmployee(e);
  //  console.log(empass)
   
    users.push(empass);
    setusers( [...users] );
        console.log("add")
  
  }

  const updateForm = async (e) => {
     const empupd=await updateEmployee(e);
    //  console.log(empupd)
    setshowModel( !showModel );
    users.splice(indexid, 1, empupd);
    console.log("Updated");
    
  }

  const DeleteRow = async (index, name) => {
    if (window.confirm('Do you want to delete EmployeeName : ' + name)) {
      const empdel =users[index]
      // console.log(empdel)
      await deleteEmployee(empdel.id);
      users.splice(index, 1);
      setusers([...users]);
      console.log("Delete");

    }

  }


 const  Details = (index, users) => {
    setdetailuser( true );
    setselecteduser( users);
    setindexid(index)
  };

 const Update = (index, users) => {
    setindexid( index );
    setshowModel(true);
    setselecteduser(users);
  };


  //fetch = async () => {
  //   const empdata = await fetchEmployee();
  //   console.log("fetch")
  //   setselecteduser({ users: empdata })

  // }
   

  useEffect(()=>{
    async function fetchData() {
      const empdata = await fetchEmployee();
      // console.log(empdata);
       setusers(empdata);
       console.log("fetch")
     
    }
    fetchData();
    },[]);



  

    console.log("--------------------rendering145211411")

    let DisplayData = users.map((user, index) => {
      return (

        <tr key={index} style={{ textAlign: 'center' }}>
          <td>{user.id}</td>
          <td>{user.employeename}</td>
          <td>{user.employeesalary}</td>
          <td>{user.employeeage}</td>
          <td>{user.email}</td>
          <td>{user.designation}</td>
          {/* <td><img src={users.file} style={{ height: "50px" }} alt="logo" /></td> */}

          <td>
            <button
              className="btn btn-danger m-1"
              onClick={() => { DeleteRow(index, user.employeename); }}>
              Delete
            </button>
            <button className="btn btn-info m-1" onClick={() => Update(index, user)}>
              Update
            </button>

            <button className="btn btn-info m-1" onClick={() => Details(index, user)}>
              Details
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Addmodel
          passemployee={(e) => passemployee(e)}
          totalUsers={users.length}
        />

        <table className="table table-striped ">
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>EmployeeSalary</th>
              <th>EmployeeAge</th>
              <th>Email ID</th>
              <th>Designation</th>
              {/* <th>ProfileImage</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>

        <Modal size="xl" isOpen={showModel}>
          <ModalBody>
              <RegisterForm1
              data={selecteduser}
              updateForm={(e) => updateForm(e)}
              cancelForm={(e) => setshowModel(  !showModel )} />
          </ModalBody>
        </Modal>

        <Modal isOpen={detailuser}>
          <h3 style={{ marginTop: '25px' }}>Employee Details</h3>
          <ModalBody>
            <div className="container">
              <div className="text-center">
                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '150px', marginTop: '35px', }}>
                  <div className="col-md-4"></div>
                  <div
                    className="col-md-4"
                    style={{ border: 'solid 2px', borderRadius: '100px', width: '150px', overflow: "hidden" }}>
                    <img src={selecteduser ? selecteduser.file : ''} alt="logo" style={{ height: '120px', zIndex: '1' }}></img>
                  </div>
                  <div className="col-md-4"></div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }} >
                  <div className="col-md-4">
                    <label>EmployeeID</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {selecteduser ? selecteduser.id : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }}
                >
                  <div className="col-md-4">
                    <label>EmployeeName</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {selecteduser ? selecteduser.employeename : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }}>
                  <div className="col-md-4">
                    <label>EmployeeSalary</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {selecteduser ? selecteduser.employeesalary : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }}>
                  <div className="col-md-4">
                    <label>EmployeeAge</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {selecteduser ? selecteduser.employeeage : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }}
                >
                  <div className="col-md-4">
                    <label>Email</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {selecteduser ?selecteduser.email : ''}
                  </div>
                </div>

                <div
                  className="row mt-1"
                  style={{ padding: '0px 0px 0px 0px', height: '50px', marginTop: '35px', }} >
                  <div className="col-md-4">
                    <label>Designation</label>
                  </div>
                  <div className="col-md-2">
                    <label>-</label>
                  </div>
                  <div className="col-md-6">
                    {selecteduser ? selecteduser.designation : ''}
                  </div>
                </div>

                <div className="row">
                  <div className="col text-center">
                    <button
                      type="button"
                      className="btn btn-danger text-center m-1"
                      onClick={() => setdetailuser( !detailuser )} >
                      CLOSE
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary text-center m-1" onClick={() => {
                        setdetailuser(!detailuser )
                        Update(indexid,selecteduser)


                      }} >
                      EDIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }


export default App;
