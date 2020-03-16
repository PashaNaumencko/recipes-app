import React from 'react';
import { TextArea } from 'semantic-ui-react';

const TextAreaField = ({ field, form: { errors } }) => (
  <TextArea
    {...field}
    rows="3"
    error={errors[field.name] ? { content: errors[field.name], pointing: 'top' } : null}
  />
);

export default TextAreaField;
