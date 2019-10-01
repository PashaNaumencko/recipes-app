import React from 'react';
import { Container, Image } from 'semantic-ui-react';

import styles from './styles.module.scss';
import HeaderLogoDiv from '../../styles/assets/images/header-logo-divider.png';

const Header = () => (
  <Container>
    <div className={styles.headerLogo}>
      <div className={styles.headerLogoInfo}>
        <h2>Javascript CookBook</h2>
        <Image src={HeaderLogoDiv} centered />
      </div>
    </div>
  </Container>
);

export default Header;
