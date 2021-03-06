import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './ProcessSelector.module.scss';
import Bee from '../../../Icons/Bee.js';
import Money from '../../../Icons/Money.js';
import Soap from '../../../Icons/Soap.js';
import Coffee from '../../../Icons/Coffee.js';


const processSelector = (props) => {
  const options = {
    'SEL': {
      'color': classes.white,
      'classes': [classes.Icon, classes.IconSelected]
    },
    'AC': {
      'color': classes.prDarkBlue,
      'classes': [classes.Icon, classes.IconAvailable]
    },
    'NP': {
      'color': classes.white,
      'classes': [classes.Icon, classes.IconDisabled]
    },
    'BA': {
      'color': classes.extraLightRed,
      'classes': [classes.Icon, classes.IconDisabled]
    }
  }

  const label = props.label ? (
    <div className={classes.Label}>
      <label><FormattedMessage id={props.label}/></label>
    </div>
  ) : null

  return (
    <div className={classes.Container}>
      {label}
      <div className={classes.IconContainer}>
        <div
          tabindex={props.processes.CF === 'AC' ? "0" : "-1"}
          onClick={() => props.clicked('CF')}
          onKeyDown={() => props.clicked('CF')}
          className={options[props.processes.CF].classes.join(' ')}
        >
          <Coffee
            fill={options[props.processes.CF].color}
            width="18px"
            height="18px"
          />
        </div>
        <div
          tabindex={props.processes.MI === 'AC' ? "0" : "-1"}
          onClick={() => props.clicked('MI')}
          onKeyDown={() => props.clicked('MI')}
          className={options[props.processes.MI].classes.join(' ')}
        >
          <Bee
            fill={options[props.processes.MI].color}
            width="20px"
            height="20px"
          />
        </div>
        <div
          tabindex={props.processes.JA === 'AC' ? "0" : "-1"}
          onClick={() => props.clicked('JA')}
          onKeyDown={() => props.clicked('JA')}
          className={options[props.processes.JA].classes.join(' ')}
        >
          <Soap
            fill={options[props.processes.JA].color}
            width="20px"
            height="20px"
          />
        </div>
        <div
          tabindex={props.processes.SL === 'AC' ? "0" : "-1"}
          onClick={() => props.clicked('SL')}
          onKeyDown={() => props.clicked('SL')}
          className={options[props.processes.SL].classes.join(' ')}
        >
          <Money
            fill={options[props.processes.SL].color}
            width="20px"
            height="20px"
          />
        </div>
      </div>
    </div>
  )
}

export default processSelector
