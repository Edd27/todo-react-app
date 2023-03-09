import { useState } from 'react'
import Task from './components/Task'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const App = () => {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [tasks, setTasks] = useState([])
  const [parent] = useAutoAnimate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input) return alert('Please enter a todo')
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: input, completed: false }
    ])
    setInput('')
  }

  return (
    <main className="w-full p-2 md:p-10 lg:p-20 text-gray-100 flex flex-col justify-center items-center gap-10">
      <h1 className="text-3xl">Todo App</h1>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a todo"
            className="rounded-md px-5 py-4 focus:outline-none text-gray-700 bg-gray-700 focus:bg-gray-200 duration-300"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            type="submit"
            className="bg-sky-500 px-5 py-4 rounded-md hover:bg-sky-600 duration-300"
          >
            Add
          </button>
        </form>
        <div className="flex flex-col gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full px-5 py-4 rounded-md focus:outline-none text-gray-700 bg-gray-700 focus:bg-gray-200 duration-300"
          />
          <div>
            <span className="text-gray-400">Filter by:</span>
            <ul className="flex items-center justify-between border rounded-md overflow-hidden">
              <li
                className={`cursor-pointer w-full border-r flex items-center justify-center ${
                  filter === 'all' ? 'bg-gray-700' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter"
                  id="radio-all"
                  value={filter}
                  onChange={() => setFilter('all')}
                  className="appearance-none"
                />
                <label
                  htmlFor="radio-all"
                  className="cursor-pointer p-2 w-full text-center hover:bg-gray-800 duration-300"
                >
                  All
                </label>
              </li>
              <li
                className={`cursor-pointer w-full border-r flex items-center justify-center ${
                  filter === 'completed' ? 'bg-gray-700' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter"
                  id="radio-completed"
                  value={filter}
                  onChange={() => setFilter('completed')}
                  className="appearance-none"
                />
                <label
                  htmlFor="radio-completed"
                  className="cursor-pointer p-2 w-full text-center hover:bg-gray-800 duration-300"
                >
                  Completed
                </label>
              </li>
              <li
                className={`cursor-pointer w-full border-r flex items-center justify-center ${
                  filter === 'incompleted' ? 'bg-gray-700' : ''
                }`}
              >
                <input
                  type="radio"
                  name="filter"
                  id="radio-incompleted"
                  value={filter}
                  onChange={() => setFilter('incompleted')}
                  className="appearance-none"
                />
                <label
                  htmlFor="radio-incompleted"
                  className="cursor-pointer p-2 w-full text-center hover:bg-gray-800 duration-300"
                >
                  Incompleted
                </label>
              </li>
            </ul>
          </div>
        </div>
        {tasks.length > 0 && (
          <ul className="flex flex-col gap-2" ref={parent}>
            {tasks
              .sort((task) => (task.completed ? 1 : -1))
              .filter((task) => {
                if (!search) return true
                return task.title.toLowerCase().includes(search.toLowerCase())
              })
              .filter((task) => {
                if (filter === 'completed') return task.completed
                if (filter === 'incompleted') return !task.completed
                return true
              })
              .map((task) => (
                <Task key={task.id} task={task} setTasks={setTasks} />
              ))}
          </ul>
        )}
        {tasks.length === 0 && (
          <p className="text-gray-400 border text-center rounded-md py-4">
            No tasks
          </p>
        )}
      </div>
    </main>
  )
}

export default App
