import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid'; // Importa uuid para generar IDs únicos
import AntDesign from 'react-native-vector-icons/AntDesign'; // Importa los iconos

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      const tareaNueva = {
        id: uuid.v4(), // Genera un ID único
        nuevaTarea: task,
        completada: false,
      };
      setTaskList([...taskList, tareaNueva]);
      setTask('');
    }
  };

  const removeTask = (taskId) => {
    setTaskList((currentTasks) => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicación de Tareas</Text>
      <TextInput
        placeholder="Ingresa una tarea"
        style={styles.input}
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="Add Tarea" onPress={addTask} />
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.nuevaTarea}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <AntDesign name='close' style={styles.deleteButton} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 10,
  },
  input: {
    borderColor: '#6A1B9A',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E1BEE7',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
