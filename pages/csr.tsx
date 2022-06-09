import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'


type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}
const Csr: NextPage<StaticProps> = () => {
  const [task, setTasks] = useState<Task[]>([])
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })
    setTasks(tasks as Task[])
    }
    const getNotices = async () => {
      const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })
    setNotices(notices as Notice[])
    }
    getTasks()
    getNotices()
  }, [])
  return (
    <Layout title="Csr">
      <p className="mb-3 text-blue-500">SSG + CSF</p>
      <ul className="mb-3">
        {task.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          )
        })}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Csr