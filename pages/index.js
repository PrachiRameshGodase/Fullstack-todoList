import Head from 'next/head'
import AddTask from '@/components/Addtask'


export default function Home() {
  return (
    <>
      <Head>
        <title>Todo List App</title>
      </Head>
      <AddTask/>
   
    </>
  )
}
