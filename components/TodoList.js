function TodoList(props) {
  console.log(props.todos)
  return (
    <div className="flex justify-center mx-auto">
      <ul>
        {props.todos.map((todo)=>{
          <li>{todo.text}</li>
        })}
      </ul>
    </div>
  )
}

export default TodoList
