'use client';

import {useEffect, useState} from 'react';
import { Input, Button, Checkbox } from 'antd';


export default function TodoPage() {
  let [todoList, setTodoList] = useState([]); // todoList = [ {todo: '할 일', done: false}

  function saveTodo() {
    const todoInput = document.querySelector('#todo') as HTMLInputElement;
    const localTodoList = localStorage.getItem('todoList');

    if( localTodoList === null ){
      // 로컬 스토리지에 todoList가 없을 때
      setTodoList({"todo": todoInput.value, "done": false});
    }
    else {
      // 로컬 스토리지에 todoList가 있을 때
      todoList = JSON.parse(localTodoList);
      todoList.push({"todo": todoInput.value, "done": false});
    }
    localStorage.setItem('todoList', JSON.stringify(todoList));

    getTodoList();
    todoInput.value = '';
  }

  function getTodoList() {
    const getTodoList = localStorage.getItem('todoList');
    setTodoList(JSON.parse(getTodoList));
    console.log('getTodoList');
  }


  useEffect(()=>{
    getTodoList();
  },[])

  return (
    <div>
      <h1>To Do List</h1>
      <div className="flex">
        <Input type="text" size="large" id="todo" name="todo" placeholder="할 일 입력하기" />
        <Button type="primary" onClick={saveTodo}> 저장 </Button>
      </div>

      <div className="flex flex-col">
      {
        todoList.map((item, index) => {
          console.log(item);
          return (
            <div key={index} className="m-2">
              <Checkbox checked={item.done === true} className="mr-2 text-white">{item.todo} / {item.done}</Checkbox>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

