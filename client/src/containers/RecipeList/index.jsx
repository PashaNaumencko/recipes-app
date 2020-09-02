import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container, Button, Header, Divider, Label, Icon, Segment } from 'semantic-ui-react';
import { fetchRecipes } from '../../routines';

import styles from './styles.module.scss';

class RecipeList extends React.Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  onCreateClick = () => this.props.history.push('/create');

  onEditClick = (event, id) => this.props.history.push(`/recipes/${id}`);

  render() {
    const { recipes, allRecipesLoading } = this.props;
    return (
      <Container>
        {allRecipesLoading
          ? <Segment loading></Segment>
          : recipes.length ? (
            <>
              <h2 className={styles.mainHeading}>Recipes</h2>
              <div className={styles.recipeListHeader}>
                <Button onClick={this.onCreateClick} secondary>
                  <Icon name="plus" />
                  Create new recipe
                </Button>
              </div>
              <div className={styles.recipeListGrid}>
                {recipes.map((recipe, idx) => (
                  <Segment key={idx} className={styles.recipeListBox}>
                    <div className={styles.recipeImgWrapper}>
                      <img src={recipe.imgUrl} alt='' />
                    </div>
                    {/* <Image  fluid spaced wrapped /> */}
                    <div className={styles.recipeListInfo}>
                      <div className={styles.recipeListContent}>
                        <h3>{recipe.title}</h3>
                        <div className={styles.recipeLabels}>
                          <Label className={styles.recipeLabel}>
                            <Icon name='clock' />
                            {recipe.duration || '0 min'}
                          </Label>
                          <Label className={styles.recipeLabel}>
                            <Icon name='utensils' />
                            {recipe.calorificValue || 0} ccal
                          </Label>
                        </div>
                        <p>
                          {recipe.ingredients.length ? recipe.ingredients.map((name) => `${name}, `)
                            : 'No ingredient information'}
                        </p>
                      </div>
                      <div className={styles.recipeListFooter}>
                        <span>{moment(recipe.createdAt).fromNow()}</span>
                        <Button secondary onClick={(event) => this.onEditClick(event, recipe.id)}>
                            Edit
                        </Button>
                      </div>
                    </div>
                  </Segment>
                ))}
              </div>
            </>
          ) : (
            <Segment placeholder>
              <Button onClick={this.onCreateClick} secondary>
                <Icon name="plus" />
                Create new recipe
              </Button>
              <Header icon>
                <Icon name="utensils" />
                No recipes are listed on this customer.
                <Divider hidden />
                Create a new recipe and fill in all the necessary information
              </Header>
            </Segment>
          )}
      </Container>
    );
  }
}

RecipeList.propTypes = {
  fetchAllRecipes: PropTypes.func,
  recipes: PropTypes.array,
  allRecipesLoading: PropTypes.bool
};

const mapStateToProps = ({
  fetchRecipesData: { loading: allRecipesLoading, recipes }
}) => ({
  recipes,
  allRecipesLoading
});

const mapDispatchToProps = {
  fetchRecipes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);
