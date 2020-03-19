import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const DropdownField = (props) => {
  // const hasError = Boolean(touched[field.name] && errors[field.name]);
  return (
    <Dropdown
      {...props}
      noResultsMessage="Enter new ingrediens and press Enter."
      fluid
      multiple
      search
      scrolling
      selection
      allowAdditions
      compact
    />
  );
};

export default DropdownField;
