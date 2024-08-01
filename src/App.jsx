import { useEffect, useState } from "react"
import TodoInput from "./components/Todoinput"
import TodoList from "./components/TodoList"

function App() {
  
    

 const [todos, setTodos] = useState(
  ['Go to the gym',
    'Eat more fruits and vege',
    'Pick up the kids from school'
  ])
  const [todovalue, settodovalue] = useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({
      todos: newList
    }))
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    setTodos(newTodoList)
    persistData(newTodoList)
    settodovalue('')
  }

  function handleDeleteTodos(index){
    const deleteTodoList = todos.filter((todo, todoIndex)=>{
        return todoIndex !== index
    })
    setTodos(deleteTodoList)
    persistData(deleteTodoList)
  }

  function handleEditTodos(index){
    const valueToBeEdited = todos[index]
    settodovalue(valueToBeEdited)
    persistData(valueToBeEdited)
    handleDeleteTodos(index)
  }
 
  useEffect(()=>{
    if (!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos')

    if(!localTodos){
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)


  },[])

  return (
    <>
      <TodoInput handleAddTodos = {handleAddTodos} todovalue={todovalue} settodovalue={settodovalue} />
      <TodoList handleDeleteTodos ={handleDeleteTodos} todos={todos} handleEditTodos={handleEditTodos} />
    </>
  )
}

export default App
