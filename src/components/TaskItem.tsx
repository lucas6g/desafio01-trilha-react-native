import { ItemWrapper } from "./ItemWrapper";
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import React, { useRef } from "react";

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import cancelIcon from '../assets/icons/cancel/cancel.png'
import divisorIcon from '../assets/icons/divisor/divisor.png'
import { useState } from "react";
import { Task } from "./TasksList";

interface TaskItemProps {
    index: number
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTaskTitle: string) => void
    task: Task

}

export function TaskItem({ index, removeTask, toggleTaskDone, editTask, task }: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [newTask, setNewTask] = useState('')

    const refInput = useRef<TextInput>(null);

    const getFocusInput = () => {
        refInput.current?.focus()

    };

    return (
        <ItemWrapper index={index}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} >
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop
                    onPress={() => {
                        toggleTaskDone(task.id)
                    }}
                    disabled={isEditing}
                >
                    <View
                        testID={`marker-${index}`}

                        style={task.done === true ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>


                </TouchableOpacity>
                <TextInput
                    ref={refInput}
                    editable={isEditing}
                    selectTextOnFocus={isEditing}
                    onChangeText={(task) => {
                        setNewTask(task)
                    }}

                    onSubmitEditing={() => {
                        editTask(task.id, newTask)
                        setIsEditing(false)
                    }}
                    style={task.done === true ? styles.taskTextDone : styles.taskText}
                    value={isEditing ? newTask : task.title}
                />

            </View>




            <View style={styles.buttonContainer}>


                <TouchableOpacity
                    testID={`trash-${index}`}

                    //TODO - use onPress (remove task) prop
                    onPress={() => {
                        if (!isEditing) {
                            setIsEditing(true)
                            setNewTask(task.title)
                            getFocusInput()
                        } else {
                            setIsEditing(false)
                        }
                    }}
                >
                    <Image source={isEditing ? cancelIcon : editIcon} />

                </TouchableOpacity>


                <Image style={{ marginHorizontal: 16 }} source={divisorIcon} />


                <TouchableOpacity


                    testID={`trash-${index}`}

                    //TODO - use onPress (remove task) prop
                    onPress={() => {
                        removeTask(task.id)
                    }}
                    disabled={isEditing}
                >
                    <Image style={{ opacity: isEditing ? 0.5 : 1 }} source={trashIcon} />
                </TouchableOpacity>



            </View>
        </ItemWrapper>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        marginRight: 8,
        paddingLeft: 24,
        paddingVertical: 15,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 24

    }
})