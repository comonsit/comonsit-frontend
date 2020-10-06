import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentWillMount () {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: 0})
        // console.log(req);
        return req
      })
      this.reqonseInterceptor = axios.interceptors.response.use(res => res, error => {
        console.log('HANDLER error');
        this.setState({error: error.response.data})
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
      if (typeof this.state.error === "string") {
        errorInfo = this.state.error
      } else {
        for (let key in this.state.error) {
          errorInfo.push(<p key={key}>{this.state.error[key]} -- {key}</p>)
        }
      }

      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            <FormattedMessage id="error.title"/>
            {errorInfo}
            <FormattedMessage id="error.message1"/>
          </Modal>
          <WrappedComponent {...this.props}/>
        </>
      )
    }
  }
}

export default withErrorHandler
