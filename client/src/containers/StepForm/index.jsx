import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Form as UIForm } from 'semantic-ui-react';
import TextAreaField from '../../components/TextAreaField';
import InputError from '../../components/InputError';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Field, FieldArray } from 'formik';

import styles from './styles.module.scss';

const StepForm = ({ steps }) => {
  const onAddClick = (arrayHelper) => () => arrayHelper.push('');
  const onDeleteClick = (arrayHelper, id) => () => arrayHelper.remove(id);

  return (
    <>
      <h2>Recipe steps</h2>
      <FieldArray
        name="steps"
        render={(arrayHelper) =>
          <>
            <VerticalTimeline layout="1-column">
              {steps && steps.length
                ? steps.map((step, id) => (
                  <VerticalTimelineElement key={id} icon={<>{id + 1}</>}>
                    <>
                      <UIForm.Field required>
                        <label>Step {id + 1}</label>
                        <Field
                          name={`steps.${id}`}
                          value={step}
                          placeholder="Describe the next cooking step"
                          component={TextAreaField}
                        />
                        {steps.length > 1 && (
                          <div
                            className={styles.closeButton}
                            title="Delete step"
                            onClick={onDeleteClick(arrayHelper, id)}
                            role="button"
                          >
                            <Icon name="close" />
                          </div>
                        )}
                        <InputError name={`steps.${id}`} />
                      </UIForm.Field>
                    </>
                  </VerticalTimelineElement>
                )) : (
                  <VerticalTimelineElement key={0} icon={<>1</>}>
                    <UIForm.Field required>
                      <label>Step 1</label>
                      <Field
                        name={`steps.${0}`}
                        placeholder="Describe the next cooking step"
                        component={TextAreaField}
                      />
                      <InputError name={`steps.${0}`} />
                    </UIForm.Field>
                  </VerticalTimelineElement>
                )}
            </VerticalTimeline>
            <Button
              type="button"
              primary
              className={styles.addStepButton}
              onClick={onAddClick(arrayHelper)}
              icon={<Icon name="plus" />}
            />
          </>
        }
      />
    </>
  );
};

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

export default StepForm;
