import React from 'react';
import { useInView } from "react-intersection-observer";
import { motion, AnimateSharedLayout } from "framer-motion"
import { Parallax } from 'react-parallax';
// import {FormattedMessage} from 'react-intl';

import YomolCard from './YomolCard'
import Territorio from '../../../assets/photos/territorio.jpg'
import Barista from '../../../assets/photos/barista.jpg'
import Yomol from '../../../assets/images/yomolAtel.svg'
import Capeltic from '../../../assets/images/capeltic.png'
import Batsil from '../../../assets/images/BatsilMayaLogo.png'
import Tsumbal from '../../../assets/images/tsumbal_xitalha.png'
import Chabtic from '../../../assets/images/Chabtic.png'
import Xapontic from '../../../assets/images/XAPONTIC.png'
import Comon from '../../../assets/images/ComonSitLogoNoB1.png'
import Colab from '../../../assets/images/Colaboracion.svg'
import Dashboard from '../../../assets/images/Dashboard.svg'
import classes from './Conocenos.module.scss';


export const Conocenos = () => {
  const [onScrollRef, inView ] = useInView({threshold: .8});
  return (
    <div className={classes.Conocenos}>
      <div className={classes.Territorio}>
        <div className={classes.Territorio_content}>
          <h2>Nuestro Territorio</h2>
          <div>
            <p>Vivimos al norte del estado de Chiapas, entre las cañadas que abarcan los municipios de Chilón, Sitalá, Yajalón, Pantelhó y Ocosingo. El clima tropical hace que la zona sea adecuada para el cultivo de café bajo sombra (principal fuente de ingreso para nuestras familias), pero lo que sostiene nuestra forma de vida es el cultivo de nuestras parcelas; el maíz, el frijol y una gran variedad de frutos son la base de nuestra alimentación y de nuestra economía familiar.</p>
            <p>En toda esta zona prevalece la cultura maya Tseltal, la cual conserva una gran riqueza cultural a través de nuestra lengua, nuestras tradiciones y nuestro sistema de cargos civiles y religiosos. Todo esto, junto con el cuidado de la madre tierra, nos permite mantener mantener lo que llamamos el <strong>lequil cuxlejalil</strong> (la vida buena y en armonía) con nuestra comunidad, con el ambiente y con lo espiritual. </p>
            <p>Aún así, esta región es una de las más empobrecidas de México. A pesar de ser una zona con grandes riquezas naturales, han sido siempre otras personas las que se quedan con el valor de nuestros recursos.</p>
            <p>Es por eso que decidimos organizarnos para salir de estos esquemas de dependencia económica y construir nuestras alternativas.</p>
          </div>
        </div>
        <Parallax
          bgImage={Territorio}
          bgImageAlt="Territorio"
          strength={400}
          className={classes.Territorio_img}
        >
        </Parallax>
      </div>
      <div className={classes.YomolIntro}>
        <div className={classes.YomolIntro_content}>
          <h3>Yomol A'tel</h3>
          <p>Yomol A’tel significa en la lengua Tseltal <strong>juntos trabajamos, caminamos, soñamos</strong>. Es un grupo ingegrado por empresas sociales y cooperativas, así como las familias productoras de la región selva norte de Chiapas y colaboradores en diversas partes de la república Mexicana.</p>
          <p>Nos dedicamos a generar respuestas organizadas desde la base social para construir alternativas de agregación de valor en los recursos que tenemos actualmente en nuestro territorio, cuidando siempre nuestra relación con la madre tierra y acompañados por diversos actores sociales que coinciden con nuestra vocación (universidades, fundaciones, inversionistas, consumidores y otras experiencias sociales, entre otros).</p>
        </div>
      </div>
      <Parallax
        bgImage={Barista}
        bgImageAlt="Barista"
        strength={200}
      >
        <div className={classes.Barista}></div>
      </Parallax>
      <div className={classes.Yomol}>
        <AnimateSharedLayout>
          <motion.div className={classes.Yomol_Container}>
            <YomolCard key={1} title="Café orgánico" activate={inView}>
              <p>Producción agroecológica, transformación, exportación de producto terminado y venta en taza.</p>
              <img key="imgA" src={Capeltic} alt="Capeltic"/>
              <div className={classes.Yomol_Container_two}>
                <img className={classes.batsilMaya}  key="imgB" src={Batsil} alt="Batsil"/>
                <img key="imgC" src={Tsumbal} alt="Tsumbal"/>
              </div>
            </YomolCard>
            <YomolCard key={2} title="Productos de higiene personal" activate={inView}>
              <p>Jabones artesanales, shampoo, cremas y artesanías.</p>
              <img key="imgE" src={Xapontic} alt="Xapontic"/>
            </YomolCard>
            <YomolCard key={3} title="Microfinanzas" activate={inView}>
              <p>Microcréditos al consumo y a la producción para las familias que forman parte de Yomol A’tel.</p>
              <img key="imgF" src={Comon} alt="Comon"/>
            </YomolCard>
            <YomolCard key={4} title="Miel Orgánica" activate={inView}>
              <p>Producción agroecológica y venta nacional, etapa temprana de transformación del producto terminado.</p>
              <img key="imgD" src={Chabtic} alt="Chabtic"/>
            </YomolCard>
          </motion.div>
        </AnimateSharedLayout>
        <img ref={onScrollRef} className={classes.Yomol_Center} src={Yomol} alt="Yomol"/>
      </div>
      <div className={classes.YomolMobile}>
        <img className={classes.YomolMobile_Center} src={Yomol} alt="Yomol"/>
        <div className={classes.YomolMobile_Container}>
          <div>
            <h3>Café orgánico</h3>
            <p>Producción agroecológica, transformación, exportación de producto terminado y venta en taza.</p>
            <div className={classes.Three}>
              <img src={Capeltic} alt="Capeltic"/>
              <img src={Batsil} alt="Batsil"/>
              <img src={Tsumbal} alt="Tsumbal"/>
            </div>
          </div>
          <div>
            <h3>Productos de higiene personal</h3>
            <p>Jabones artesanales, shampoo, cremas y artesanías.</p>
            <img src={Xapontic} alt="Xapontic"/>
          </div>
          <div>
            <h3>Miel Orgánica</h3>
            <p>Producción agroecológica y venta nacional, etapa temprana de transformación del producto terminado.</p>
            <img src={Chabtic} alt="Chabtic"/>
          </div>
          <div>
            <h3>Microfinanzas</h3>
            <p>Microcréditos al consumo y a la producción para las familias que forman parte de Yomol A’tel.</p>
            <img src={Comon} alt="Comon"/>
          </div>
        </div>
      </div>
      <div className={classes.Container}>
        <div className={classes.Container_content}>
          <h3>Comon Sit Ca’teltic</h3>
          <p>Comon Sit Ca’teltic empezó con reinvertir parte del beneficio que trajo el precio construido del café. De ahí buscamos utilizar esos recursos para empezar actividades nuevas que a su vez generen excedentes que se reinviertan nuevamente en financiar otras actividades productivas.</p>
          <p>El proceso ha sido siempore atentos a la dinámica económico-productiva que se puede incentivar en una familia, en una comunidad o región.</p>
        </div>
        <img className={classes.Long}  src={Colab} alt="Colaboración"/>
      </div>
      <div className={[classes.Container, classes.Reverse].join(' ')}>
        <div className={classes.Container_content}>
          <h4>Plataforma de créditos en línea</h4>
          <p>Conforme el proyecto fue creciendo en tamaño y complejidad, y el acceso remoto a datos resultó cada vez más importante, iniciamos el desarrollo de este sitio.</p>
          <p>comonsitcateltic.com es una plataforma multi-idioma que nos ha abierto nuevas posibilidades, permitiéndonos explorar mejor nuestros datos y formas de trabajo en un proceso que a la fecha seguimos explorando y mejorando.</p>
          <p>Consideramos importante compartir nuestra experiencia, así que para quien esté interesada en ver, copiar, descargar o mejorar nuestro código, lo pueden hacer de manera libre aquí <a href="https://github.com/mauricioinaz/comonSit">aquí</a>.</p>
          <p>El código de esta plataforma ha sido desarrollada en un proceso junto con nuestro colaborador y amigo <a href="https://github.com/mauricioinaz/">@mauricioinaz</a></p>
        </div>
        <img src={Dashboard} alt="Dashboard"/>
      </div>
    </div>
  );
}

export default Conocenos;
