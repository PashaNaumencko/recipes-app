import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const DropdownField = ({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  onChange,
  ...props
}) => {
  const hasError = Boolean(touched[name] && errors[name]);
  return (
    <Dropdown
      {...props}
      error={hasError}
      value={value}
      onChange={onChange(setFieldValue)}
      noResultsMessage="Enter new ingrediens and press Enter."
      fluid
      multiple
      labeled
      search
      defaultOpen
      scrolling
      selection
      allowAdditions
      compact
    />
  );
};

export default DropdownField;
