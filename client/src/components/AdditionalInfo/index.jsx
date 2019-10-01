import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Statistic } from 'semantic-ui-react';

import styles from './styles.module.scss';

const RecipeVersion = ({ ingredients, duration, calorificValue }) => {
  return (
    <>
      <div className={styles.addInfoBox}>
        <Statistic>
          <Statistic.Value>
            <Icon name='clock outline' color="grey" />
          </Statistic.Value>
          <Statistic.Label>{duration}</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Icon name='utensils' color="grey" />
          </Statistic.Value>
          <Statistic.Label>{calorificValue} ccal</Statistic.Label>
        </Statistic>
      </div>
      <h2>Ingrediens</h2>
      <p className={styles.ingrediens}>{ingredients}</p>
    </>
  );
};

RecipeVersion.propTypes = {
  calorificValue: PropTypes.number,
  duration: PropTypes.string,
  ingredients: PropTypes.string
};

export default RecipeVersion;
