import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';




export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task

    const isTaskAlreadAdded = tasks.find((task) => {
      return task.title === newTaskTitle
    })

    if (isTaskAlreadAdded) {
      Alert.alert(
        "Task Já Cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [

          { text: "OK" }
        ]
      );
      return
    }

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

    Alert.alert(
      "Remover Item",
      "Tem certeza que você deseja remover esse item  ?",
      [
        {
          text: "Não",
          onPress: () => {
            return
          },
          style: "cancel"
        },
        {
          text: "Sim", onPress: () => {
            const updatedTasks = tasks.filter((task) => {
              return task.id !== id
            })

            setTasks(updatedTasks)
          }

        }
      ]
    )

  }

  function handleEditTask(id: number, newTaskTitle: string) {



    const targetTask = tasks.find((task) => {
      return task.id === id
    })

    if (targetTask) {
      targetTask.title = newTaskTitle

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



  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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