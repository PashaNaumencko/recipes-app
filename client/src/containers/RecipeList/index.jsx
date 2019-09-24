import React from 'react';
import { Container, Button, Image, Header, Rating, Label, Icon, Dropdown } from 'semantic-ui-react';

import styles from './styles.module.scss';
import firstPhoto from '../../styles/assets/images/photo1.png';
import secondPhoto from '../../styles/assets/images/photo2.png';
import thirdPhoto from '../../styles/assets/images/photo3.png';
import { ReactComponent as SportSVG } from '../../styles/assets/icons/sport.svg';
import { ReactComponent as PotSVG } from '../../styles/assets/icons/pot.svg';

const complexityOptions = [
  { key: 1, text: 'Easy', value: 'Easy' },
  { key: 2, text: 'Medium', value: 'Medium' },
  { key: 3, text: 'Hard', value: 'Hard' },
];

class RecipeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <div className={styles.recipeListHeader}>
          <Dropdown text="Select complexity" options={complexityOptions} selection className={styles.complexitySelect} />
          <Button className={styles.createRecipeButton}>Create new recipe</Button>
        </div>
        <div className={styles.recipeListGrid}>
          <div className={styles.recipeListBox}>
            <Image src={firstPhoto} />
            <div className={styles.recipeListInfo}>
              <div className={styles.recipeListContent}>
                <h3>Утиные ножки с овощами и грудинкой</h3>
                <div className={styles.recipeLabels}>
                  <Label className={styles.recipeLabel}>
                    <Icon name='clock' />
                    123 min
                  </Label>
                  <Label className={styles.recipeLabel}>
                    <PotSVG />
                     Hard
                  </Label>
                  <Label className={styles.recipeLabel}>
                    <SportSVG className={styles.importedIcons} />
                    123 ccal
                  </Label>
                </div>
                <p>
                  говядина, масло топлёное, лук репчатый, 
                  морковь, редька, перец сладкий, помидоры, 
                  томат-пюре, картофель, чеснок, бульон мясной,
                  соль, перец чёрный, зелень петрушки
                </p>
              
              </div>
              <div className={styles.recipeListFooter}>
                <span>10.10.2018</span>
                <Rating icon='star' defaultRating={3} maxRating={5} />
              </div>
            </div>
          </div>

          <div className={styles.recipeListBox}>
            {/* <img src={firstPhoto} alt=""/> */}
            <Image src={secondPhoto} />
            <div className={styles.recipeListInfo}>
              <div className={styles.recipeListContent}>
                <h3>Утиные ножки с овощами и грудинкой</h3>
                <div className={styles.recipeLabels}>
                  <Label className={styles.recipeLabel}>
                    <Icon name='clock' /> 123 min
                  </Label>
                  <Label className={styles.recipeLabel}>
                    <PotSVG /> Hard
                  </Label>
                  <Label className={styles.recipeLabel}>
                    <SportSVG /> 123 ccal
                  </Label>
                </div>
                <p>
                  говядина, масло топлёное, лук репчатый, 
                  морковь, редька, перец сладкий, помидоры, 
                  томат-пюре, картофель, чеснок, бульон мясной,
                  соль, перец чёрный, зелень петрушки
                </p>
              
              </div>
              <div className={styles.recipeListFooter}>
                <span>10.10.2018</span>
                <Rating icon='star' defaultRating={3} maxRating={5} />
              </div>
            </div>
          </div>

          <div className={styles.recipeListBox}>
            <Image src={thirdPhoto} />
            <div className={styles.recipeListInfo}>
              <div className={styles.recipeListContent}>
                <h3>Утиные ножки с овощами и грудинкой</h3>
                <div className={styles.recipeLabels}>
                  <Label className={styles.recipeLabel}>
                    <Icon name='clock' /> 123 min
                  </Label>
                  <Label className={styles.recipeLabel}>
                    <PotSVG /> Hard
                  </Label>
                  <Label className={styles.recipeLabel}>
                    <SportSVG /> 123 ccal
                  </Label>
                </div>
                <p>
                  говядина, масло топлёное, лук репчатый, 
                  морковь, редька, перец сладкий, помидоры, 
                  томат-пюре, картофель, чеснок, бульон мясной,
                  соль, перец чёрный, зелень петрушки
                </p>
              
              </div>
              <div className={styles.recipeListFooter}>
                <span>10.10.2018</span>
                <Rating icon='star' defaultRating={3} maxRating={5} />
              </div>
            </div>
          </div>

        </div>
      </Container>
    );
  }
}

export default RecipeList;
