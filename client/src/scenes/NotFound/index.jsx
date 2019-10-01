import React from 'react';
import { Container, Segment, Header, Icon } from 'semantic-ui-react';

const NotFound = () => (
  <Container>
    <Segment placeholder>
      <Header icon>
        <Icon name="at" />
        404 Not Found
      </Header>
    </Segment>
  </Container>
);

export default NotFound;
