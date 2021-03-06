import React from 'react';
import { useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { useInView } from "react-intersection-observer";
import { Parallax } from 'react-parallax';
import { useDimensions } from "./useDimensions";
import {
  motion,
  useAnimation
} from "framer-motion";
import { FormattedMessage } from 'react-intl';
import classes from './HomeContainer.module.scss';
import LogoText from '../../../assets/images/texto.png'
import HomeImage from '../../../assets/photos/homeImage.jpg'
import BeesPhoto from '../../../assets/photos/abejas.jpg'
import Barras from '../../../assets/Icons/Home/barras.svg'
import BolsaDinero from '../../../assets/Icons/Home/bolsaDinero.svg'
import Pastel from '../../../assets/Icons/Home/pastel.svg'
import * as actions from '../../../store/actions'

const icon = {
  hidden: {
    opacity: 1,
    pathLength: 0,
    stroke: "#243746",
    fill: "#fff"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    stroke: "#243746",
    fill: "#243746",
    transition: {
      default: { duration: 10,  ease: "easeIn"},
      fill: { duration: 3, delay: 5, ease: "easeIn"}
    }
  },
  // Same as visible but no transition
  showing: {
    opacity: 1,
    pathLength: 1,
    stroke: "#243746",
    fill: "#243746"
  }
};

const textIcon = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 3,
      delay: 5,
      ease: "easeIn"
    }
  },
  // Same as visible but no transition
  showing: {
    opacity: 1,
  }
}

const variantsIcons = {
  hidden: {
    opacity: 0,
    y:-80
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delayChilden: 0.3, staggerChildren: 0.4 },
  }
}

