import React from 'react';
import { Form as UIForm, TextArea } from 'semantic-ui-react';

const TextAreaField = ({ field, placeholder, loading }) => {
  return (
    <TextArea
      {...field}
      rows="3"
      placeholder={placeholder}
      disabled={loading}
    />
  );
};

export default TextAreaField;
