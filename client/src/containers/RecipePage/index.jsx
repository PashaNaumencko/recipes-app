import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Segment, Button, Image, Icon } from 'semantic-ui-react';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Column computer={12} tablet={8} mobile={16}>
            <Segment></Segment>
          </Grid.Column>

          <Grid.Column computer={4} tablet={8} mobile={16}>
            <Segment></Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default RecipePage;
