import React,{Component} from 'react';
import {connect} from 'react-redux';
import ButtonComponent from './buttonModalContainer.jsx';
import Modal from 'react-modal';
import {toggleModal} from '../actions/modalActions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';


class ModalComponentDialog extends Component{
  constructor(props){
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(){
    this.props.toggleModal();
  }

  render(){
    const {modalStatus} = this.props;
    /*const status = modalStatus ? "Verdadero": "Falso";*/
    return (
      <div>
        <ButtonComponent/>
          <Modal
            isOpen={modalStatus}
            contentLabel="Modal"
            onRequestClose={this.closeModal}
            className="modal-dialog"
            >
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body">
                <p>One fine body&hellip;</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.closeModal}>Save changes</button>
              </div>
            </div>
          </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalStatus: state.modalReducer.modalState
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleModal }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalComponentDialog);

ModalComponentDialog.propTypes = {
  toggleModal: PropTypes.func,
  modalStatus: PropTypes.bool,
  contentLabel: PropTypes.string,
};