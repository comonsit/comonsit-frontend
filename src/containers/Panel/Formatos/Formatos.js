import React, { Component} from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './Formatos.module.scss'
import Title from '../../../components/UI/Title/Title';


class Formatos extends Component {
  render() {
    return (
      <div className={classes.Container}>
        <Title
          titleName="formatos.title"/>
        <div className={classes.ButtonContainer}>
          <div className={classes.ButtonLike}>
            <a 
              href=" https://www.dropbox.com/sh/zovndgetxjhtyn6/AABgDrUnF4_4YcmPX1rya8Fua?dl=0" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FormattedMessage id="formatos.formatosActuales"/>
            </a>
          </div>
          <div className={classes.ButtonLike}>
            <a 
              href="https://www.dropbox.com/sh/flmdie3ps4mpryu/AADswr6xNfjmm1P3SyEwmNKsa?dl=0" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="formatos.manualesOperacion"/>
            </a>
          </div>
          <div className={classes.ButtonLike}>
            <a 
              href="https://www.dropbox.com/sh/qgpi4j89hrvsjoi/AADG9IBzJta20SaR_Wx_2Mvra?dl=0" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="formatos.materialFormacion"/>
            </a>
          </div>
          <div className={classes.ButtonLike}>
            <a 
              href="https://www.dropbox.com/sh/z53jaim05g7mnj9/AABnHm5VpL0QXQ1MzWXQ-rj9a?dl=0" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="formatos.reporterInfografias"/>
            </a>
          </div>
        </div>
      </div>
    )
  }
}


export default Formatos
