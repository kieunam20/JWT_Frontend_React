import { useEffect, useState } from "react";
import './Users.scss';
import {fetchAllUser , deleteUser} from "../../services/userService";
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { toast } from "react-toastify";
import ModelDelete from "./ModelDelete";
import ModelUser from "./ModelUser";
const Users = (props) =>{
        const [listUsers, setListUsers] = useState([]);
         const [currentPage, setCurrentPage] = useState(1);
          const [currentLimit, setCurrentLimit] = useState(3);
          const [totalPages, setTotalPages] = useState(0);
          
          //dataModel Delete
          const [ isShowModelDelete, setIsShowModelDelete] = useState(false);
          const [dataModel, setDataModel] = useState({});

          //dataModel update create User
        const [isShowModelUser, setIsShowModelUser] = useState(false);
        const [ actionModelUser, setActionModelUser] = useState("CREATE");
        const [ dataModelUser, setDataModelUser ] = useState({});
        useEffect(() =>{
          fetchUsers();
        }, [currentPage])

        const fetchUsers =  async () =>{
         let response =  await fetchAllUser(currentPage,currentLimit);
         if(response && response.data && response.data.EC === 0){           
        
            setTotalPages(response.data.DT.totalPages);
             setListUsers(response.data.DT.users);
         }
        }

        const handlePageClick = async (event) => {
          setCurrentPage(+event.selected + 1);
      //  await  fetchUsers(+event.selected + 1); 
        };

        const handleDeleteUser = async (user) =>{
          setDataModel(user) ;
          setIsShowModelDelete(true);
        
        }

        const handleClose = () => {
            setIsShowModelDelete(false);
              setDataModel({}) ;
        }
        const confirmDeleteUser = async () => {
           let response = await deleteUser(dataModel);
        if( response && response.data.EC ===0){
           toast.success(response.data.EM);
            await  fetchUsers();
            setIsShowModelDelete(false);
        }else{
          toast.error(response.data.EM);
        }
        }

        const onHideModelUser = async () =>{
          setIsShowModelUser(false);
          setDataModelUser({});
        await  fetchUsers();
        }

        const handleEditUser = (user) =>{
          setActionModelUser("UPDATE");
          setDataModelUser(user);
          setIsShowModelUser(true);
        }
        const handleRefesh = async () =>{
          await fetchUsers();
        }
    return (
      <> 
      <div className="container" >
        <div className="manage-users-container">
          <div className="user-header"> 
                <div className="title mt-3"> 
                  <h3>Manage user </h3>  
                </div>
            <div className="actions my-3"> 
                <button
                 className="btn btn-success refesh"
                 onClick={() => handleRefesh()}
                 >
                 <i className="fa fa-refresh" aria-hidden="true"></i> Refesh </button>
                 <button
                  className="btn btn-primary"
                  onClick= {() =>{ setIsShowModelUser(true); 
                    setActionModelUser("CREATE");
                   } } ><i className="fa fa-plus-circle"></i>
                     Add new user </button>
                 </div>
            </div>

        <div className="user-body">
         <table className="table table-bordered table-hover">

  <thead>
    <tr>
       <th scope="col">No </th>
      <th scope="col">Id</th>
      <th scope="col">Email</th>
      <th scope="col">Username</th>
      <th scope="col">Group</th>
      <th> Actions</th>
    </tr>
  </thead>
  <tbody>
    {listUsers && listUsers.length > 0 ?
      <>
      {listUsers.map(( item ,index) =>{
          return(
            <tr key= {`row-${index}`}>
              <td>
                { (currentPage - 1) * currentLimit +  index +1 }
              </td>
              <td> {item.id} </td>
                   <td> {item.email} </td>
                <td> {item.username} </td>
                  <td> {item.Group ? item.Group.name :''  } </td>
                  <td> 
                    <span
                    title="Edit"
                    className="edit"
                     onClick={() => handleEditUser(item)}
                    > 
                      <i className="fa fa-pencil"></i>
                    </span>
                    <span
                     title="Delete"
                    className="delete"
                    onClick={() => handleDeleteUser(item)}
                    >
                      <i className="fa fa-trash-o"></i>
                    </span>
                     
                     </td>
            </tr>
          )
      })}
      </>
        :
        <> <tr> <td>   Not found user  </td> </tr> 
        
        </>
  }
  </tbody>
</table>

             </div>

              {totalPages > 0 && 
            <ReactPaginate 
  nextLabel={<FaChevronRight />}
  previousLabel={<FaChevronLeft />}
  onPageChange={handlePageClick}
  pageRangeDisplayed={2}
  marginPagesDisplayed={2}
  pageCount={totalPages}
  containerClassName="pagination"
  pageClassName="page-item"
  pageLinkClassName="page-link"
  previousClassName="page-item"         //  Bọc prev trong li
  previousLinkClassName="page-link"
  nextClassName="page-item"             // Bọc next trong li
  nextLinkClassName="page-link"
  breakLabel="..."
  breakClassName="page-item"
  breakLinkClassName="page-link"
  activeClassName="active"
  renderOnZeroPageCount={null}
/>

              }
                </div>
        </div>

        <ModelDelete
        show = { isShowModelDelete }
        handleClose = {handleClose}
        confirmDeleteUser = { confirmDeleteUser}
        dataModel = {dataModel}
        />

        <ModelUser
           
              onHide = {onHideModelUser}
              show = {isShowModelUser}
              action={actionModelUser}
              dataModelUser={dataModelUser}

        />

        </>
    )
}

export default Users;