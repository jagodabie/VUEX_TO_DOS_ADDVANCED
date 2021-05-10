import axios from 'axios';
const todos = {
  state: {
    todos: [
    ]
  },
  getters:  {
    allTodos (state){
       return state.todos
    }
  },
  actions:  {
    async fetchToDos({commit}) {
        const resp = await axios.get('http://jsonplaceholder.typicode.com/todos');
        commit('setTodos', resp.data)
    },
    async postToDo({commit},title){
        const resp = await axios.post('http://jsonplaceholder.typicode.com/todos',
         {title,completed: false}
         );
        commit('newTodo', resp.data)
    },
    async deleteTodo({commit}, id){
        await axios.post(`http://jsonplaceholder.typicode.com/todos/${id}`,
        commit('removeTodo', id)
        )
    },
    async filterTodos({commit},e){
     
        const limit = e.target.options[e.target.options.selectedIndex].innerText
        const resp = await axios.get(`http://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('filterTodos', resp.data)  
    },
    async updateTodo({commit},updTodo){
        const resp = await axios.put(`http://jsonplaceholder.typicode.com/todos/${updTodo.id}`,updTodo);
        commit('updateTodo', resp.data)  
    }
  },

  mutations: {
    setTodos: (state,todos) => state.todos = todos,
    newTodo: (state,todo) => state.todos.unshift(todo),
    removeTodo: (state,id)=> state.todos = state.todos.filter(todo=> todo.id !==id),
    filterTodos: (state,todos) => state.todos = todos,
    updateTodo: (state,updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updTodo);
         }
    }
  }
}

export default todos;