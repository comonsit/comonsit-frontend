import React from 'react'
import classes from './BFSelItems.module.css'
import HorizLabel from '../../../../../components/UI/HorizLabel/HorizLabel';

const bfselitems = (props) => {

  return (
    <div key={props.label} className={classes.ContentContainer}>
      <div className={classes.Content}>
        <HorizLabel label="bancoForm.Movimientos"/>
        <div className={classes.Table}>
          { props.children }
        </div>
      </div>
      <div className={classes.Content}>
        <HorizLabel label="bancoForm.Pagos"/>
        <div className={classes.Table}>
          { props.children }
        </div>
      </div>
      <div className={classes.Content}>
        <HorizLabel label="bancoForm.Otros"/>
        <div className={classes.Table}>
          { props.children }
        </div>
      </div>
    </div>
  )
}

export default bfselitems
