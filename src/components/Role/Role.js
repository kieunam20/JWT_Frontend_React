import { useEffect, useState, useRef } from 'react';
import './Roles.scss';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import {createRoles} from '../../services/roleService';
import TableRole from './TableRole';

const Roles = (props) =>{

    const dataChildDefault = {url:'' , description:'', isValidUrl: true }
    const childRef = useRef();

    const[listChilds, setListChilds] = useState({
        child1 : dataChildDefault
    })

    const handleOnchangeInput = (name, value,key) =>{
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;

        if( value && name ==='url' ){
            _listChilds[key]['isValidUrl'] = true;
        }
        setListChilds( _listChilds);
    }

    const handleAddNewInput = () =>{
         let _listChilds = _.cloneDeep(listChilds);
          _listChilds[`child-${uuidv4()}`] = dataChildDefault;


             setListChilds( _listChilds)
    }

     const handleDeleteInput = (key) =>{
         let _listChilds = _.cloneDeep(listChilds);
         delete  _listChilds[key];
          setListChilds( _listChilds);
     }

     const buildDataToPersist = () =>{
        let _listChilds = _.cloneDeep(listChilds);
        let result  =  [];
        Object.entries(_listChilds).map(([key, child], index) =>{
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result;
     }

     const handleSave = async () => {
    // Tìm các input không hợp lệ (url rỗng) kèm theo key
    let invalidEntries = Object.entries(listChilds).filter(([key, child]) => !child.url);

    if (invalidEntries.length === 0) {
       
        let data = buildDataToPersist();
        let res = await createRoles(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
           childRef.current.fetchListRolesAgain();

        }
    } else {
        // Có lỗi → cập nhật trạng thái lỗi cho input
        toast.error("Input URL must not be empty ...");

        let _listChilds = _.cloneDeep(listChilds);

        // Cập nhật tất cả các input lỗi
        for (let [key, child] of invalidEntries) {
            _listChilds[key]['isValidUrl'] = false;
        }

        setListChilds(_listChilds);
    }
};





     return(
            <div className='role-container'>
            <div className='container'>
            <div className='adding-roles mt-3'>
            <div className='title-role'><h4>Add a new roles.... </h4>  </div>
            <div className='role-parent'>
            {
                Object.entries(listChilds).map(([key, child], index ) => {
                    return(
                          <div className='row role child' key={`child-${key}`} >   
                                 <div className={`col-5 form-group ${key}`}> 
                                    <label> URL: </label>
                                    <input 
                                        type='text'
                                        className={child.isValidUrl ? 'form-control' : 'form-control is-invalid' }  
                                        value={child.url}
                                        onChange={(event) => handleOnchangeInput('url', event.target.value, key)}
                                    /> 
                                </div>
                                <div className='col-5 form-group'> 
                                <label> DESCRIPTION: </label>
                                    <input 
                                        type='text'
                                        className='form-control'
                                        value={child.description}
                                        onChange={(event) => handleOnchangeInput('description', event.target.value, key)}
                                    /> 
                                </div>
                                <div className='col-2 mt-4 actions'>
                                    <i className='fa fa-plus-circle add' onClick={() =>handleAddNewInput()}> </i>
                                    {index >=1 &&
                                          <i className='fa fa-trash-o delete' onClick={() => handleDeleteInput(key)}> 
                                          </i>} 
                                </div>
                            </div>
                    )

                })
            }
            <div>
                <button className='btn btn-warning mt-3' onClick={() => handleSave()}> Save </button>
            </div>        
            </div>
            </div>
            <hr />
            <div className='mt-3 table-role'> 
                <h4> List current roles :  </h4>
                <TableRole ref={childRef} />
            </div>

            </div>
            </div>
     );

}

export default Roles;