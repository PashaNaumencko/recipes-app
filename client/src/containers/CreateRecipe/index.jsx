import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Grid, Segment, Button, Image, Loader, Icon, Form as UIForm } from 'semantic-ui-react';
import StepForm from '../../components/StepForm/index';
import AdditionalInfoForm from '../../components/AdditionalInfoForm/index';
import { createRecipe, fetchRecipe, editRecipeTitle } from '../../routines/routines';
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
      imgFile: null,
      isCreating: false,
      isEditing: false
    };

    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.onEditTitleSubmit = this.onEditTitleSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchRecipe } = this.props;
    if (id) {
      fetchRecipe(id);
      this.setState({ isCreating: true });
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
      <>
        <h2 className={styles.mainHeading}>{isEditing ? 'Edit recipe title' : 'Create recipe'}</h2>
        <Formik
          initialValues={{
            title
          }}
          validationSchema={TitleSchema}
          onSubmit={isEditing ? this.onEditTitleSubmit : this.onCreateSubmit}
        >
          {({ errors, touched }) => (
            <Form className="ui form">
              <UIForm.Group>
                <Field type="text" name="title" placeholder="Enter recipe title" render={this.renderField} />
                <Button type="submit" disabled={errors.title || !touched.title} className={styles.submitButton}>
                  {isEditing ? 'Edit recipe title' : 'Create recipe'}
                </Button>
                {isEditing ? (
                  <Button onClick={this.onCancelClick}>
                    Cancel
                  </Button>
                ): null}
              </UIForm.Group>
              <Field type="file" name="imgFile" render={this.renderImageUploader} />
            </Form>
          )}
        </Formik>
      </>
    );
  }

  onEditClick() {
    this.setState({ isEditing: true });
  }

  onCancelClick() {
    this.setState({ isEditing: false });
  }


  onCreateSubmit(values) {
    const { imgFile } = this.state;
    this.props.createRecipe({ ...values, imgFile });
    const { fetchRecipeLoading } = this.props;
    if(!fetchRecipeLoading) {
      this.setState({ isCreating: true, isEditing: false });
    }
  }

  onEditTitleSubmit(values) {
    const { imgFile } = this.state;
    const { recipeId } = this.props;
    this.props.editRecipeTitle({ ...values, recipeId, imgFile });
    const { fetchRecipeLoading } = this.props;
    if(!fetchRecipeLoading) {
      this.setState({ isEditing: false });
    }
  }

  render() {
    const { isCreating, isEditing } = this.state;
    const { imgUrl, title, createRecipeLoading, fetchRecipeLoading, editRecipeTitleLoading } = this.props;
    return fetchRecipeLoading ? (
      <Container>
        <Segment basic loading></Segment>
      </Container>
    ) : (
      <Container>
        <Segment>
          {createRecipeLoading || editRecipeTitleLoading ? (
            <Segment basic loading></Segment>
          ) : isEditing ? 
            this.renderCreateRecipeForm() 
            : isCreating ? (
              <div className={styles.recipeTitlePlaceholder}>
                <h2 className={styles.mainHeading}>{title}</h2>
                <Image src={imgUrl} />
                <Button onClick={this.onEditClick}>
                  Edit recipe title
                </Button>
              </div>
            ) : this.renderCreateRecipeForm()}
        </Segment >
        {isCreating ? (
          <Grid>
            <Grid.Column computer={10} tablet={8} mobile={16}>
              <StepForm />
            </Grid.Column>
            <Grid.Column computer={6} tablet={8} mobile={16}>
              <AdditionalInfoForm />
            </Grid.Column>
          </Grid >
        ) : null}
      </Container>
    );
  }
}

CreateRecipe.propTypes = {
  recipeId: PropTypes.string,
  createRecipe: PropTypes.func,
  fetchRecipe: PropTypes.func
};

const mapStateToProps = ({ 
  currentRecipeData: { id, imgUrl, title, loading: fetchRecipeLoading }, 
  createRecipeData: { loading: createRecipeLoading },
  editRecipeTitleData: { loading: editRecipeTitleLoading },
}) => ({
  recipeId: id,
  title,
  imgUrl,
  createRecipeLoading,
  editRecipeTitleLoading,
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
