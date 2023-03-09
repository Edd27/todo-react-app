import { useState } from 'react'
import { IconSquareRoundedXFilled } from '@tabler/icons-react'

const Task = ({ task, setTasks }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id))
  }

  const handleComplete = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  return (
    <li
      className="bg-gray-700 rounded-md px-4 py-5 shadow flex justify-between items-center cursor-pointer hover:bg-gray-600 duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleComplete}
          className={`cursor-pointer appearance-none h-5 w-5 rounded-full border-2 focus:outline-none duration-300 ${
            task.completed ? 'bg-sky-500' : ''
          }`}
        />
        <span>{task.title}</span>
      </div>
      <button
        onClick={handleDelete}
        className={`${!isHovered ? 'hidden' : 'block'}`}
      >
        <IconSquareRoundedXFilled />
      </button>
    </li>
  )
}

export default Task
