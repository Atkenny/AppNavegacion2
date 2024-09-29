import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
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

  const toggleTaskCompletion = (taskId) => {
    setTaskList((currentTasks) => {
      return currentTasks.map((task) => 
        task.id === taskId ? { ...task, completada: !task.completada } : task
      );
    });
  };

  const removeTask = (taskId) => {
    setTaskList((currentTasks) => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // Ajusta esto si es necesario
    >
      <Text style={styles.title}>Aplicación de Tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ingresa una tarea"
          style={styles.input}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Add Tarea</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        style={styles.taskList} // Añadir estilo aquí para el FlatList
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)} style={styles.taskItem}>
            <Text style={[styles.taskText, item.completada ? styles.completedTask : null]}>
              {item.nuevaTarea}
            </Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <AntDesign name='close' style={styles.deleteButton} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginTop: 40, // Espacio adicional en la parte superior
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 20, // Aumentar margen para mayor separación
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Espaciado entre el input y la lista
  },
  input: {
    flex: 1,
    borderColor: '#6A1B9A',
    borderWidth: 1,
    padding: 9,
    backgroundColor: '#fff', // Fondo blanco
  },
  button: {
    backgroundColor: '#6A1B9A',
    padding: 15,
    marginLeft: -1, // Para que el botón esté unido al input
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskList: {
    marginTop: 20, // Espacio adicional en la lista de tareas
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#A5D6A7', // Fondo verde claro para las tareas
  },
  taskText: {
    flex: 1,
    color: 'black', // Color del texto de la tarea
  },
  completedTask: {
    textDecorationLine: 'line-through', // Línea a través del texto
    color: 'green', // Cambia el color si es necesario
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
