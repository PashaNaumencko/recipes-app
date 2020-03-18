import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Grid, Segment, Button, Image, Icon, Form as UIForm, DropdownItem } from 'semantic-ui-react';
import StepForm from '../StepForm';
import RecipeVersions from '../../components/RecipeVersions';
import ImageField from '../../components/ImageField';
import TextField from '../../components/TextField';
import DropdownField from '../../components/DropdownField';
import InputError from '../../components/InputError';
import { createRecipe, fetchRecipe, editRecipeTitle } from '../../routines';
import * as recipeService from '../../services/recipeService';


import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

export const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required'),
  calorificValue: Yup.string()
    .matches(/^\d+$/, 'Calorific value should be a positive number')
    .test('calorificValue', 'Calorific value should be non-zero value', value => Number(value) !== 0)
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required'),
  duration: Yup.string()
    .matches(/^.*[0-9].*$/, 'Duration should have at least one positive number')
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required'),
});

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // versions: [],
      imgFile: null,
      ingredients: [],
      selectedIngredients: [],
      dropdownTouched: false,
      isStepFormShown: false
    };
  }

  onImageChange = (image) => this.setState({ imgFile: image });

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

  onDropdownChange = (event, { value }) => this.setState({ dropdownTouched: true, selectedIngredients: value });

  onCancelClick = () => this.props.history.push('/');

  // onShowVersionClick() {
  //   this.setState((prevState) => ({ isShowing: !prevState.isShowing }));
  // }

  // onSaveVersionClick() {
  //   this.setState({ versionLoading: true });
  //   const {
  //     recipeId,
  //     title,
  //     imgUrl,
  //     calorificValue,
  //     duration,
  //     ingredients,
  //   } = this.props;
  //   recipeService.saveRecipeVersion({
  //     rootVersionId: recipeId,
  //     title,
  //     imgUrl,
  //     calorificValue,
  //     duration,
  //     ingredients
  //   }).then(res => this.setState({ versionLoading: false, isShowing: false }));
  //   recipeService.getAllVersions(recipeId).then(versions => this.setState({
  //     versions
  //   }));
  // }



  onCreateSubmit = (values) => {
    const { imgFile, selectedIn } = this.state;
    this.props.createRecipe({ ...values, imgFile });
  }

  // onEditSubmit = (values) => {
  //   const { imgFile } = this.state;
  //   const { recipeId } = this.props;
  //   this.props.editRecipeTitle({ ...values, recipeId, imgFile });
  //   this.setState({ isEditing: false });
  // }

  render() {
    const { ingredients, isEditing, dropdownTouched, selectedIngredients} = this.state;
    const { title, createRecipeLoading, editRecipeLoading, isStepFormShown } = this.props;

    return (
      <Container>
        <Segment>
          {/* isEditing ? 'Edit recipe title' : 'Create recipe' */}
          <h2 className={styles.mainHeading}>Create recipe</h2>
          <Formik
            initialValues={{
              title: '',
              calorificValue: '',
              duration: ''
            }}
            validationSchema={FormSchema}
            onSubmit={this.onCreateSubmit}
          >
            {({ errors, touched }) => (
              <Form className="ui form">
                <Grid>
                  <Grid.Column computer={6} tablet={8} mobile={16} stretched>
                    <UIForm.Field required disabled={createRecipeLoading}>
                      <label>Dish image</label>
                      <Field type="file" name="imgFile" component={ImageField} />
                    </UIForm.Field>
                  </Grid.Column>
                  <Grid.Column computer={10} tablet={8} mobile={16}>
                    <UIForm.Field required disabled={createRecipeLoading}>
                      <label>Title</label>
                      <Field
                        type="text"
                        loading={createRecipeLoading}
                        name="title" placeholder="Enter recipe title"
                        component={TextField}
                      />
                      <InputError name='title' />
                    </UIForm.Field>
                    <UIForm.Field required disabled={createRecipeLoading}>
                      <label>Calorific value</label>
                      <Field
                        type="text"
                        loading={createRecipeLoading}
                        name="calorificValue"
                        placeholder="Enter the number of calories in the dish"
                        component={TextField}
                      />
                      <InputError name='calorificValue' />
                    </UIForm.Field>
                    <UIForm.Field required disabled={createRecipeLoading}>
                      <label>Duration</label>
                      <Field
                        type="text"
                        loading={createRecipeLoading}
                        name="duration"
                        placeholder="Enter approximate cooking time"
                        component={TextField}
                      />
                      <InputError name='duration' />
                    </UIForm.Field>
                    <UIForm.Field required disabled={createRecipeLoading}>
                      <label>Ingredients</label>
                      <DropdownField
                        name="ingredients"
                        loading={createRecipeLoading}
                        placeholder="Select ingredients"
                        options={ingredients}
                        onKeyDown={this.onDropdownKeyDown}
                        onAddItem={this.onIngredientAddition}
                        onChange={this.onDropdownChange}
                      />
                      {!selectedIngredients.length && dropdownTouched && <InputError customError="Select ingredients" />}
                    </UIForm.Field>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button primary floated="right" loading={createRecipeLoading} type="submit" className={styles.submitButton}>
                      {isEditing ? 'Edit recipe title' : 'Create recipe'}
                    </Button>
                    <Button secondary floated="right" disabled={createRecipeLoading} onClick={this.onCancelClick}>
                      Cancel
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            )}
          </Formik>
        </Segment>
        {isStepFormShown ? (
          <Segment>
            <StepForm />
          </Segment>
        ) : null}
        {/* {isShowing ? (
          <Segment>
            <RecipeVersions versions={versions} />
          </Segment>
        ) : null} */}

      </Container>
    );
  }
}

CreateRecipe.propTypes = {
  createRecipe: PropTypes.func,
  createRecipeLoading: PropTypes.bool,
  editRecipeLoading: PropTypes.bool,
  fetchRecipeLoading: PropTypes.bool,
};

const mapStateToProps = ({
  addRecipeStepData: { isStepFormShown },
  createRecipeData: { loading: createRecipeLoading },
  editRecipeTitleData: { loading: editRecipeLoading },
}) => ({
  createRecipeLoading,
  editRecipeLoading,
  isStepFormShown
});

const mapDispatchToProps = {
  createRecipe,
  fetchRecipe,
  editRecipeTitle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecipe);