const circleShow = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 50% 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(0 at 50% 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const HomeContainer = props => {
  // ICON ANIMATION
  const animationOfIcons = useAnimation();
  const animationOfLogo = useAnimation();
  const [onScrollRef, inView ] = useInView({threshold: .7});

  // CIRCLE ANIMATION
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const animationOfCircle = useAnimation();
  const [onScrollRefCircle, inViewCircle ] = useInView();

  if (inView) {
    animationOfIcons.start("visible");
  }

  if (inViewCircle) {
    animationOfCircle.start("open");
  }

  // Register animation of logo
  // to only show animation once per loading page
  useEffect(() => {
    props.onAnimated()
  }, [props]);

  useEffect(() => {
    if (!props.animatedLogo) {
      animationOfLogo.start("visible");
      props.onAnimated()
    } else {
      animationOfLogo.start("showing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.Cotainer}>
      <div className={classes.LogoContainer}>
        <motion.div
          className={classes.Image}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 320"
            className={classes.Image_svg}
          >
            {/*
              EFECTO drag genera warning mezclado on el inView
              drag
              dragConstraints={{ left: -100, right: 100, top:-100, bottom: 100 }}
              */}
            <motion.path
              d="M 143.36 284.8 C 118.24 282.68 95 274.28 75.32 260.2 C 47.32 240.16 27.96 210.56 21.2 177.6 C 19 166.8 18.64 162.88 18.64 150 C 18.6 137.68 18.96 133.48 20.84 124 C 30.12 76.76 64.08 37.68 109.28 22.2 C 123.24 17.4 134.8 15.32 149.84 14.92 C 159.92 14.64 167 15.12 176.2 16.68 C 232.44 26.08 277.2 70.68 286.76 126.8 C 288.24 135.36 288.56 140.04 288.56 150.4 C 288.52 163.68 287.6 171.36 284.52 183.4 C 279.84 201.76 271.88 217.88 259.76 233.6 C 255.2 239.52 243.12 251.6 237.2 256.16 C 216.36 272.24 193.68 281.48 168 284.4 C 162.8 284.96 148.28 285.24 143.36 284.8 Z M 145.96 276.8 C 139.84 270.16 134.68 264.08 132.28 260.72 C 130.96 258.8 129.8 257.28 129.72 257.36 C 129.64 257.4 129.8 259.44 130.04 261.84 C 130.28 264.24 130.4 268.84 130.32 272.08 L 130.2 277.92 L 134.4 278.56 C 138.32 279.2 144.48 279.8 147.56 279.96 L 148.88 280 L 145.96 276.8 Z M 169.52 279 C 171.8 278.72 173.72 278.4 173.8 278.32 C 173.88 278.24 174 274.28 174.08 269.52 C 174.16 264.72 174.08 260.96 173.96 261.12 C 173.84 261.28 172.56 262.92 171.16 264.8 C 168.08 268.92 164.8 272.76 160.8 276.92 L 157.84 280.08 L 161.6 279.8 C 163.68 279.64 167.24 279.28 169.52 279 Z M 160.52 270.2 C 169.96 258.48 174.04 248.64 172.8 240.72 C 172 235.6 169.4 230.2 164.6 223.8 C 161.36 219.48 154.12 211.2 153.6 211.2 C 153.04 211.2 146.2 219.28 143.08 223.64 C 139.96 228 135.88 235.96 135 239.4 C 132.28 250.16 135.96 258.92 149.72 274.28 L 153.4 278.4 L 155.36 276.28 C 156.44 275.16 158.76 272.4 160.52 270.2 Z M 184.4 276.24 C 195.52 273.64 207.8 268.68 218.52 262.48 C 220.52 261.36 221.8 260.32 222.04 259.72 C 222.44 258.6 222.52 245.68 222.16 241.12 L 221.88 238.12 L 216.84 239 C 207.08 240.76 200.28 242.8 194.4 245.84 C 183.76 251.32 179.6 258.56 178.92 272.76 C 178.68 277.48 178.72 277.68 179.44 277.48 C 179.84 277.36 182.08 276.8 184.4 276.24 Z M 125.4 272.4 C 124.68 260.88 121.84 254.4 115.44 249.32 C 109.48 244.64 100.16 241.28 86.72 238.88 L 82.48 238.12 L 82.24 240.16 C 81.8 244.32 81.56 253.48 81.88 256 L 82.2 258.6 L 86.2 261.08 C 95.76 267.08 108.32 272.4 120.6 275.76 C 126.16 277.28 125.76 277.56 125.4 272.4 Z M 231.36 254 L 235.32 251.04 L 235.08 240.8 C 234.88 231.88 234.28 223.76 233.8 223.28 C 233.6 223.04 222.6 224.68 217.8 225.64 C 201.92 228.8 190.84 234.28 185.32 241.72 C 183.56 244.08 180.76 249.48 180.2 251.6 C 179.96 252.4 180.16 252.28 181.08 251 C 184.04 246.96 189.84 242.96 196.72 240.16 C 203.28 237.52 209.68 235.96 223.08 233.76 C 225.4 233.4 225.88 234.36 226.2 240.24 C 226.4 243.08 226.52 248.16 226.52 251.52 C 226.52 255.88 226.64 257.52 226.96 257.28 C 227.2 257.08 229.16 255.6 231.36 254 Z M 78.2 238.52 C 78.6 233.36 78.64 233.36 85.24 234.4 C 91.88 235.48 98.24 236.96 102.84 238.4 C 111.2 241.12 119.76 246.28 122.8 250.56 C 123.56 251.56 124.2 252.4 124.28 252.4 C 124.6 252.4 122.24 246.76 121.08 244.84 C 119.4 241.96 115.24 237.52 112.2 235.4 C 107.2 231.84 100.12 228.92 91.44 226.8 C 86 225.44 75.64 223.68 72.4 223.52 L 70.2 223.4 L 69.72 228.6 C 69.48 231.48 69.16 237.08 68.96 241.12 C 68.72 247.4 68.76 248.48 69.28 248.92 C 69.6 249.2 71.56 250.72 73.64 252.36 L 77.4 255.28 L 77.64 248.8 C 77.8 245.24 78.04 240.6 78.2 238.52 Z M 131.16 237.8 C 133.32 229.92 139.48 220.24 149.2 209.4 C 150.8 207.64 152.44 206.08 152.88 205.88 C 154.04 205.44 154.92 206.12 159.16 210.72 C 171.6 224.16 177.12 234.24 177.2 243.6 C 177.24 246.08 177.24 246.16 177.76 245 C 179.84 240.12 180.32 232.24 178.84 226.64 C 176.6 218.24 170.12 208.72 158.32 196.68 L 153.4 191.64 L 148.92 196.52 C 142.56 203.48 139.56 207.16 136.04 212.4 C 127.56 225.08 125.44 235.04 128.92 245.52 L 129.8 248.2 L 130.04 244.6 C 130.16 242.64 130.68 239.56 131.16 237.8 Z M 249.56 237.44 C 259.16 226.68 264.56 218.64 270.64 206.2 C 277.08 192.96 280.92 179.8 282.88 164.4 C 283.64 158.12 283.56 140.32 282.68 134 C 278.72 105.2 266.92 80.52 247.2 59.88 C 244.96 57.56 242.28 54.88 241.2 54 L 239.28 52.4 L 239.48 53.88 C 239.72 55.64 239 69.16 238.32 76.16 C 238 79.32 237.64 81.08 237.24 81.48 C 236.56 82.2 234.08 82.04 225.76 80.8 C 204.6 77.64 191.32 72.24 183.48 63.6 L 181.32 61.2 L 181.08 66.28 C 180.84 72.36 180 75.6 177.2 81.52 C 173 90.28 164.44 101.56 154.48 111.36 C 151.76 114.04 151.12 114.48 150.28 114.24 C 149.12 113.96 139.92 104.4 134.4 97.8 C 124.8 86.32 120.4 76.88 120.4 67.84 L 120.4 64.28 L 118.68 65.88 C 111.08 72.88 98.4 77.68 79.72 80.6 C 70.72 82 67.52 82.24 66.88 81.52 C 66.32 80.8 65.32 70.8 64.96 61.8 L 64.68 55.16 L 61.28 58.48 C 48 71.56 36.56 90.04 30.32 108.4 C 25.32 123.2 23.32 136.56 23.72 153.32 C 24.16 173.44 28.52 190.72 37.6 208.6 C 43.8 220.8 52.8 233.2 62.08 242.32 L 64.68 244.84 L 64.96 238.72 C 65.44 227.96 66.32 219.88 67.12 219.28 C 67.92 218.68 70 218.8 78.4 220.04 C 99.92 223.24 114.16 229.12 121.32 237.84 L 123 239.84 L 123.08 235.44 C 123.24 222.52 130.8 209.24 148.68 190.52 C 150.64 188.52 152.64 186.72 153.16 186.56 C 154 186.32 154.84 187 159.96 192.24 C 170.16 202.64 175.88 209.96 179.6 217.4 C 182.68 223.48 183.6 226.68 183.88 232.08 L 184.12 236.36 L 186.04 234.64 C 192.56 228.76 202.96 224.44 217.8 221.4 C 221.52 220.64 234.12 218.8 235.68 218.8 C 237.52 218.8 237.84 219.56 238.36 225.08 C 238.88 230.72 239.56 241.8 239.6 245.12 L 239.6 247.28 L 242.6 244.6 C 244.24 243.12 247.4 239.88 249.56 237.44 Z M 159.08 100.2 C 174.88 82.04 179.8 68.64 175.48 55.8 L 174.52 53 L 174.28 56.44 C 173.48 66.84 166.48 79.4 154.4 92.12 C 151.72 94.96 151.24 95.28 150.32 95.08 C 149.28 94.8 142.68 87.8 138.2 82.2 C 130.76 72.88 127.24 64.96 127.16 57.44 L 127.16 54.2 L 126.2 56.88 C 122.72 66.8 124.48 76.52 131.6 87.12 C 134.96 92.08 137.6 95.32 144.48 102.72 L 150.52 109.28 L 152.88 106.92 C 154.2 105.64 157 102.64 159.08 100.2 Z M 157.08 82.6 C 165.76 71.88 170 62.92 170 55.28 C 170 46.96 166.2 39.8 155.12 27.32 C 152.96 24.84 151 22.8 150.8 22.8 C 150.28 22.8 144.84 29.08 141.6 33.4 C 136.32 40.44 133.16 46.56 131.84 52.28 C 129.64 62.08 133.68 71.04 147.12 86.08 L 150.6 90 L 152.52 87.88 C 153.6 86.76 155.64 84.36 157.08 82.6 Z M 78.52 76.6 C 103.52 72.68 116.44 65.96 122.16 53.84 C 124.48 49 124.36 48.8 121.16 52.08 C 114.68 58.6 104.36 63.04 89.2 65.76 C 80.76 67.28 79.8 67.36 79.12 66.64 C 78.4 65.92 78 62 77.64 51.52 L 77.4 44.44 L 73.4 47.64 C 71.2 49.4 69.24 51.24 69.08 51.72 C 68.52 53.08 69.52 74.96 70.2 77.12 C 70.44 77.8 71.28 77.72 78.52 76.6 Z M 234.12 76.12 C 234.72 72.2 235.24 61.92 235.12 55.6 L 235 48.6 L 231.4 45.88 C 225.88 41.72 226.44 41.28 226.44 49.4 C 226.44 59.76 226.04 65.48 225.2 66.52 L 224.52 67.36 L 218.96 66.44 C 200.68 63.48 189.36 58.84 182.6 51.52 L 179.96 48.64 L 180.96 51.36 C 185.84 64.36 198.68 72.08 221.8 75.96 C 234.08 78.04 233.84 78.04 234.12 76.12 Z M 90.84 61.16 C 101.28 59.12 109.72 55.84 115.16 51.76 C 121.72 46.84 124.76 39.72 125.44 27.72 C 125.68 23.6 125.64 22.8 125.16 22.96 C 124.84 23.08 122.8 23.6 120.6 24.16 C 109.24 27.04 95.8 32.76 85.76 39.04 L 82.12 41.32 L 81.84 45.4 C 81.56 49.24 81.76 55.84 82.24 60.68 L 82.44 62.76 L 83.72 62.56 C 84.44 62.44 87.64 61.8 90.84 61.16 Z M 222.16 59.72 C 222.48 55.88 222.48 44.04 222.16 41.32 L 221.88 39.28 L 217.64 36.88 C 206.84 30.8 196.76 26.72 185.2 23.84 C 182.08 23.04 179.36 22.4 179.16 22.4 C 178.6 22.4 178.72 29.36 179.4 33.6 C 181.04 44.52 185.16 50.36 194.6 55.16 C 200.44 58.16 212.04 61.4 221.64 62.76 C 221.76 62.8 222 61.44 222.16 59.72 Z M 174.36 40.6 C 174.12 38.84 174 33.84 174.08 29.48 C 174.2 21.84 174.16 21.56 173.4 21.4 C 171 20.88 165.52 20.32 160.4 20.12 L 154.6 19.88 L 156.2 21.72 C 157.08 22.72 159.8 25.68 162.2 28.32 C 166.76 33.2 169.48 36.6 172.72 41.24 C 173.76 42.72 174.64 43.88 174.68 43.84 C 174.72 43.84 174.56 42.36 174.36 40.6 Z M 139.04 28.8 C 140.84 26.72 143 24.36 143.8 23.6 C 144.6 22.84 145.64 21.68 146.08 21.04 L 146.92 19.92 L 143.96 20.16 C 140.48 20.48 132.16 21.56 131 21.84 C 130.24 22.04 130.2 22.36 130.2 30.92 L 130.2 39.84 L 132.96 36.2 C 134.48 34.24 137.2 30.88 139.04 28.8 Z"
              variants={icon}
              initial="hidden"
              animate={animationOfLogo}
            />
          </motion.svg>
        </motion.div>
        <motion.div
          className={classes.LogoContainerTxt}
          variants={textIcon}
          initial="hidden"
          animate={animationOfLogo}
        >
          <img src={LogoText} alt="Imagen Inicial"/>
        </motion.div>
      </div>
      <div className={classes.First}>
        <motion.div
          initial="closed"
          animate={animationOfCircle}
          custom={height}
          ref={containerRef}
          className={classes.CircleBox}
        >
          <motion.div className={classes.CircleBoxBackground} variants={circleShow}/>
          <motion.div className={classes.CircleBoxBackground} variants={circleShow}>
            <div className={classes.CircleBoxBackgroundCnt}>
              <p>
                <FormattedMessage id="inicio.phrase1"/>
              </p>
            </div>
          </motion.div>
        </motion.div>
        <Parallax
          className={classes.ParallaxPhoto}
          bgImage={BeesPhoto}
          bgImageAlt="abejas"
          strength={200}
        >
        <div ref={onScrollRefCircle} className={classes.ParallaxPhotoCnt}></div>
        </Parallax>
        <motion.div
          className={[classes.Phrase, classes.Back].join(' ')}
         >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <p><FormattedMessage id="inicio.phrase2"/></p>
          </motion.div>
        </motion.div>
        <section className={classes.Intro}>
          <div className={classes.IntroInfo}>
            <p>
              <FormattedMessage id="inicio.phrase3"/>
            </p>
            <p>
              <FormattedMessage id="inicio.phrase4"/>
            </p>
          </div>
          <motion.div
            ref={onScrollRef}
            className={classes.IntroIcons}
            initial="hidden"
            animate={animationOfIcons}
            variants={variantsIcons}
          >
            <motion.div
              className={classes.IntroIcons_card}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1
                }
              }}
            >
              <img src={Barras} alt="Barras"/>
              <p><FormattedMessage id="inicio.icon1"/></p>
            </motion.div>
            <motion.div
              className={classes.IntroIcons_card}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1
                }
              }}
            >
              <img src={BolsaDinero} alt="Dinero"/>
              <p><FormattedMessage id="inicio.icon2"/></p>
            </motion.div>
            <motion.div
              className={classes.IntroIcons_card}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1
                }
              }}
            >
              <img src={Pastel} alt="Pastel"/>
              <p><FormattedMessage id="inicio.icon3"/></p>
            </motion.div>
          </motion.div>
        </section>
        <section className={classes.Phrase}>
          <p>
            <FormattedMessage id="inicio.phrase5"/>
          </p>
          <p>
            <FormattedMessage id="inicio.phrase6"/>
          </p>
        </section>
        <Parallax
          className={classes.ParallaxPhoto}
          bgImage={HomeImage}
          bgImageAlt="Cafetalero"
          strength={200}
        >
          <div className={classes.ParallaxPhotoCnt}></div>
        </Parallax>
        <section
          className={classes.Phrase}
        >
          <p><FormattedMessage id="inicio.phrase7"/></p>
        </section>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    animatedLogo: state.auth.animatedLogo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAnimated: () => dispatch(actions.animatedIntro())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
