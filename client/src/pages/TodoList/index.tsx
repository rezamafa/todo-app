import DataServices from "../../services/dataServices";
import { useEffect, useState, memo } from "react";
import { ApiRespond } from "../../models/apiRequestModels";
import styles from "./style.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import TodoCard from "../../components/Card";
import TodoModal from "../../components/Modal";
import { Todo } from "../../models/todoListModel";

function TodoList() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todoListsAll, setTodoListsAll] = useState<Todo[]>([]);
  const [editTodoList, setEditTodoList] = useState<Todo>();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleAddTodo = async (todo: Todo) : Promise<boolean> => {
    return await DataServices.createTodo(todo).then((res: ApiRespond) => {
      if (!res || !res.Success || !res.Data || !res.Data.acknowledged || !res.Data.insertedId ) return false;
      todo._id = res.Data.insertedId;
      setTodoListsAll((previousState) => {  return [...previousState, todo] });
      return true;
    })
  }

  const handleEditTodo = async (todo: Todo) : Promise<boolean> => {
    return await DataServices.editTodo(todo).then((res: ApiRespond) => {
      if (!res || !res.Success || !res.Data || !res.Data.acknowledged || res.Data.modifiedCount < 1) return false;
      let todos: Todo[] = [...todoListsAll];
      let index: number = todos.findIndex(item => item._id == todo._id);
      if(index >= 0) todos[index] = todo ;
      setTodoListsAll(todos)
      return true;
    });
  }

  const handleDeleteTodo = (todoID: number) => {
    DataServices.deleteTodo(todoID).then((res: ApiRespond) => {
      if (!res || !res.Success || !res.Data || !res.Data.acknowledged || res.Data.deletedCount < 1 ) return false;
      setTodoListsAll(todoListsAll.filter((todo) => {
        return todo._id != todoID
      }))
    })
  }

  const handleShowEditTodo = (todo: Todo) => {
    setEditTodoList(todo);
    handleShowModal();
  }

  useEffect(() => {
    DataServices.getAllTodos().then((res: ApiRespond) => {
      if (!res || !res.Success || !res.Data) return;
      setTodoListsAll(res.Data as Todo[]);
    });
  }, []);

  return (
    <Container>
      <h1>Todo Lists</h1>

      <Button variant="info" onClick={handleShowModal}>
        ADD NEW
      </Button>

      {todoListsAll.map((item: Todo, key: number) => {
        return (
          <TodoCard
            key={key}
            todoList={item}
            handleShowModal={handleShowModal}
            handleDeleteTodo={handleDeleteTodo}
            handleShowEditTodo={handleShowEditTodo}
          />
        );
      })}

      <TodoModal
        editTodoList={editTodoList}
        setEditTodoList={setEditTodoList}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleAddTodo={handleAddTodo}
        handleEditTodo={handleEditTodo}
      />
    </Container>
  );
}

export default memo(TodoList);
