import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Grid, Segment, Button, Image, Icon, Form as UIForm, DropdownItem } from 'semantic-ui-react';
import StepForm from '../../components/StepForm/index';
import AdditionalInfoForm from '../../components/AdditionalInfoForm/index';
import RecipeVersions from '../../components/RecipeVersions';
import ImageField from '../../components/ImageField';
import TextField from '../../components/TextField';
import DropdownField from '../../components/DropdownField';
import InputError from '../../components/InputError';
import { createRecipe, fetchRecipe, editRecipeTitle } from '../../routines/routines';
import * as recipeService from '../../services/recipeService';


import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

export const FormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required'),
  // image: Yup.string()
  //   .min(2, 'Minimum length - 2 characters')
  //   .max(255, 'Maximum length - 255 characters')
  //   .required('Required'),
  calorificValue: Yup.number()
    .positive()
    .integer()
    .required('Required'),
  // .matches(/^\d+$/, 'Age should be a positive number')
  // .test('calorificValue', 'Age should be non-zero value', value => Number(value) !== 0)
  // .required('Required'),
  duration: Yup.string()
    .matches(/^\d+$/, 'Age should be a positive number')
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
      dropdownTouched: false
      // versionLoading: false
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

  // renderCreateRecipeForm() {
  //   const { isEditing } = this.state;
  //   const { title } = this.props;
  //   return (

  //   );
  // }

  // onCancelClick = () => {
  //   const { isEditing  } = this.state;
  //   const { history } = this.props;
  //   if(isEditing) {
  //     this.setState({ isEditing: false });
  //   }
  //   else {
  //     history.push('/');
  //   }
  // }

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
    const { imgFile } = this.state;
    const { history } = this.props;
    this.props.createRecipe({ ...values, imgFile, history });
    this.setState({ isCreating: true, isEditing: false });
  }

  // onEditSubmit = (values) => {
  //   const { imgFile } = this.state;
  //   const { recipeId } = this.props;
  //   this.props.editRecipeTitle({ ...values, recipeId, imgFile });
  //   this.setState({ isEditing: false });
  // }

  render() {
    const { ingredients, isEditing, dropdownTouched, selectedIngredients } = this.state;
    const {
      imgUrl,
      title,
      calorificValue,
      duration,
      // ingredients,
      createRecipeLoading,
      fetchRecipeLoading,
      editRecipeLoading
    } = this.props;

    return (
      <Container>
        <Segment>
          <h2 className={styles.mainHeading}>{isEditing ? 'Edit recipe title' : 'Create recipe'}</h2>
          <Formik
            initialValues={{
              title
            }}
            validationSchema={FormSchema}
          // onSubmit={isEditing ? this.onEditSubmit : this.onCreateSubmit}
          >
            {({ errors, touched }) => (
              <Form className="ui form">
                <Grid>
                  <Grid.Column computer={6} tablet={8} mobile={16} stretched>
                    <UIForm.Field required>
                      <label>Dish image</label>
                      <Field type="file" name="imgFile" component={ImageField} />
                    </UIForm.Field>
                  </Grid.Column>
                  <Grid.Column computer={10} tablet={8} mobile={16}>
                    <UIForm.Field required>
                      <label>Title</label>
                      <Field type="text" name="title" placeholder="Enter recipe title" component={TextField} />
                      <InputError name='title' />
                    </UIForm.Field>
                    <UIForm.Field required>
                      <label>Calorific value</label>
                      <Field type="text" name="calorificValue" placeholder="Enter the number of calories in the dish" component={TextField} />
                      <InputError name='calorificValue' />
                    </UIForm.Field>
                    <UIForm.Field required>
                      <label>Duration</label>
                      <Field type="text" name="duration" placeholder="Enter approximate cooking time" component={TextField} />
                      <InputError name='duration' />
                    </UIForm.Field>
                    <UIForm.Field required>
                      <label>Ingredients</label>
                      <DropdownField
                        name="ingredients"
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
                    <Button primary floated="right"  type="submit" className={styles.submitButton}>
                      {isEditing ? 'Edit recipe title' : 'Create recipe'}
                    </Button>
                    <Button secondary floated="right" onClick={this.onCancelClick}>
                      Cancel
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            )}
          </Formik>
        </Segment>
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
  recipeId: PropTypes.string,
  createRecipe: PropTypes.func,
  fetchRecipe: PropTypes.func,
  title: PropTypes.string,
  imgUrl: PropTypes.string,
  steps: PropTypes.array,
  calorificValue: PropTypes.number,
  duration: PropTypes.string,
  ingredients: PropTypes.string,
  previousVersions: PropTypes.array,
  previousVersionId: PropTypes.string,
  rootVersionId: PropTypes.string,
  createRecipeLoading: PropTypes.bool,
  editRecipeLoading: PropTypes.bool,
  fetchRecipeLoading: PropTypes.bool,
};

const mapStateToProps = ({
  currentRecipeData: {
    id,
    imgUrl,
    title,
    steps,
    calorificValue,
    duration,
    ingredients,
    rootVersionId,
    previousVersionId,
    loading: fetchRecipeLoading
  },
  createRecipeData: { loading: createRecipeLoading },
  editRecipeTitleData: { loading: editRecipeLoading },
}) => ({
  recipeId: id,
  title,
  imgUrl,
  steps,
  calorificValue,
  duration,
  ingredients,
  rootVersionId,
  previousVersionId,
  createRecipeLoading,
  editRecipeLoading,
  fetchRecipeLoading
});

const mapDispatchToProps = {
  createRecipe,
  fetchRecipe,
  editRecipeTitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecipe);
