import React, {Component} from 'react';

import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
  shouldComponentUpdate ( nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render () {
    let priorityModal = {}
    if (this.props.errorModal) {
      priorityModal = {zIndex : 3000}
    }
    return (
      <>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed}
        />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ?  'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
            ...priorityModal
          }}>
          {this.props.children}
        </div>
      </>
    )
  }
}


export default Modal
