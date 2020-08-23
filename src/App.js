import React, { useState, useCallback, useEffect} from 'react';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback((event)=> {
    event.preventDefault();

    if(!newTodo.trim()){ return;}
    
    setTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false,
      },
      ...todos
    ]);
    setNewTodo('');
  }, [newTodo, todos]);

  useEffect(() => {
    //console.log('todos', todos);
    return () => {

    };
  }, [todos]);


  const addTodo = useCallback((todo, index) => (event) => {
    const newTodos = todos.slice();
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });

    setTodos(newTodos);
  }, [todos]);

  const removeTodo =useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);


  const markAllDone = useCallback(() => {
    const newTodos = todos.map( todo => {
      return {
        ...todo,
        done: true,
      }
    });
    setTodos(newTodos);
  },[todos]);


  return (
  <div className = "App" >
    <form onSubmit={formSubmitted}> 
      <label htmlFor="newTodo">Enter A TODO:</label>
        <input id="newTodo" name="newTodo" value={newTodo} onChange={onNewTodoChange} />
        <button type="submit">Add TODO</button>
    </form>
    <button onClick={markAllDone}>Mark All Done</button>
    <ul>
        {todos.map((item, index) => (
          <li key={item.id}>
            <span onClick={addTodo(item,index)} className={item.done ? 'done' : ''}>{item.content}</span>
            <button onClick={removeTodo(item)}>Remove Todo</button>
          </li>
        ))}
    </ul>
  </div>);
}


export default App;