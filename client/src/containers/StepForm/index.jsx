import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipeStep, editRecipeStep, deleteRecipeStep } from '../../routines';
import { Segment, Button, Icon, Form as UIForm } from 'semantic-ui-react';
import TextAreaField from '../../components/TextAreaField';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Formik, Form, Field, FieldArray } from 'formik';

import styles from './styles.module.scss';

class StepForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdding: false,
      isEditingStep: null
    };
  }

  onCreateSubmit = (values) => {
    const { recipeId } = this.props;
    this.props.addRecipeStep({ ...values, recipeId });
    this.setState({ isAdding: false });
  }

  onEditSubmit = (values) => {
    const { recipeId } = this.props;
    const { isEditingStep: { id } } = this.state;
    this.props.editRecipeStep({ ...values, recipeId, stepId: id });
    this.setState({ isEditingStep: null });
  }

  renderStepForm() {

  }

  onAddClick() {
    this.setState((prevState) => ({ isAdding: !prevState.isAdding }));
  }

  onEditClick(event, step) {
    this.setState({ isEditingStep: step, isAdding: false });
  }

  onCancelClick() {
    this.setState({ isEditingStep: null });
  }

  onDeleteClick(event, id) {
    this.props.deleteRecipeStep(id);
  }

  render() {
    const { isAdding, isEditingStep } = this.state;
    const { steps } = this.props;
    const description = isEditingStep ? isEditingStep.description : '';
    return (
      <Segment basic>
        <h2>Recipe steps</h2>
        {steps && steps.length ? (
          <Formik
            initialValues={{
              description
            }}
            onSubmit={isEditingStep ? this.onEditSubmit : this.onCreateSubmit}
          >
            {({ errors, touched, values }) => (
              <Form className="ui form">
                <VerticalTimeline layout="1-column">
                  <FieldArray
                    name="friends"
                    render={arrayHelper => (
                      <>
                        {steps.map((step, idx) => (
                          <VerticalTimelineElement key={idx} icon={idx + 1}>
                            <>
                              <UIForm.Field required>
                                <label>Step</label>
                                <Field name="description" placeholder="Describe the next cooking step" component={TextAreaField} />
                              </UIForm.Field>
                              <Button disabled={!values.description} primary={isEditingStep}>
                                <Icon name={isEditingStep ? 'edit' : 'save'} />
                                {isEditingStep ? 'Edit' : 'Save'}
                              </Button>
                              {isEditingStep ? (
                                <Button secondary onClick={this.onCancelClick}>
                                  Cancel
                                </Button>
                              ): null}
                            </>
                            {/* <>
                                <p key={idx}>{step.description}</p>
                                <div className={styles.closeButton} onClick={(event) => this.onDeleteClick(event, step.id)}>
                                  <Icon name="close" />
                                </div>
                                <div className={styles.editButton} onClick={(event) => this.onEditClick(event, step) }>
                                  <Icon name="edit" />
                                </div>
                              </> */}
                          </VerticalTimelineElement>
                        ))}
                      </>
                    )}
                  />
                  {isAdding ? (
                    <VerticalTimelineElement icon={steps.length + 1}>
                      {this.renderStepForm()}
                    </VerticalTimelineElement>
                  ): null}
                </VerticalTimeline>
                <Button primary icon className={styles.addStepButton} onClick={this.onAddClick}>
                  <Icon name={isAdding ? 'minus' :'plus'} />
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <VerticalTimeline layout="1-column">
            <VerticalTimelineElement icon={1}>
              {this.renderStepForm()}
            </VerticalTimelineElement>
          </VerticalTimeline>
        )}
      </Segment>
    );
  }

}

StepForm.propTypes = {
  recipeId: PropTypes.string,
  addRecipeStep: PropTypes.func,
  editRecipeStep: PropTypes.func,
  deleteRecipeStep: PropTypes.func,
  steps: PropTypes.array,
  fetchRecipeLoading: PropTypes.bool,
  addRecipeStepLoading: PropTypes.bool,
  editRecipeStepLoading: PropTypes.bool,
  deleteRecipeStepLoading: PropTypes.bool
};


const mapStateToProps = ({
  currentRecipeData: { id, loading: fetchRecipeLoading, steps },
  addRecipeStepData: { loading: addRecipeStepLoading },
  editRecipeStepData: { loading: editRecipeStepLoading },
  deleteRecipeStepData: { loading: deleteRecipeStepLoading },
}) => ({
  recipeId: id,
  steps,
  fetchRecipeLoading,
  addRecipeStepLoading,
  editRecipeStepLoading,
  deleteRecipeStepLoading
});

const mapDispatchToProps = {
  addRecipeStep,
  editRecipeStep,
  deleteRecipeStep
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepForm);
