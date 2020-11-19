import React from 'react';
import { FormattedMessage } from 'react-intl';

import classes from './TotalCarteras.module.scss';
import CarterasGraph from '../../../../components/Graphs/CarterasGraph/CarterasGraph';
import Currency from '../../../../components/UI/Formatting/Currency';

const totalCarteras = (props) => (
  <div className={classes.Container}>
    <div>
      <div className={classes.Label}><div className={classes.VigBub}>&nbsp;&nbsp;</div> <FormattedMessage id="carteras.total_vigentes"/> <Currency value={props.vigentes}/> con {props.vigentes_count} créditos</div>
      <div className={classes.Label}><div className={classes.VencidBub}>&nbsp;&nbsp;</div> <FormattedMessage id="carteras.total_vencidos"/> <Currency value={props.vencidos}/> con {props.vencidos_count} créditos</div>
    </div>
    <CarterasGraph
      data={
        [
          {
            angle: props.vigentes,
            label: `$${props.vigentes} Vigente  (${props.vigentes_count} creditos)`,
            color: "#21a75a"
          },
          {
            angle: props.vencidos,
            label: `$${props.vencidos} Vencido  (${props.vencidos_count} creditos)`,
            color: "#c23f3f"
          }
        ]
      }
    />
  </div>
)

export default totalCarteras;
