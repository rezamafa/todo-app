import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useRef, memo, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./style.module.css";
import { Todo, TodoItem } from "../../models/todoListModel";
import TodoCard from "../../components/Card";

interface Props {
  editTodoList?: Todo;
  setEditTodoList: any;
  handleEditTodo: (todo: Todo) => Promise<boolean>;
  showModal: boolean;
  handleCloseModal: () => void;
  handleAddTodo: (newTodo: Todo) => Promise<boolean>;
}

function TodoModal(props: Props) {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [todoItemsValue, setTodoItemsValue] = useState<string>("");
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.editTodoList && props.editTodoList.title)
      setTodoTitle(props.editTodoList.title);
    if (props.editTodoList && props.editTodoList.todoItems)
      setTodoItems(props.editTodoList.todoItems);
  }, [props.showModal]);

  const addNewTodoItem = () => {
    inputElement.current?.focus();
    if (todoItemsValue != "") {
      setTodoItems((previousState) => {
        return [...previousState, { text: todoItemsValue, checked: false }];
      });
      setTodoItemsValue("");
    }
  };

  const saveEdit = () => {
    props.handleEditTodo({
      _id: props.editTodoList?._id,
      title: todoTitle,
      todoItems: todoItems,
      user: props.editTodoList?.user,
    }).then((res: boolean) => {
      if (!res) return;
      setTodoTitle("");
      setTodoItems([]);
      setTodoItemsValue("");
      props.setEditTodoList(null);
      props.handleCloseModal();
    });
  }

  const saveAdd = () => {
    props.handleAddTodo({
      title: todoTitle,
      todoItems: todoItems
    }).then((res: boolean) => {
      if (!res) return;
      setTodoTitle("");
      setTodoItems([]);
      setTodoItemsValue("");
      props.setEditTodoList(null);
      props.handleCloseModal();
    });
  };

  const cancelChanges = () => {
    setTodoTitle("");
    setTodoItems([]);
    setTodoItemsValue("");
    props.setEditTodoList(null);
    props.handleCloseModal();
  };

  return (
    <Modal show={props.showModal} onHide={cancelChanges}>
      <Modal.Header className={styles.bgDark} closeButton>
        <Modal.Title>
          {!props.editTodoList ? "ADD" : "EDIT"} TODO LIST{" "}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.bgDark}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>List Title :</Form.Label>
            <Form.Control
              autoFocus
              required
              as="input"
              onChange={(e: any) => setTodoTitle(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.keyCode === 13) inputElement.current?.focus();
              }}
              value={todoTitle}
            />
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label>New Todo Item :</Form.Label>
            <Col sm="10">
              <Form.Control
                as="input"
                ref={inputElement}
                value={todoItemsValue}
                onChange={(e: any) => setTodoItemsValue(e.target.value)}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 13) addNewTodoItem();
                }}
              />
            </Col>
            <Col sm="2">
              <Button variant="success" onClick={addNewTodoItem}>
                Add
              </Button>
            </Col>
          </Form.Group>

          {!todoTitle && todoItems.length < 1 ? (
            <></>
          ) : (
            <TodoCard todoList={{ title: todoTitle, todoItems: todoItems }} />
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer className={styles.bgDark}>
        <Button variant="secondary" onClick={cancelChanges}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => (!props.editTodoList || !props.editTodoList._id) ? saveAdd() : saveEdit() }>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(TodoModal);
