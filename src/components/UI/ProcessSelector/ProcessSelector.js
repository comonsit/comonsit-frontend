import React from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './ProcessSelector.module.css';
import Bee from '../../../Icons/Bee.js';
import Money from '../../../Icons/Money.js';
import Soap from '../../../Icons/Soap.js';
import Coffee from '../../../Icons/Coffee.js';

const processSelector = (props) => {
    const options = {
      'SEL': {
        'color': '#fff',
        'classes': [classes.Icon, classes.IconSelected]
      },
      'AC': {
        'color': '#243746',
        'classes': [classes.Icon, classes.IconAvailable]
      },
      'NP': {
        'color': '#fff',
        'classes': [classes.Icon, classes.IconDisabled]
      },
      'BA': {
        'color': '#f99b9b',
        'classes': [classes.Icon, classes.IconDisabled]
      }
    }

    return (
      <div className={classes.Container}>
        <div className={classes.Label}>
          <label><FormattedMessage id={props.label}/></label>
        </div>
        <div className={classes.IconContainer}>
          <div onClick={() => props.clicked('CF')} className={options[props.processes.CF].classes.join(' ')}>
            <Coffee fill={options[props.processes.CF].color} width="18px" height="18px" />
          </div>
          <div onClick={() => props.clicked('MI')} className={options[props.processes.MI].classes.join(' ')}>
            <Bee fill={options[props.processes.MI].color} width="20px" height="20px" />
          </div>
          <div onClick={() => props.clicked('JA')} className={options[props.processes.JA].classes.join(' ')}>
            <Soap fill={options[props.processes.JA].color} width="20px" height="20px" />
          </div>
          <div onClick={() => props.clicked('SL')} className={options[props.processes.SL].classes.join(' ')}>
            <Money fill={options[props.processes.SL].color} width="20px" height="20px" />
          </div>
        </div>
      </div>
    )
}

export default processSelector
