import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container, Button, Image, Header, Divider, Label, Icon, Segment } from 'semantic-ui-react';
import { fetchAllRecipes } from '../../routines/routines';

import styles from './styles.module.scss';

class RecipeList extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateClick = this.onCreateClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllRecipes();
  }

  onCreateClick() {
    this.props.history.push('/recipes/create');
  }

  onEditClick(event, id) {
    this.props.history.push(`/recipes/${id}`);
  }

  render() {
    const { recipes, allRecipesLoading } = this.props;
    return (
      <Container>
        <h2 className={styles.mainHeading}>Recipes</h2>
        <div className={styles.recipeListHeader}>
          <Button onClick={this.onCreateClick} secondary>
            <Icon name="plus" />
            Create new recipe
          </Button>
        </div>
        {allRecipesLoading 
          ? <Segment loading></Segment> 
          : recipes.length ? (
            <div className={styles.recipeListGrid}>
              {recipes
                .filter(recipe => recipe.duration && recipe.ingredients && recipe.calorificValue)
                .map((recipe, idx) => (
                  <Segment key={idx} className={styles.recipeListBox}>
                    <Image src={recipe.imgUrl} fluid spaced className={styles.recipeImg} />
                    <div className={styles.recipeListInfo}>
                      <div className={styles.recipeListContent}>
                        <h3>{recipe.title}</h3>
                        <div className={styles.recipeLabels}>
                          <Label className={styles.recipeLabel}>
                            <Icon name='clock' />
                            {recipe.duration}
                          </Label>
                          <Label className={styles.recipeLabel}>
                            <Icon name='utensils' />
                            {recipe.calorificValue}
                          </Label>
                        </div>
                        <p>
                          {recipe.ingredients}
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
          ) : (
            <Segment placeholder>
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
  allRecipesData: { loading: allRecipesLoading, recipes }
}) => ({
  recipes,
  allRecipesLoading
});

const mapDispatchToProps = {
  fetchAllRecipes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);
