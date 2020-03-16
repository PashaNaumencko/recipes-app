import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Form as UIForm } from 'semantic-ui-react';
import AdditionalInfo from '../AdditionalInfo/index';
import { editRecipe } from '../../routines/routines';
import { Formik, Form, Field } from 'formik';

import './styles.module.scss';
class AdditionalInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsArray: [],
      currentValues: {},
      isEditing: false
    };
  }



  onEditClick = () => {
    const { ingredients } = this.props;
    const ingredientsArray = ingredients.split(',').filter(Boolean);
    this.setState({
      isEditing: true,
      ingredientsArray: ingredientsArray.map(ing => ({ text: ing, value: ing })),
      currentValues: ingredientsArray
    });
  }

  onCancelClick = () => this.setState({ isEditing: false });

  onEditSubmit = (values) => {
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
        onSubmit={this.onEditSubmit}
      >
        {({ errors, touched, values }) => (
          <Form className="ui form">
            <Button type="submit" disabled={!values.calorificValue || !values.duration || ingredientsArray.length === 0} >
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
    const{ isEditing } = this.state;
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
              <AdditionalInfo calorificValue={calorificValue} ingredients={ingredients} duration={duration} />
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

AdditionalInfoForm.propTypes = {
  recipeId: PropTypes.string,
  editRecipe: PropTypes.func,
  calorificValue: PropTypes.number,
  duration: PropTypes.string,
  ingredients: PropTypes.string,
  editRecipeLoading: PropTypes.bool,
  fetchRecipeLoading: PropTypes.bool,
};

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
