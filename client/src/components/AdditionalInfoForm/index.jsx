import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Statistic,Form as UIForm } from 'semantic-ui-react';
import { editRecipe } from '../../routines/routines';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const AdditionInfoSchema = Yup.object().shape({
  calorificValue: Yup.number()
    .required('Required'),
  duration: Yup.string()
    .required('Required')
});

class AdditionalInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsArray: [],
      currentValues: {},
      isEditing: false
    };

    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onDropDownChange = this.onDropDownChange.bind(this);
  }

  

  onIngredientAddition = (event, { value }) => this.setState({
    ingredientsArray: [...this.state.ingredientsArray.filter(ing => ing.value !== value), { text: value, value }]
  });

  onDropdownKeyDown = (event) => {
    if (event.which === 32) {
      event.preventDefault();
      if (event.target.value.trim() !== '') {
        this.onIngredientAddition(event, { value: event.target.value });
      }
    }
  }

  onDropDownChange(event, { value }) {
    console.log(value);
    this.setState({ currentValues: value });
  }

  renderDropdownField = ({ field, form: { errors } }) => {
    const { ingredientsArray, currentValues } = this.state;

    return (
      <UIForm.Dropdown
        noResultsMessage="Enter new ingrediens and press Enter."
        fluid 
        multiple 
        search 
        scrolling 
        selection 
        allowAdditions
        compact
        value={currentValues}
        options={ingredientsArray}
        onKeyDown={this.onDropdownKeyDown}
        onAddItem={this.onIngredientAddition}
        onChange={this.onDropDownChange}
      />
    );
  }

  onEditClick() {
    const { ingredients } = this.props;
    const ingredientsArray = ingredients.split(',').filter(Boolean);
    this.setState({ 
      isEditing: true,
      ingredientsArray: ingredientsArray.map(ing => ({ text: ing, value: ing })),
      currentValues: ingredientsArray
    });
  }

  onCancelClick() {
    this.setState({ isEditing: false });
  }

  onEditSubmit(values) {
    console.log(values, 'values');
    const { recipeId } = this.props;
    const { currentValues } = this.state;
    this.props.editRecipe({...values, recipeId, ingredients: currentValues.join(',')});
    this.setState({ isEditing: false });
  }

  renderAdditionalInfoForm() {
    const { calorificValue, duration } = this.props;
    const{ isEditing, ingredientsArray } = this.state;
    const ingValueArray = ingredientsArray.map(ing => ing);
    return (
      <Formik
        initialValues={{
          calorificValue,
          duration,
          ingredients: ingValueArray
        }}
        validationSchema={AdditionInfoSchema}
        onSubmit={this.onEditSubmit}
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
              <Field name="ingredients"  render={this.renderDropdownField} />
            </UIForm.Field>
            <Button type="submit"> 
              <Icon name="save" />
              Save
            </Button>
            {isEditing ? (
              <Button secondary onClick={this.onCancelClick}>
                Cancel
              </Button>
            ): null}
          </Form>
        )}
      </Formik>
    );
  }

  render() {
    const { calorificValue, ingredients, duration, editRecipeLoading, fetchRecipeLoading, versionLoading } = this.props;
    const{ ingredientsArray, isEditing } = this.state;
    console.log(ingredientsArray);
    return fetchRecipeLoading || versionLoading
      ? null : editRecipeLoading 
        ? <Segment loading></Segment> 
        : isEditing 
          ? (
            <Segment>
              {this.renderAdditionalInfoForm()} 
            </Segment> 
          ) : (
            <Segment>
              <h2>Additional info</h2>
              {calorificValue && ingredients && duration ? (
            <>
              <Statistic.Group>
                <Statistic>
                  <Statistic.Value>
                    <Icon name='clock outline' color="grey" />
                  </Statistic.Value>
                  <Statistic.Label>{duration}</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>
                    <Icon name='utensils' color="grey" />
                  </Statistic.Value>
                  <Statistic.Label>{calorificValue} ccal</Statistic.Label>
                </Statistic>
              </Statistic.Group>
              <h2>Ingridiens</h2>
              <p className={styles.ingrediens}>{ingredients}</p>
              <Button onClick={this.onEditClick}>
                <Icon name="edit" />
                Edit
              </Button>
            </>
              ) : this.renderAdditionalInfoForm()}
            </Segment>
          );
  }

}

const mapStateToProps = ({ 
  currentRecipeData: { id, calorificValue, ingredients, duration, loading: fetchRecipeLoading }, 
  editRecipeData: { loading: editRecipeLoading },
}) => ({
  recipeId: id,
  calorificValue, 
  ingredients, 
  duration,
  editRecipeLoading,
  fetchRecipeLoading
});

const mapDispatchToProps = {
  editRecipe
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalInfoForm);
