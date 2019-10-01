import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import BayLeaf from '../../styles/assets/images/bay-leaf.png';


const Footer = () => (
  <Container>
    <Divider horizontal>
      <img src={BayLeaf} alt="leaf" />
    </Divider>
  </Container>
);

export default Footer;
