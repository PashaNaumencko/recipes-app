import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

import styles from './styles.module.scss';

export class InputError extends React.Component {
  render() {
    return (
      <div className={styles.errorWrapper}>
        <ErrorMessage name={this.props.name} />
      </div>
    );
  }
}

InputError.propTypes = {
  name: PropTypes.string
};

export default InputError;
