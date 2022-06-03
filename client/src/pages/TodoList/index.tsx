import DataServices from "../../services/dataServices";
import { useState } from "react";
import { ApiRespond } from "../../models/apiRequestModels";
import { useNavigate } from "react-router-dom";
import styles from "./TodolistStyle.module.css";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


let todoLists: any = [
  {
    _id: 1,
    title: "Todo List 1",
    todoItems: [
      {
        _id: 2,
        text: "todo item 1",
        checked: false,
      },
      {
        _id: 3,
        text: "todo item 2",
        checked: false,
      },
      {
        _id: 4,
        text: "todo item 3",
        checked: false,
      },
      {
        _id: 5,
        text: "todo item 4",
        checked: false,
      },
    ],
  },
  {
    _id: 6,
    title: "Todo List 2",
    todoItems: [
      {
        _id: 7,
        text: "todo item 1",
        checked: false,
      },
      {
        _id: 8,
        text: "todo item 2",
        checked: false,
      },
      {
        _id: 9,
        text: "todo item 3",
        checked: false,
      },
      {
        _id: 10,
        text: "todo item 4",
        checked: false,
      },
    ],
  },
  {
    _id: 11,
    title: "Todo List 3",
    todoItems: [
      {
        _id: 12,
        text: "todo item 1",
        checked: false,
      },
      {
        _id: 13,
        text: "todo item 2",
        checked: false,
      },
      {
        _id: 14,
        text: "todo item 3",
        checked: false,
      },
      {
        _id: 15,
        text: "todo item 4",
        checked: false,
      },
    ],
  },
];


function TodoListCard(props: {
  _id: number;
  title: string;
  todoItems: [{ _id: number; text: string; checked: boolean }];
  handleShowModal: any;
}) {
  return (
    <Card
      key={props._id}
      border="secondary"
      bg="dark"
      text="white"
      className={styles.cardWidth}
    >
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Button variant="success" onClick={props.handleShowModal}>
          Edit List
        </Button>
        <ListGroup style={{ marginTop: "10px" }}>
          {props.todoItems.map((item) => {
            return <TodoItems _id={item._id} text={item.text} checked={item.checked} />;
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

function TodoItems(props: { _id: number; text: string; checked:boolean; }) {
  return <ListGroupItem key={props._id} className={styles.bgDark}>{props.text}</ListGroupItem>;
}

function TodoModals(props: { 
  showModal: boolean;
  handleShowModal: any;
  handleCloseModal: any;
 }) {
  return (
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleCloseModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function TodoList() {
  const [showList, setShowList] = useState(false);
  const [todoListsAll, setTodoListsAll] = useState(todoLists);
  const handleClose = () => setShowList(false);
  const handleShow = () => setShowList(true);
  return (
    <Container>
      <h1>Todo Lists</h1>
      {todoListsAll.map((
        list: {
          _id: number;
          title: string;
          todoItems: [{ _id:number; text: string; checked: boolean }];
        }) => {
          return (
            <TodoListCard
              _id={list._id}
              title={list.title}
              todoItems={list.todoItems}
              handleShowModal={handleShow}
            />
          );
        }
      )}
      <TodoModals showModal={showList} handleShowModal={handleShow} handleCloseModal={handleClose}/>
    </Container>
  );
}

export default TodoList;
