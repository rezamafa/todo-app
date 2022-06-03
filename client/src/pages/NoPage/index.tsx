import styles from './noPageStyle.module.css';
import mc from 'classnames';
import Container from "react-bootstrap/Container";

function NoPage() {
  return (
    <Container className={mc(styles.divMain, styles.leftText)}>
      <h4>(404 Error)</h4>
      <h2>Sorry!</h2>
      <h1>We can't seem to find the resource you're looking for.</h1>
      <h4>Please use the menus to navigate to a specific section.</h4>
    </Container>
  )
};
  
export default NoPage;