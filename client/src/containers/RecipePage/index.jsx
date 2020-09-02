import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Button, Header, Divider, Label, Icon, Segment, Grid } from 'semantic-ui-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

class RecipePage extends React.Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
  }

  render() {
    return (
      <Grid>
        <Grid.Column computer={10} tablet={8} mobile={16}>
          <VerticalTimeline layout="1-column">
            {/* <VerticalTimelineElement key={idx} icon={idx + 1}>

            </VerticalTimelineElement> */}
          </VerticalTimeline>
        </Grid.Column>
        <Grid.Column computer={6} tablet={8} mobile={16} stretched>
          
        </Grid.Column>
      </Grid>
    );
  }
}

export default RecipePage;
