import React from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './Title.module.css';


const title = (props) => {
  let extraTitle = props.titleNameEx ? ": " +  props.titleNameEx : null

  return (
  <div className={classes.HeaderContainer}>
    <h1><FormattedMessage id={props.titleName}/>{extraTitle}</h1>
    {props.children}
  </div>)
}


export default title;
