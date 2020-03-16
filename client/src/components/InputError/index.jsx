import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

import styles from './styles.module.scss';

const InputError = ({ name, customError }) =>  (
  <div className={styles.errorWrapper}>
    {customError || <ErrorMessage name={name} />}
  </div>
);

InputError.propTypes = {
  name: PropTypes.string
};

export default InputError;
