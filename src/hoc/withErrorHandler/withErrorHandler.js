import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './withErrorHandler.module.scss';
import Modal from '../../components/UI/Modal/Modal';
import Alert from '../../components/UI/Input/Alert';
import Collapsible from '../../components/UI/Collapsible/Collapsible';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentWillMount () {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: 0})
        return req
      })
      this.reqonseInterceptor = axios.interceptors.response.use(res => res, error => {
        if (
          typeof error.response.data === "string" ||
          "non_field_errors" in error.response.data ||
          "detail" in error.response.data
        ) {
          this.setState({error: error.response})
        }
        return Promise.reject(error)
      })
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.requestInterceptor)
      axios.interceptors.response.eject(this.reqonseInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render() {
      let errorInfo = []
      if (this.state.error) {
        if (typeof this.state.error.data === "string") {
          errorInfo = this.state.error.data
        } else {
          for (let key in this.state.error.data) {
            errorInfo.push(<h2 key={key}><Alert />&nbsp;&nbsp; {this.state.error.data[key]}</h2>)
          }
        }
      }


      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
            errorModal
          >
            <div className={classes.Container}>
              <h2> <FormattedMessage id="error.message1"/></h2>
              <div>
                {errorInfo}
              </div>
              <Collapsible labelId="error.extraInfo">
                <pre>{JSON.stringify(this.state.error, null, 4)}</pre>
              </Collapsible>
            </div>
          </Modal>
          <WrappedComponent {...this.props}/>
        </>
      )
    }
  }
}


export default withErrorHandler
