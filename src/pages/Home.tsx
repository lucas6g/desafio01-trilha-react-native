import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';




export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    setTasks([...tasks, { title: newTaskTitle, done: false, id: new Date().getTime() }])
  }

  function handleToggleTaskDone(id: number) {
    const targetTask = tasks.find((task) => {
      return task.id === id
    })

    if (targetTask?.done === true) {
      targetTask.done = false
    } else if (targetTask?.done === false) {
      targetTask.done = true
    }

    const updatedTasks = tasks.map((task) => {
      return { ...task }
    })

    const indexInArray = updatedTasks.findIndex((task) => {
      return task.id === id
    })
    if (indexInArray !== -1) {
      if (targetTask) {
        updatedTasks[indexInArray] = targetTask

      }
    }


    setTasks(updatedTasks)


  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id
    })

    setTasks(updatedTasks)

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})