import Head from 'next/head'

import AddTask from '@/components/Addtask'
import TodoList from '@/components/TodoList'

import classes from "@/components/Addtask.module.css"


export default function Home() {
  return (
    <>
       <main className='max-w-4xl mx-auto mt-4' style={{marginTop:"80px"}}>
        <div className='text-center my-5 flex flex-col gap-4'>
          <h1 className={`text-2xl font-bold ${classes.animate}`}> TODOLIST APP</h1>
          <AddTask/>
        </div>
       <TodoList/>
       </main>
    </>
  )
}
