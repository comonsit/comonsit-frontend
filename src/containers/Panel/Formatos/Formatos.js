import React, { Component} from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './Formatos.module.scss'
import CompPago from '../../../assets/pdf/ComprobanteDePago2.pdf';
import FormActReg from '../../../assets/pdf/FormatodeActasRegionales.pdf';
import FormActReg1 from '../../../assets/pdf/FormatodeActasRegionales1.pdf';
import FormSol from '../../../assets/pdf/FormatosDeSolicitud3.pdf';
import Title from '../../../components/UI/Title/Title';


class Formatos extends Component {
  render() {
    return (
      <div className={classes.Container}>
        <Title
          titleName="formatos.title"/>
        <div className={classes.ButtonContainer}>
          <div className={classes.ButtonLike}>
            <a href={CompPago} target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="formatos.comprobantePago"/>
            </a>
          </div>
          <div className={classes.ButtonLike}>
            <a href={FormActReg} target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="formatos.formActReg"/>
            </a>
          </div>
          <div className={classes.ButtonLike}>
            <a href={FormActReg1} target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="formatos.formActReg1"/>
            </a>
          </div>
          <div className={classes.ButtonLike}>
            <a href={FormSol} target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="formatos.formSol"/>
            </a>
          </div>
        </div>
      </div>
    )
  }
}


export default Formatos
