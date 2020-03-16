import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'semantic-ui-react';

const TextField = ({ field, form: { touched, errors }, placeholder, loading  }) => {
  const hasError = Boolean(touched[field.name] && errors[field.name]);

  return (
    <Input
      {...field}
      type='text'
      placeholder={placeholder}
      error={hasError}
      disabled={loading}
      icon={touched[field.name] &&
        <Icon
          name={hasError ? 'exclamation circle' : 'check circle'}
          color={hasError ? 'red' : 'green'}
        />
      }
    />
  );
};

export default TextField;
