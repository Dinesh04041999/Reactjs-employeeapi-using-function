 import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import RegisterForm1 from "./components/RegisterForm1";


function Addmodel(props)  {
 
 const [isOpen, setOpen] = useState(false);


  const openModal = () => setOpen(!isOpen);
   const closeModal = () => setOpen(!isOpen);

  function saveEmpDetail(e) {
    props.passemployee(e);
     closeModal(e);
  }

  function cancelForm(e){
    closeModal(e);
  }



    return (
      <>
        <div>
          <h1 style={{ marginTop: '10px', textAlign: 'center' }}> Employee List</h1>
          <Button color="primary" style={{ float: 'right' }} onClick={openModal} >
            Add Employee
          </Button>


          <Modal size="xl" show={isOpen} onHide={closeModal}>
            <RegisterForm1
              totalUsers={props.totalUsers}
              saveEmpDetail={(e) => saveEmpDetail(e)}
               cancelForm={(e) => cancelForm(e)}
            />
            
          </Modal>
          
        </div>
      </>

    );

  }

export default Addmodel;
