import React from 'react';
import { Container, Button, Grid, Image, Rating, Label, Icon, Divider } from 'semantic-ui-react';

import styles from './styles.module.scss';
import BayLeaf from '../../styles/assets/images/bay-leaf.png';
import HeaderLogo from '../../styles/assets/images/header-logo.jpg';
import HeaderLogoDiv from '../../styles/assets/images/header-logo-divider.png';

const Header = () => (
  <Container>
    <div className={styles.headerLogo}>
      <div className={styles.headerLogoInfo}>
        <h2>Javascript CookBook</h2>
        <Image src={HeaderLogoDiv} centered />
      </div>
    </div>
    <h2 className={styles.mainHeading}>Recipes</h2>
  </Container>
);

export default Header;
