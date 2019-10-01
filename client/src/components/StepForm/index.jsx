import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipeStep, editRecipeStep, deleteRecipeStep } from '../../routines/routines';
import { Segment, Button, Icon, Form as UIForm } from 'semantic-ui-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Formik, Form, Field } from 'formik';

import styles from './styles.module.scss';

class StepForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdding: false,
      isEditingStep: null
    };

    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  renderTextAreaField = ({ field, form: { errors } }) => {
    if (field.value === null) {
      field.value = '';
    }
    return (
      <UIForm.TextArea
        rows="3"
        error={errors[field.name] ? { content: errors[field.name], pointing: 'top' } : null}
        {...field}
      />
    );
  }

  onCreateSubmit(values) {
    const { recipeId } = this.props;
    this.props.addRecipeStep({ ...values, recipeId });
    this.setState({ isAdding: false });
  }

  onEditSubmit(values) {
    const { recipeId } = this.props;
    const { isEditingStep: { id } } = this.state;
    this.props.editRecipeStep({ ...values, recipeId, stepId: id });
    this.setState({ isEditingStep: null });
  }

  renderStepForm() {
    const { isEditingStep } = this.state;
    const description = isEditingStep ? isEditingStep.description : '';
    return (
      <Formik
        initialValues={{
          description
        }}
        onSubmit={isEditingStep ? this.onEditSubmit : this.onCreateSubmit}
      >
        {({ errors, touched, values }) => (
          <Form className="ui form">
            <UIForm.Field required>
              <label>Step</label>
              <Field name="description" placeholder="Describe the next cooking step" render={this.renderTextAreaField} />
            </UIForm.Field>
            <Button type="submit" disabled={!values.description} primary={isEditingStep}>
              <Icon name={isEditingStep ? 'edit' : 'save'} />
              {isEditingStep ? 'Edit' : 'Save'}
            </Button>
            {isEditingStep ? (
              <Button secondary onClick={this.onCancelClick}>
                Cancel
              </Button>
            ): null}
          </Form>
        )}
      </Formik>
    );
  }

  onAddClick() {
    this.setState({ isAdding: true });
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
    const {
      steps,
      fetchRecipeLoading,
      addRecipeStepLoading,
      editRecipeStepLoading,
      deleteRecipeStepLoading,
      versionLoading
    } = this.props;
    return fetchRecipeLoading || versionLoading
      ? null : addRecipeStepLoading || editRecipeStepLoading || deleteRecipeStepLoading 
        ? <Segment loading></Segment> 
        : (
          <Segment>
            <h2>Recipe steps</h2>
            {steps && steps.length ? (
              <>
                <VerticalTimeline layout="1-column">
                  {steps.map((step, idx) => (
                    <VerticalTimelineElement key={idx} icon={idx + 1}>

                      {isEditingStep && isEditingStep.id === step.id ? this.renderStepForm() : (
                        <>
                          <p key={idx}>{step.description}</p>
                          <div className={styles.closeButton} onClick={(event) => this.onDeleteClick(event, step.id)}>
                            <Icon name="close" />
                          </div>
                          <div className={styles.editButton} onClick={(event) => this.onEditClick(event, step) }>
                            <Icon name="edit" />
                          </div>
                        </>
                      )}
                    </VerticalTimelineElement>
                  ))}
                  {isAdding ? (
                    <VerticalTimelineElement icon={steps.length + 1}>
                      {this.renderStepForm()}
                    </VerticalTimelineElement>
                  ): null}
                </VerticalTimeline>
                {isAdding ? null : (
                  <Button primary icon className={styles.addStepButton} onClick={this.onAddClick}>
                    <Icon name='plus' />
                  </Button>
                )}
              </>
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
