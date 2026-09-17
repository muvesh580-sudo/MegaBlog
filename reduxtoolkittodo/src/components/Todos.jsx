import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState("")

    const handleEdit = (todo) => {
        setEditingId(todo.id)
        setEditText(todo.text)
    }

    const handleUpdate = (id) => {
        dispatch(updateTodo({
            id: id,
            text: editText
        }))
        setEditingId(null)
        setEditText("")
    }

    return (
        <>
            <div>Todos</div>

            <ul className="list-none">
                {todos.map((todo) => (
                    <li
                        className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                        key={todo.id}
                    >
                        {editingId === todo.id ? (
                            <input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="text-black px-2 py-1"
                            />
                        ) : (
                            <div className="text-white">{todo.text}</div>
                        )}

                        <div>
                            {editingId === todo.id ? (
                                <button
                                    onClick={() => handleUpdate(todo.id)}
                                    className="text-white bg-green-500 px-4 py-1 rounded"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(todo)}
                                    className="text-white bg-blue-500 px-4 py-1 rounded"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={() => dispatch(removeTodo(todo.id))}
                                className="text-white bg-red-500 px-4 py-1 rounded ml-2"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todos