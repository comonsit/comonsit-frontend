import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentWillMount () {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null})
        console.log('HANDLER req');
        console.log(req);
        return req
      })
      this.reqonseInterceptor = axios.interceptors.response.use(res => res, error => {
        console.log('HANDLER error');
        // err.response.data.detail
        const errorMessage = JSON.stringify(error.response.data)
        console.log(errorMessage);
        this.setState({error: errorMessage})
      })
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.requestInterceptor)
      axios.interceptors.request.eject(this.reqonseInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </>
      )
    }
  }
}

export default withErrorHandler
