import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Grid, Segment, Button, Form as UIForm, Loader } from 'semantic-ui-react';
import StepForm from '../StepForm';
import ImageField from '../../components/ImageField';
import TextField from '../../components/TextField';
import DropdownField from '../../components/DropdownField';
import InputError from '../../components/InputError';
import { createRecipe, fetchRecipe, editRecipe } from '../../routines';
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
  steps: Yup.array().of(
    Yup.string()
      .min(2, 'Minimum length - 2 characters')
      .max(255, 'Maximum length - 255 characters')
      .required('Required'),
  ),
  ingredients: Yup.array().of(
    Yup.string()
      .min(2, 'Minimum length - 2 characters')
      .max(100, 'Maximum length - 100 characters')
      .required('Required'),
  ).required('Select ingredients')
});

const RecipeForm = () => {
  const dispatch = useDispatch();
  const { createRecipeLoading, editRecipeLoading, fetchRecipeLoading, recipe } = useSelector(({
    createRecipeData: { loading: createRecipeLoading },
    editRecipeData: { loading: editRecipeLoading },
    fetchRecipeData: { loading: fetchRecipeLoading, ...recipe }
  }) => ({
    fetchRecipeLoading,
    createRecipeLoading,
    editRecipeLoading,
    recipe
  }));

  const { id } = useParams();
  const history = useHistory();

  const [imgFile, setImgFile] = useState(null);
  const [ingredientsLoading, setIngredientsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dropdownTouched, setDropdownTouched] = useState(false);

  useEffect(() => {
    if(id) {
      dispatch(fetchRecipe(id));
    }
  }, [id]);

  const onImageChange = (image) => setImgFile(image);

  const onIngredientAddition = (event, { value }) => {
    setIngredients([
      ...ingredients.filter(ing => ing.value !== value),
      { text: value, value }
    ]);
  };

  const onDropdownKeyDown = (event) => {
    if (event.which === 32) {
      event.preventDefault();
      if (event.target.value.trim() !== '') {
        onIngredientAddition(event, {
          value: event.target.value
        });
      }
    }
  };

  const onDropdownChange = (setFieldValue) => (event, { value }) => {
    setFieldValue('ingredients', value);
  };

  const onCancelClick = () => history.push('/');

  const fetchAllIngredients = async () => {
    setIngredientsLoading(true);
    const ingredientsEntities = await recipeService.getAllIngredients();
    const ingredients = ingredientsEntities.map((ing) => ({ text: ing, value: ing }));
    setIngredients(ingredients);
    setIngredientsLoading(false);
  };

  const onDropdownOpen = () => {
    if(ingredients.length) {
      return;
    }

    fetchAllIngredients();
  };

  const onSubmit = (values) => {
    if(id) {
      dispatch(editRecipe( { ...values, recipeId: id, imgFile, ingredients: selectedIngredients }));
    } else {
      dispatch(createRecipe({ ...values, imgFile, ingredients: selectedIngredients }));
    }
  };

  // console.log(recipe);
  return (
    <Container>
      {fetchRecipeLoading ? (
        <div>
          <Loader inverted />
        </div>
      ) : (
        <>
          <h2 className={styles.mainHeading}>{id ? 'Edit recipe' : 'Create recipe'}</h2>
          <Formik
            initialValues={{
              title: recipe.title,
              calorificValue: recipe.calorificValue,
              duration: recipe.duration,
              steps: recipe.steps,
              ingredients: recipe.ingredients
            }}
            validationSchema={FormSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, values: { steps } }) => (
              <>
                <Segment>
                  <Form className="ui form">
                    <Grid>
                      <Grid.Column computer={6} tablet={8} mobile={16} stretched>
                        <UIForm.Field required disabled={createRecipeLoading || editRecipeLoading}>
                          <label>Dish image</label>
                          <Field
                            type="file"
                            name="imgFile"
                            defaultImage={recipe.imgUrl}
                            onImageChange={onImageChange}
                            component={ImageField}
                          />
                        </UIForm.Field>
                      </Grid.Column>
                      <Grid.Column computer={10} tablet={8} mobile={16}>
                        <UIForm.Field required disabled={createRecipeLoading || editRecipeLoading}>
                          <label>Title</label>
                          <Field
                            type="text"
                            loading={createRecipeLoading || editRecipeLoading}
                            name="title"
                            placeholder="Enter recipe title"
                            component={TextField}
                          />
                          <InputError name="title" />
                        </UIForm.Field>
                        <UIForm.Field required disabled={createRecipeLoading || editRecipeLoading}>
                          <label>Calorific value</label>
                          <Field
                            type="text"
                            loading={createRecipeLoading || editRecipeLoading}
                            name="calorificValue"
                            placeholder="Enter the number of calories in the dish"
                            component={TextField}
                          />
                          <InputError name="calorificValue" />
                        </UIForm.Field>
                        <UIForm.Field required disabled={createRecipeLoading || editRecipeLoading}>
                          <label>Duration</label>
                          <Field
                            type="text"
                            loading={createRecipeLoading || editRecipeLoading}
                            name="duration"
                            placeholder="Enter approximate cooking time"
                            component={TextField}
                          />
                          <InputError name="duration" />
                        </UIForm.Field>
                        <UIForm.Field required disabled={
                          ingredientsLoading ||
                          createRecipeLoading ||
                          editRecipeLoading
                        }>
                          <label>Ingredients</label>
                          <Field
                            // placeholder="Select ingredients"
                            name="ingredients"
                            onOpen={onDropdownOpen}
                            onKeyDown={onDropdownKeyDown}
                            onAddItem={onIngredientAddition}
                            onChange={onDropdownChange}
                            loading={ingredientsLoading}
                            options={ingredients}
                            component={DropdownField}
                          />
                          <InputError name="ingredients" />
                          {/* <DropdownField
                            name="ingredients"
                            onOpen={onDropdownOpen}
                            placeholder="Select ingredients"
                            loading={ingredientsLoading}
                            options={ingredients}
                            value={selectedIngredients}
                            onKeyDown={onDropdownKeyDown}
                            onAddItem={onIngredientAddition}
                            onChange={onDropdownChange}
                          /> */}
                          {/* {
                            !selectedIngredients.length &&
                            dropdownTouched &&
                            <InputError customError="Select ingredients" />
                          } */}
                        </UIForm.Field>
                      </Grid.Column>
                    </Grid>
                    <StepForm steps={steps} />
                    <div className={styles.reverseBox}>
                      <Button
                        primary
                        floated="right"
                        loading={createRecipeLoading}
                        type="submit"
                        className={styles.submitButton}
                      >
                        {id ? 'Edit recipe' : 'Create recipe'}
                      </Button>
                      <Button secondary floated="right" disabled={createRecipeLoading} onClick={onCancelClick}>
                      Cancel
                      </Button>
                    </div>
                  </Form>
                </Segment>
              </>
            )}
          </Formik>
        </>
      )}
    </Container>
  );
};

RecipeForm.propTypes = {
  createRecipe: PropTypes.func,
  createRecipeLoading: PropTypes.bool,
  editRecipeLoading: PropTypes.bool,
  fetchRecipeLoading: PropTypes.bool,
};

export default RecipeForm;
