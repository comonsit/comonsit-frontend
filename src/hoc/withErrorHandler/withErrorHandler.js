import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './withErrorHandler.module.scss';
import Modal from '../../components/UI/Modal/Modal';
import Alert from '../../components/UI/Input/Alert';
import Collapsible from '../../components/UI/Collapsible/Collapsible';


const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null)

    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req
    })

    const resInterceptor = axios.interceptors.response.use(
      res => res,
      err => {
        if (
          typeof err.response.data === "string" ||
          "non_field_errors" in err.response.data ||
          "detail" in err.response.data
        ) {
          setError(err.response)
        }
        return Promise.reject(err)
      }
    )

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor)
        axios.interceptors.response.eject(resInterceptor)
      };
    }, [reqInterceptor, resInterceptor])

    const errorConfirmedHandler = () => setError(null)

    let errorTitleId = "error.message"
    let errorInfo = []
    if (error) {

      if (typeof error.data === "string") {
        errorInfo = (
          <Collapsible labelId="error.mensajeServidor">
            <p>{error.data}</p>
          </Collapsible>
        )
      } else {
        for (let key in error.data) {
          errorInfo.push(<h2 key={key}><Alert />&nbsp;&nbsp; {error.data[key]}</h2>)
        }
      }

      if (error.status === 500) {
        errorTitleId = "error.message500"
      } else if (error.status === 400) {
        if (error.config.method === "post") {
          errorTitleId = "error.messagePost"
        } else {
          errorTitleId = "error.message400"
        }
      } else if (error.status === 401 || error.status === 401 ) {
        errorTitleId = "error.messageForbidden"
      }
    }

    return (
      <>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          <div className={classes.Container}>
            <h2> <FormattedMessage id={errorTitleId}/></h2>
            <div>
              {errorInfo}
            </div>
            <Collapsible labelId="error.extraInfo">
              <pre>{error ? JSON.stringify(error, null, 4) : null}</pre>
            </Collapsible>
          </div>
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
