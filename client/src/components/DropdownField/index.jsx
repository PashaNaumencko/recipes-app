import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const DropdownField = (props) => {
  // const hasError = Boolean(touched[field.name] && errors[field.name]);
  return (
    <Dropdown
      {...props}
      // {...field}
      // value={value}
      // placeholder={placeholder}
      noResultsMessage="Enter new ingrediens and press Enter."
      fluid
      multiple
      search
      scrolling
      selection
      allowAdditions
      compact
      // icon={touched[field.name] &&
      //   <Icon
      //     name={hasError ? 'exclamation circle' : 'check circle'}
      //     color={hasError ? 'red' : 'green'}
      //   />
      // }
      // options={options}
      // onKeyDown={onKeyDown}
      // onAddItem={onAddItem}
      // onChange={onChange}
    />
  );
};

export default DropdownField;
