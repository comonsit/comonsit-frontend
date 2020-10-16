import React from 'react';

import classes from './TotalCarteras.module.scss';
import TextElement from '../../../../components/UI/TextElement/TextElement';
import Currency from '../../../../components/UI/Formatting/Currency';

const totalCarteras = (props) => (
  <div className={classes.Container}>
    <div>
      <TextElement
        label={"carteras.total_vigentes"}
        content={<Currency value={props.vigentes} returnString/>}
      />
      <TextElement
        label={"carteras.total_vencidos"}
        content={<Currency value={props.vencidos} returnString/>}
      />
    </div>
    <div>
      <TextElement
        label={"carteras.num_vigentes"}
        content={props.vigentes_count}
      />
      <TextElement
        label={"carteras.num_vencidos"}
        content={props.vencidos_count}
      />
    </div>
  </div>
)

export default totalCarteras;
