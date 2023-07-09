function TodoList(props) {
  console.log(props.todos)
  return (
    <div className="flex justify-center mx-auto">
     <ul>
    {props.todos && props.todos.map((todo)=>(
          <li key={todo._id}>{todo.addTodo}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
