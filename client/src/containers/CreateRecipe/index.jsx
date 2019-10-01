import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Grid, Segment, Button, Image, Icon, Form as UIForm } from 'semantic-ui-react';
import StepForm from '../../components/StepForm/index';
import AdditionalInfoForm from '../../components/AdditionalInfoForm/index';
import RecipeVersions from '../../components/RecipeVersions/index';
import { createRecipe, fetchRecipe, editRecipeTitle, fetchAllRecipes } from '../../routines/routines';
import * as recipeService from '../../services/recipeService';
import ImageUploader from 'react-images-upload';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const TitleSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required')
});

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: [],
      imgFile: null,
      isCreating: false,
      isEditing: false,
      isShowing: false,
      versionLoading: false
    };

    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSaveVersionClick = this.onSaveVersionClick.bind(this);
    this.onShowVersionClick = this.onShowVersionClick.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchRecipe } = this.props;
    if (id) {
      fetchRecipe(id);
      this.setState({ versionLoading: true });
      recipeService.getAllVersions(id).then(versions => this.setState({ 
        versions 
      }));
      this.setState({ isCreating: true, versionLoading: false });
    }
  }

  renderField = ({ field, form }) => {
    if (field.value === null) {
      field.value = '';
    }

    return (
      <UIForm.Input
        error={form.errors[field.name] ? { content: form.errors[field.name], pointing: 'left' } : null}
        {...field}
      />
    );
  }

  onImageChange(image) {
    this.setState({
      imgFile: image
    });
  }

  renderImageUploader = ({ field }) => {
    return (
      <ImageUploader
        {...field}
        onChange={this.onImageChange}
        withIcon
        buttonText='Choose dish image'
        withPreview
        imgExtension={['.jpg', '.png']}
        maxFileSize={5242880}
        singleImage
      />
    );
  }

  renderCreateRecipeForm() {
    const { isEditing } = this.state;
    const { title } = this.props;
    return (
      <Segment>
        <h2 className={styles.mainHeading}>{isEditing ? 'Edit recipe title' : 'Create recipe'}</h2>
        <Formik
          initialValues={{
            title
          }}
          validationSchema={TitleSchema}
          onSubmit={isEditing ? this.onEditSubmit : this.onCreateSubmit}
        >
          {({ errors, touched }) => (
            <Form className="ui form">
              <UIForm.Group>
                <Field type="text" name="title" placeholder="Enter recipe title" render={this.renderField} />
                <Button primary type="submit" className={styles.submitButton}>
                  {isEditing ? 'Edit recipe title' : 'Create recipe'}
                </Button>
                {isEditing ? (
                  <Button secondary onClick={this.onCancelClick}>
                    Cancel
                  </Button>
                ): null}
              </UIForm.Group>
              <Field type="file" name="imgFile" render={this.renderImageUploader} />
            </Form>
          )}
        </Formik>
      </Segment>
    );
  }

  onEditClick() {
    this.setState({ isEditing: true });
  }

  onCancelClick() {
    this.setState({ isEditing: false });
  }

  onShowVersionClick() {
    this.setState((prevState) => ({ isShowing: !prevState.isShowing }));
  }

  onSaveVersionClick() {
    this.setState({ versionLoading: true });
    const { 
      recipeId,
      title,
      imgUrl,
      calorificValue, 
      duration, 
      ingredients,
    } = this.props;
    recipeService.saveRecipeVersion({ 
      rootVersionId: recipeId,
      title,
      imgUrl,
      calorificValue, 
      duration, 
      ingredients 
    }).then(res => this.setState({ versionLoading: false, isShowing: false }));
    recipeService.getAllVersions(recipeId).then(versions => this.setState({ 
      versions
    }));
  }

  onCreateSubmit(values) {
    const { imgFile } = this.state;
    const { history } = this.props;
    this.props.createRecipe({ ...values, imgFile, history });
    this.setState({ isCreating: true, isEditing: false });
  }

  onEditSubmit(values) {
    const { imgFile } = this.state;
    const { recipeId } = this.props;
    this.props.editRecipeTitle({ ...values, recipeId, imgFile });
    this.setState({ isEditing: false });
  }

  render() {
    const { isCreating, isEditing, versionLoading, isShowing, versions } = this.state;
    console.log(versions);
    const { 
      imgUrl, 
      title, 
      steps,
      calorificValue, 
      duration, 
      ingredients,
      createRecipeLoading, 
      fetchRecipeLoading, 
      editRecipeLoading
    } = this.props;
    
    return (
      <Container>
        {fetchRecipeLoading || versionLoading || createRecipeLoading || editRecipeLoading  ? (
          <Segment loading></Segment>
        ) : isEditing ? 
          this.renderCreateRecipeForm() 
          : isCreating ? (
            <Segment>
              <div className={styles.recipeTitlePlaceholder}>
                <h2 className={styles.mainHeading}>{title}</h2>
                <Image src={imgUrl} />
                <Button onClick={this.onEditClick}>
                    Edit recipe title
                </Button>
              </div>
            </Segment >
          ) : this.renderCreateRecipeForm()}

        {isCreating ? (
          <Grid>
            <Grid.Column computer={10} tablet={8} mobile={16}>
              <StepForm versionLoading={versionLoading} />
            </Grid.Column>
            <Grid.Column computer={6} tablet={8} mobile={16}>
              <AdditionalInfoForm versionLoading={versionLoading} />
            </Grid.Column>
            <div className={styles.reverseBox}>
              <Button 
                onClick={this.onSaveVersionClick} 
                secondary
                disabled={!(
                  imgUrl 
                  && title 
                  && steps.length 
                  && calorificValue 
                  && duration 
                  && ingredients
                )}
              >
                <Icon name="save" />
                Save new version
              </Button>

              <Button 
                onClick={this.onShowVersionClick} 
                primary={!isShowing}
                secondary={isShowing}
                disabled={!versions.length}
              >
                {isShowing ? 'Hide versions' : 'Show versions'}
              </Button>
            </div>
          </Grid>
        ) : null}
        {isShowing ? (
          <Segment>
            <RecipeVersions versions={versions} />
          </Segment>
        ) : null}

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
