import React from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './Title.module.css';


const title = (props) => {

  return (
  <div className={classes.HeaderContainer}>
    <h1><FormattedMessage id={props.titleName}/>{props.titleNameEx}</h1>
    {props.children}
  </div>)
}


export default title;
