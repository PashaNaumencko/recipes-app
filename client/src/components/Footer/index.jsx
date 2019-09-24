import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import BayLeaf from '../../styles/assets/images/bay-leaf.png';


const Header = () => (
  <Container>
    <Divider horizontal>
      <img src={BayLeaf} />
    </Divider>
  </Container>
);

export default Header;
