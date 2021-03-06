import React from 'react';

import classes from './Notification.module.scss';


const notification = (props) =>  {
  if (props.number > 0) {
    return (
      <div className={classes.OutContainer}>
        <div className={classes.NotContainer}>
          {props.children}
          <span>{props.number}</span>
        </div>
      </div>
    )
  } else {
    return <>{props.children}</>
  }
}

export default notification;
