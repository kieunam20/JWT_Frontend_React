import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import { fetchGroup, createNewUser } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModelUser = (props) => {
  const{ action, dataModelUser} = props;


  const defaultUserData = {
    email:'' ,
    phone:'',
    username:'',
    password:'',
    address:'',
    sex:'',
    group:''
  }

  const validInputsDefault = {
    email: true ,
    phone:true ,
    username:true ,
    password:true ,
    address:true ,
    sex:true ,
    group: true ,
  }
  const [userData, setUserData] = useState(defaultUserData);
  const[validInputs, setValidInputs] = useState(validInputsDefault);

  const [userGroups, setUserGroups] = useState([]);
  useEffect(() =>{
    getGroups();
   
  }, [])

   useEffect(() =>{
    
    if(action === 'UPDATE'){
      setUserData({...dataModelUser, group: dataModelUser.Group ? dataModelUser.Group.id : ''});
    }
  }, [dataModelUser])

  useEffect(() =>{
    if(action === "CREATE"){
     if(userGroups && userGroups.length > 0 ){
      setUserData({...userData, group: userGroups[0].id } )
     }
      
    }
  }, [action])



  const getGroups = async () =>{
    let res = await fetchGroup();
    if(res && res.data && res.data.EC ===0 ){
      setUserGroups(res.data.DT);
      if(res.data.DT && res.data.DT.length > 0){
        let groups = res.data.DT;
        setUserData({...userData, group: groups[0].id } )
      }
    }else{
      toast.error(res.data.EM);
    }
  }
      const handleOnChangeInput = ( value, name) =>{
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
      }

      const checkValidateInputs = () =>{
          //create user
          setValidInputs(validInputsDefault);

          let arr = ['email', 'phone', 'password', 'group'];
          let check = true;
          for(let i =0 ;i<arr.length;i++ ){
            if(!userData[arr[i]]){
             
              let _validInputs = _.cloneDeep(validInputsDefault);
               _validInputs[arr[i]] = false;
              setValidInputs(_validInputs);

               toast.error(`empty input ${[arr[i]]}`);
              check= false;
              break;
            }
          }
          return check;
      }
      const handleConFirmUser = async () => {
       let check = checkValidateInputs();
       if(check === true){
        let res = await createNewUser({...userData, groupId : userData['group']});
        if(res.data && res.data.EC ===0){
             props.onHide();
             setUserData({...defaultUserData, group: userGroups[0].id } )
        }
        if(res.data && res.data.EC !==0 ){
          toast.error(res.data.EM);
           let _validInputs = _.cloneDeep(validInputsDefault);
               _validInputs[res.data.DT] = false;
              setValidInputs(_validInputs);
        }
       }
      }

   const handleCloseModelUser = () => {
    
    props.onHide();
    setUserData(defaultUserData);
    setValidInputs(validInputsDefault);

   }   

        return(
            <> 
            <Modal

      size="lg" show = {props.show} className="model-user" onHide={() =>handleCloseModelUser() }>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <span> { props.action === 'CREATE' ? 'create new user' : 'Edit a user'} </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='content-body row' > 
          <div className='col-12 col-sm-6 form-group'>
            <label> Email address(<span style={{ color: "red" }}>*</span>): </label> 
             <input 
             disabled = { action === 'CREATE' ? false : true}
              className=  {validInputs.email  ? 'form-control' : 'form-control is-invalid' }
             type='email' value={userData.email} 
                onChange={(event) =>handleOnChangeInput(event.target.value, "email")}
             />
          </div>
          <div className='col-12 col-sm-6 form-group'>
            <label> Phone Number(<span style={{ color: "red" }}>*</span>): </label> 
             <input  disabled = { action === 'CREATE' ? false : true}
              className=  {validInputs.phone  ? 'form-control' : 'form-control is-invalid' } 
              type='text' value={userData.phone} 
              onChange={(event) =>handleOnChangeInput(event.target.value, "phone")}
             />
          </div>
          <div className='col-12 col-sm-6 form-group'>
            <label> Username(<span style={{ color: "red" }}>*</span>): </label> 
             <input className='form-control' type='text' value={userData.username}
              onChange={(event) =>handleOnChangeInput(event.target.value, "username")}
             />
          </div>
          
            <div className='col-12 col-sm-6 form-group'>
              {
            action === 'CREATE'
            &&
            <> 
            <label> Password(<span style={{ color: "red" }}>*</span>): </label> 
             <input  className=  {validInputs.password  ? 'form-control' : 'form-control is-invalid' } type='password' value={userData.password}
              onChange={(event) =>handleOnChangeInput(event.target.value, "password")}
             />
             </>
                   }
                </div>
         
          
       
          <div className='col-12 col-sm-12 form-group'>
            <label> Address(<span style={{ color: "red" }}>*</span>): </label> 
             <input className='form-control' type='text' value={userData.address}
              onChange={(event) =>handleOnChangeInput(event.target.value, "address")}
             />
          </div>
           <div className='col-12 col-sm-6 form-group'>
            <label> Gender : </label> 
              <select className='form-select'
               onChange={(event) =>handleOnChangeInput(event.target.value, "sex")}
                 value={userData.sex}
              >
              <option defaultValue="Male"> Male </option>
               <option value="Female">Female </option>
              </select>
          </div>
           <div className='col-12 col-sm-6 form-group'>
            <label> Group (<span style={{ color: "red" }}>*</span>): </label> 
             <select  className=  {validInputs.group  ? 'form-select ' : 'form-select  is-invalid' } 
              onChange={(event) =>handleOnChangeInput(event.target.value, "group")}
              value={userData.group}
             >
              { userGroups.length > 0 &&
                userGroups.map((item, index) =>{
                  return (
                    <option key={`Group-${index}`}  value={item.id} > {item.name} </option>
                  )
                })

              }
              </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary " onClick={() => handleCloseModelUser() }>Close</Button>
        <Button variant="primary" onClick={() => handleConFirmUser()}>
           {action === 'CREATE' ? 'Save' : 'Update'}
          </Button>
      </Modal.Footer>
    </Modal>
            
            </>
        )
}

export default ModelUser;