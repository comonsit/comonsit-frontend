import React from 'react';
import {FormattedMessage} from 'react-intl';
import classes from './Card.module.css';


const card = (props) => (
  <div className={classes.BoxContainer}>
    <h3><FormattedMessage id={props.title}/></h3>
    {props.children}
  </div>
)

export default card;

//
//
// return (
//   <div className={classes.Container}>
//     <Title
//       titleName="evalSocio.title">
//       {socioName}
//     </Title>
//     <div className={classes.BlocksContainer}>
//       <Card title={"evalSocio.Datos"}>
//         <div className={classes.DataContainer}>
//           {items1Array}
//         </div>
//       </Card>
//       <Card title={"evalSocio.Acopios"}>
//         {saldoGraph}
//       </Card>
//     </div>
//   </div>)
// }
