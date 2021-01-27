import React from 'react';

import classes from './Hamburguesa.module.scss';


const hamburguesa = (props) => {
  const hambClasses = [classes["hamburger"], classes["hamburger--arrowalt"]]
  if (props.open) {
    hambClasses.push(classes["is-active"])
  }

  const hambClassesInner = [classes["hamburger-inner"]]
  if (props.toolbar) {
    hambClassesInner.push(classes["white"])
  }

  return (
    <div className={classes.Container}>
      <button
        className={hambClasses.join(' ')}
        onClick={props.clicked}
        type="button"
      >
        <span className={classes["hamburger-box"]}>
          <span className={hambClassesInner.join(' ')}></span>
        </span>
      </button>
    </div>
  )
}

//
//  (
//     <div
//       className={classes.Hamburguesa}
//       onClick={props.clicked}
//     >
//       <div></div>
//       <div></div>
//       <div></div>
//     </div>
// )

export default hamburguesa;
