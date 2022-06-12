import styles from "./style.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Todo, TodoItem } from "../../models/todoListModel";
import { memo } from "react";

interface Props {
  todoList: Todo;
  handleShowModal?: any;
  handleDeleteTodo?: any;
  handleShowEditTodo?: any;
}

function TodoCard(props: Props) {
  return (
    <Card
      key={props.todoList._id}
      border="secondary"
      bg="dark"
      text="white"
      className={styles.cardWidth}
    >
      <Card.Body>
        <Row>
          <Col sm={8}>
            <Card.Title className={styles.leftTextAlign}>
              {props.todoList.title}
            </Card.Title>
          </Col>
          <Col sm={2}>
          {
              (!props.handleDeleteTodo) ? <></> :  
                  <Button
                    variant="danger"
                    onClick={() => {
                      props.handleDeleteTodo(props.todoList._id);
                    }}
                  >
                    X
                  </Button>
          }
          </Col>
          <Col sm={2}>
          {
              (!props.handleShowEditTodo) ? <></> :  
                  <Button
                    variant="success"
                    onClick={() => {
                      props.handleShowEditTodo(props.todoList);
                    }}
                  >
                    E
                  </Button>
          }
          </Col>
        </Row>

        <ListGroup style={{ marginTop: "10px" }}>
          {props.todoList.todoItems.map((item: TodoItem, key: number) => {
            return <TodoItems key={key} todoItem={item} />;
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

function TodoItems(props: { todoItem: TodoItem }) {
  return (
    <ListGroupItem className={styles.bgDark}>
      {props.todoItem.text}
    </ListGroupItem>
  );
}

export default memo(TodoCard);
