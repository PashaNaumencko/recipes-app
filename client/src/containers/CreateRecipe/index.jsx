import React from 'react';
import { Container, Grid, Button, Image, Header, Label, Icon, Dropdown } from 'semantic-ui-react';
import ImageUploader from 'react-images-upload';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});


class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="firstName" />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
              <Field name="lastName" />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        <h2 className={styles.mainHeading}>Create Recipe</h2>
        <ImageUploader
          withIcon
          buttonText='Choose dish image'
          withPreview
          imgExtension={['.jpg', '.png']}
          maxFileSize={5242880}
        />
        <Grid>
          <Grid.Column computer={12} tablet={8} mobile={16}>

            <VerticalTimeline layout="1-column">
              <VerticalTimelineElement
                // iconStyle={{ 
                //   background: '#2f3032', 
                //   color: '#fff', 
                //   display: 'flex', 
                //   alignItems: 'center', 
                //   justifyContent: 'center',
                //   fontWeight: 'bold' 
                // }}
                icon={1}
              >
                <p>
                  Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                // iconStyle={{ 
                //   background: '#2f3032', 
                //   color: '#fff', 
                //   display: 'flex', 
                //   alignItems: 'center', 
                //   justifyContent: 'center',
                //   fontWeight: 'bold' 
                // }}
                icon={2}
              >
                <p>
                  Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
            {/* <div className={styles.recipeSteps}>
              <div className={styles.recipeStepBox}>
                <div className={styles.recipeStepNumber}>
                  <div>1</div>
                </div>
                <p>
                    While building the image processing app I needed
                    to upload the images to an express server. This proved 
                    to be a very awesome learning experience that I have felt 
                    like sharing in order to help others and probably myself again down the road.
                </p>
                <div className={styles.recipeStepDesc}></div>
              </div>
            </div> */}
          </Grid.Column>
          <Grid.Column computer={4} tablet={8} mobile={16}>

          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
    
export default CreateRecipe;
