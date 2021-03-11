import React from 'react';
import { useInView } from "react-intersection-observer";
import { motion, AnimateSharedLayout } from "framer-motion"
import { Parallax } from 'react-parallax';
import { FormattedMessage } from 'react-intl';

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
          <h2><FormattedMessage id="conocenos.territorioTitle1"/></h2>
          <div>
            <p><FormattedMessage id="conocenos.territorioP1"/></p>
            <p><FormattedMessage id="conocenos.territorioP2_1"/><strong><FormattedMessage id="conocenos.territorioP2_2"/></strong><FormattedMessage id="conocenos.territorioP2_3"/></p>
            <p><FormattedMessage id="conocenos.territorioP3"/></p>
            <p><FormattedMessage id="conocenos.territorioP4"/></p>
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
          <h3><FormattedMessage id="conocenos.yomolAtelT1"/></h3>
          <p><FormattedMessage id="conocenos.yomolAtelP1_1"/><strong><FormattedMessage id="conocenos.yomolAtelP1_2"/></strong><FormattedMessage id="conocenos.yomolAtelP1_3"/></p>
          <p><FormattedMessage id="conocenos.yomolAtelP2"/></p>
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
            <YomolCard key={1} title="conocenos.cafeT" activate={inView}>
              <p><FormattedMessage id="conocenos.cafeP1"/></p>
              <img key="imgA" src={Capeltic} alt="Capeltic"/>
              <div className={classes.Yomol_Container_two}>
                <img className={classes.batsilMaya}  key="imgB" src={Batsil} alt="Batsil"/>
                <img key="imgC" src={Tsumbal} alt="Tsumbal"/>
              </div>
            </YomolCard>
            <YomolCard key={2} title="conocenos.japonT" activate={inView}>
              <p><FormattedMessage id="conocenos.japonP1"/></p>
              <img key="imgE" src={Xapontic} alt="Xapontic"/>
            </YomolCard>
            <YomolCard key={3} title="conocenos.microfinanczasT" activate={inView}>
              <p><FormattedMessage id="conocenos.microfinanczasP1"/></p>
              <img key="imgF" src={Comon} alt="Comon"/>
            </YomolCard>
            <YomolCard key={4} title="conocenos.mielT" activate={inView}>
              <p><FormattedMessage id="conocenos.mielP1"/></p>
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
            <h3><FormattedMessage id="conocenos.cafeT"/></h3>
            <p><FormattedMessage id="conocenos.cafeP1"/></p>
            <div className={classes.Three}>
              <img src={Capeltic} alt="Capeltic"/>
              <img src={Batsil} alt="Batsil"/>
              <img src={Tsumbal} alt="Tsumbal"/>
            </div>
          </div>
          <div>
            <h3><FormattedMessage id="conocenos.japonT"/></h3>
            <p><FormattedMessage id="conocenos.japonP1"/></p>
            <img src={Xapontic} alt="Xapontic"/>
          </div>
          <div>
            <h3><FormattedMessage id="conocenos.mielT"/></h3>
            <p><FormattedMessage id="conocenos.mielP1"/></p>
            <img src={Chabtic} alt="Chabtic"/>
          </div>
          <div>
            <h3><FormattedMessage id="conocenos.microfinanczasT"/></h3>
            <p><FormattedMessage id="conocenos.microfinanczasP1"/></p>
            <img src={Comon} alt="Comon"/>
          </div>
        </div>
      </div>
      <div className={classes.Container}>
        <div className={classes.Container_content}>
          <h3><FormattedMessage id="conocenos.comonT"/></h3>
          <p><FormattedMessage id="conocenos.comonP1"/></p>
          <p><FormattedMessage id="conocenos.comonP2"/></p>
        </div>
        <img className={classes.Long}  src={Colab} alt="Colaboración"/>
      </div>
      <div className={[classes.Container, classes.Reverse].join(' ')}>
        <div className={classes.Container_content}>
          <h4><FormattedMessage id="conocenos.plataformaT"/></h4>
          <p><FormattedMessage id="conocenos.plataformaP1"/></p>
          <p><FormattedMessage id="conocenos.plataformaP2"/></p>
          <p><FormattedMessage id="conocenos.plataformaP3"/><a href="https://github.com/mauricioinaz/comonSit"><FormattedMessage id="conocenos.plataformaP4"/></a>.</p>
          <p><FormattedMessage id="conocenos.plataformaP5"/><a href="https://github.com/mauricioinaz/">@mauricioinaz</a></p>
        </div>
        <img src={Dashboard} alt="Dashboard"/>
      </div>
    </div>
  );
}

export default Conocenos;
