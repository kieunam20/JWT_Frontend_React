
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModelDelete = (props) => {
    return(
        <>
       <Modal show={props.show} onHide={props.handleClose } centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
       <Modal.Body> Are you sure delete user? {props.dataModel.email} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default ModelDelete;