import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import AdditionalInfo from '../AdditionalInfo/index';
import 'react-vertical-timeline-component/style.min.css';
import { List, Grid, Segment, Image, Icon, Pagination } from 'semantic-ui-react';

import styles from './styles.module.scss';

const RecipeVersions = ({ versions }) => {
  const [activePage, setActivePage] = useState(1);
  const handlePaginationChange = useCallback(
    (e, { activePage: newActivePage }) => versions[newActivePage - 1] ? setActivePage(newActivePage) : activePage,
    []
  );
  const { imgUrl, steps, title, duration, ingredients, calorificValue } = versions[activePage - 1];
  return (
    <>
      <h2>Recipe version</h2>
      <div className={styles.paginatorBox}>
        <Pagination
          activePage={activePage}
          onPageChange={handlePaginationChange}
          totalPages={versions.length}
        />
      </div>
      <Grid>
        <Grid.Column computer={10} tablet={8} mobile={16}>
          <h2>Recipe steps</h2>
          <List divided relaxed>
            {steps.map((step, idx) => (
              <List.Item key={idx}>
                <List.Icon name='plus' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header>{step.description}</List.Header>
                </List.Content>
              </List.Item>
            ))}  
          </List>
        </Grid.Column>
        <Grid.Column computer={6} tablet={8} mobile={16}>
          <h2>{title}</h2>
          <Image src={imgUrl} centered className={styles.versionImg} />
          <AdditionalInfo calorificValue={calorificValue} ingredients={ingredients} duration={duration} />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default RecipeVersions;
