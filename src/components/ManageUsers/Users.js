import { useEffect, useState } from "react";
import './Users.scss';
import {fetchAllUser} from "../../services/userService";
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const Users = (props) =>{
        const [listUsers, setListUsers] = useState([]);
         const [currentPage, setCurrentPage] = useState(1);
          const [currentLimit, setCurrentLimit] = useState(3);
          const [totalPages, setTotalPages] = useState(0);

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

    return (
      <div className="container" >
        <div className="manage-users container">
          <div className="user-header"> 
                <div className="title"> 
                  <h3>Table user </h3>  
                </div>
            <div className="actions"> 
                <button className="btn btn-success">Refesh </button>
                 <button className="btn btn-primary"> Add new user </button>
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
                {index +1}
              </td>
              <td> {item.id} </td>
                   <td> {item.email} </td>
                <td> {item.username} </td>
                  <td> {item.Group ? item.Group.name :''  } </td>
                  <td> 
                    <button className="btn btn-warning">  Edit </button> 
                     <button  className="btn btn-danger"> Delete </button> 
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
             <div className="user-footer">
                 <ReactPaginate 
                 nextLabel={<FaChevronRight />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={4}
                pageCount={totalPages}
                previousLabel={<FaChevronLeft />}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                />
             </div>
              }
                </div>
        </div>
    )
}

export default Users;