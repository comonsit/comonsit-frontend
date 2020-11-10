import React from 'react';

import classes from './Loading.module.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';


const loading = props => (
    <div className={classes.Backdrop}>
      <Spinner />
    </div>

);

export default loading;
