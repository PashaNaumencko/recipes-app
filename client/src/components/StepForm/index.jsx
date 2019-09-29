import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Segment, Button, Dropdown, Image, Icon, Form as UIForm } from 'semantic-ui-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const StepSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required')
});

class StepForm extends React.Component {
  constructor(props) {
    super(props);

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


  render() {
    return (
      <Segment>
        <h2 className={styles.mainHeading}>Recipe steps</h2>
        <VerticalTimeline layout="1-column">
          <VerticalTimelineElement
            icon={1}
          >
            <Formik
              initialValues={{
                title: ''
              }}
              validationSchema={StepSchema}
              onSubmit={values => {
              // same shape as initial values
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="ui form">
                  <UIForm.Field required>
                    <label>Step</label>
                    <Field name="description" placeholder="Describe the next cooking step" render={this.renderTextAreaField} />
                  </UIForm.Field>
                  <Button type="submit" disabled={errors.description && !touched.description} className={styles.submitButton}>
                  Save
                  </Button>
                </Form>
              )}
            </Formik>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </Segment>
    );
  }

}


export default StepForm;
