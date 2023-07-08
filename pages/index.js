import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

import AddTask from '@/components/Addtask' // Adjust the import path if needed
import TodoList from '@/components/TodoList'

import classes from '@/components/Addtask.module.css'

export default function Home() {
  const router = useRouter()
  const [todos, setTodos] = useState([])

  async function addTodoHandler(enteredTodo) {
    const response = await fetch('/api/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enteredTodo)
    })

    if (response.ok) {
      const data = await response.json()
      const newTodo = { id: data.id, text: enteredTodo }
      setTodos(prevTodos => [...prevTodos, newTodo])
    }
  }

  return (
    <>
      <Head>
        <title>Todo List App</title>
      </Head>
      <main className="max-w-4xl mx-auto mt-4" style={{ marginTop: '80px' }}>
        <div className="text-center my-5 flex flex-col">
          <h1 className={`text-2xl font-bold ${classes.animate}`} style={{ marginBottom: '20px' }}>
            TODO LIST APP
          </h1>
          <AddTask onAddTodo={addTodoHandler} />
        </div>
        <TodoList todos={todos} />
      </main>
    </>
  )
}
