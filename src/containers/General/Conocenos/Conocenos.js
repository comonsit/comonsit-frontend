import React from 'react';
import { motion, AnimateSharedLayout } from "framer-motion"
import YomolCard from './YomolCard'
// import {FormattedMessage} from 'react-intl';
import Territorio from '../../../assets/photos/territorio.jpg'
import Barista from '../../../assets/photos/barista.jpg'
import Yomol from '../../../assets/images/yomolAtel.svg'
import Capeltic from '../../../assets/images/capeltic.png'
import Batsil from '../../../assets/images/BatsilMayaLogo.png'
import Tsumbal from '../../../assets/images/tsumbal_xitalha.png'
import Chabtic from '../../../assets/images/Chabtic.png'
import Xapontic from '../../../assets/images/XAPONTIC.png'
import Comon from '../../../assets/images/ComonSitLogoNoBack.png'
import classes from './Conocenos.module.scss';


export const Conocenos = () => {
  return (
    <div className={classes.Conocenos}>
      <div className={classes.Container}>
        <div className={classes.Container_content}>
          <h3>Territorio</h3>
          <p>Vivimos al norte del estado de chiapas, entre las cañadas que abarcan los municipios de Chilón, Sitalá, Yajalón, Pantelhó y Ocosingo. Su clima tropical hace que la zona sea adecuado para el cultivo de café bajo sombra (principal fuente de ingreso para nuestras familias), pero lo que sostiene nuestra forma de vida es el cultivo de nuestras parcelas, el maíz y el frijol (entre una gran variedad de frutos) son la base de nuestra alimentación y de nuestra economía familiar.</p>
          <p>En toda esta zona prevalece la cultura maya Tseltal, la cual conserva una gran riqueza cultural a través de nuestra lengua, nuestras tradiciones y nuestro sistema de cargos civiles y religiosos; todo esto, junto con el cuidado de la madre tierra, nos permite mantener mantener lo que llamamos el <strong>lequil cuxlejalil</strong> (la vida buena y en armonía) con nuestra comunidad, con el ambiente y con lo espiritual. </p>
          <p>Aún así, esta región es una de las más empobrecidas de México, a pesar de ser una zona con grandes riquezas naturales, han sido siempre otras personas las que se quedan con el valor de nuestros recursos, por ejemplo, los intermediarios de café quienes también promueven la usura entre las comunidades. Es por eso que decidimos organizarnos para salir de estos esquemas de dependencia económica y construir nuestras alternativas.</p>
        </div>
        <img src={Territorio} alt="Territorio"/>
      </div>
      <div className={[classes.Container, classes.Gray].join(' ')}>
        <img className={classes.Long} src={Barista} alt="Barista"/>
        <div className={classes.Container_content}>
          <h3>Yomol A'tel</h3>
          <p>Yomol A’tel significa en la lengua Tseltal <strong>juntos trabajamos, caminamos, soñamos</strong> es lo que entendemos el grupo de empresas sociales y cooperativas que lo conforman, lo integramos familias productoras de la región selva norte de Chiapas y colaboradores en diversas partes de la república Mexicana. Nos dedicamos a generar respuestas organizadas desde la base social para construir alternativas de agregación de valor en los recursos que tenemos actualmente en nuestro territorio, cuidando siempre nuestra relación con la madre tierra y acompañados por diversos actores sociales que coinciden con nuestra vocación (universidades, fundaciones, inversionistas, consumidores y otras experiencias sociales, entre otros).</p>
        </div>
      </div>
      <div className={classes.Yomol}>
        <AnimateSharedLayout>
          <motion.div className={classes.Yomol_Container}>
            <YomolCard key={1} title="Café orgánico">
              <p>Producción agroecológica, transformación, exportación de producto terminado y venta en taza.</p>
              <img key="imgA" src={Capeltic} alt="Capeltic"/>
              <img key="imgB" src={Batsil} alt="Batsil"/>
              <img key="imgC" src={Tsumbal} alt="Tsumbal"/>
            </YomolCard>
            <YomolCard key={2} title="Productos de higiene personal">
              <p>Jabones artesanales, shampoo, cremas y artesanías.</p>
              <img key="imgE" src={Xapontic} alt="Xapontic"/>
            </YomolCard>
            <YomolCard key={3} title="Microfinanzas">
              <p>Microcréditos al consumo y a la producción para las familias que forman parte de Yomol A’tel.</p>
              <img key="imgF" src={Comon} alt="Comon"/>
            </YomolCard>
            <YomolCard key={4} title="Miel Orgánica">
              <p>Producción agroecológica y venta nacional, etapa temprana de transformación del producto terminado.</p>
              <img key="imgD" src={Chabtic} alt="Chabtic"/>
            </YomolCard>
          </motion.div>
        </AnimateSharedLayout>
        <img className={classes.Yomol_Center} src={Yomol} alt="Yomol"/>
      </div>
    </div>
  );
}

export default Conocenos;
