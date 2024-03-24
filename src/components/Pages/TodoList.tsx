import { TodosOptions } from "../../types/types";
import { TaskItem } from "../TaskItem";
import { TodoForm } from "../TodoForm";
import { FilterControls, FilterTypes } from "../FilterControls";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FC, memo, useEffect, useState } from "react";
import { clearTasks, setTodoFromLS } from "../../store/todo-slice";
import { FilterMemoryControls } from "../FilterMemory";
import Swal from "sweetalert2";
import { Button, Empty } from "antd";
import { LS } from "../../hooks/hooks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Helmet } from "react-helmet";

const TodoList: FC = memo(() => {
  const { get, exist } = LS();
  const defaultFiler = exist("filter") ? get("filter") : "All";

  const [listRef] = useAutoAnimate<HTMLUListElement>();
  const [filter, setFilter] = useState<FilterTypes>(defaultFiler);

  const dispatch = useAppDispatch();
  const { todos, matchedTodos } = useAppSelector((state) => state.todos);

  const FilteredTodosSettedFromLS = () => {
    switch (filter) {
      case "All":
        return matchedTodos.filter((t) => t);
      case "Completed":
        return matchedTodos.filter((t) => t.completed);
      case "Active":
        return matchedTodos.filter((t) => !t.completed);
      default:
        return matchedTodos;
    }
  };

  const checkTodosInLS = () => {
    if (todos.length <= 0) {
      return "Задачи отсутствуют";
    } else {
      return "Удалить все заметки";
    }
  };

  const removeAllTasks = () => {
    Swal.fire({
      title: "Уверены очистить всё?",
      showCancelButton: true,
      confirmButtonText: "Да",
      cancelButtonText: "Нет",
      cancelButtonColor: "#1677FF",
      confirmButtonColor: "#1677FF",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearTasks());
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    dispatch(setTodoFromLS());
  }, []);

  const todoListElems = FilteredTodosSettedFromLS()?.map(
    ({ completed, id, title, time, timeStamp }: TodosOptions) => (
      <TaskItem
        key={id}
        data={{
          time,
          id,
          title,
          completed,
          timeStamp,
        }}
      />
    )
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Заметки</title>
        <link rel="canonical" href="/" />
      </Helmet>
      <TodoForm />

      <FilterMemoryControls filter={filter} />

      <ul id={"task-list"} ref={listRef}>
        {todoListElems}

        {!todoListElems.length ? (
          <Empty
            description={
              <span id={"no-tasks"}>
                <b>Данных нет...</b>
              </span>
            }
            style={{ textAlign: "left" }}
          />
        ) : null}
      </ul>

      <FilterControls filter={filter} filterTask={setFilter} />

      <div style={{ marginTop: 50 }}>
        <Button
          onClick={removeAllTasks}
          disabled={FilteredTodosSettedFromLS().length <= 0}
        >
          {checkTodosInLS()}
        </Button>
      </div>
    </>
  );
});

export default TodoList;
