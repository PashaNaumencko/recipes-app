import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Image, Icon, Form as UIForm } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const AdditionInfoSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required')
});

class AdditionalInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };

  }

  onIngredientAddition = (event, { value }) => this.setState({
    ingredients: [...this.state.ingredients.filter(ing => ing.value !== value), { text: value, value }]
  });

  onDropdownKeyDown = (event) => {
    if (event.which === 32) {
      event.preventDefault();
      if (event.target.value.trim() !== '') {
        this.onIngredientAddition(event, { value: event.target.value });
      }
    }
  }

  renderDropdownField = ({ field, form: { errors } }) => {
    if (field.value === null) {
      field.value = '';
    } 

    const { ingredients } = this.state;

    return (
      <UIForm.Dropdown
        error={errors[field.name] ? { content: errors[field.name], pointing: 'left' } : null}
        noResultsMessage="Enter new ingrediens and press Enter."
        fluid 
        multiple 
        search 
        scrolling 
        selection 
        allowAdditions
        compact
        options={ingredients}
        onKeyDown={this.onDropdownKeyDown}
        onAddItem={this.onIngredientAddition}
        {...field} 
      />
    );
  }

  render() {
    return(
      <Segment>
        <h2 className={styles.mainHeading}>Additional info</h2>
        <Formik
          initialValues={{
            title: ''
          }}
          validationSchema={AdditionInfoSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="ui form">
              <UIForm.Field required>
                <label>Calorific value</label>
                <Field name="calorificValue" type="number" placeholder="Enter the number of calories in the dish" render={this.renderField} />
              </UIForm.Field>
              <UIForm.Field required>
                <label>Duration</label>
                <Field name="duration" type="text" placeholder="Enter approximate cooking time" render={this.renderField} />
              </UIForm.Field>
              <UIForm.Field required>
                <label>Ingredients</label>
                <Field name="ingredients" type="text" placeholder="Enter ingredients" render={this.renderDropdownField} />
              </UIForm.Field>
              <Button type="submit" disabled={errors.description && !touched.description} className={styles.submitButton}> 
                  Save
              </Button>
            </Form>
          )}
        </Formik>
      </Segment>
    );
  }

}

export default AdditionalInfoForm;
