import React from 'react';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import classes from './Conocenos.module.scss';


export const YomolCard = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (props.activate) {
      setIsOpen(true)
    }
  }, [props.activate])

  return (
    <motion.div
      layout
      onClick={toggleOpen}
      className={classes.Yomol_Card}
    >
      <motion.div layout><h4>{props.title}{isOpen}</h4></motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ default: {duration: .3, delay: .1, ease: "easeIn"}}}
            exit={{ opacity: 0, }}
          >
            {props.children}
          </motion.div>)
        }
      </AnimatePresence>
    </motion.div>
  );
}

export default YomolCard;
