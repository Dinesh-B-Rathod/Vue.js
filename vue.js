new Vue({
        el: '#app',
        data: {
            tasks: [],
            newTask: '',
            filter: 'all'
        },
        computed: {
            filteredTasks() {
                if (this.filter === 'completed') {
                    return this.tasks.filter(task => task.completed);
                } else if (this.filter === 'incomplete') {
                    return this.tasks.filter(task => !task.completed);
                } else {
                    return this.tasks;
                }
            }
        },
        methods: {
            addTask() {
		try {
                // Trim the newTask input
                const newTaskTitle = this.newTask.trim();

                if (newTaskTitle === '') {
                    alert("Task title cannot be empty.");
                    return; // Don't add empty tasks
                }

                this.tasks.push({
                    id: Date.now(),
                    title: newTaskTitle,
                    completed: false
                });
                this.newTask = '';
		// Add a timeout to remove the 'new' class for the fade-in effect
                    setTimeout(() => {
                        this.tasks.forEach(task => {
                            if (task.new) {
                                task.new = false;
                            }
                        });
                    }, 500); // Adjust the duration to match your CSS animation duration
		} catch (error) {
                        console.error("Error:", error.message);
                        // You can show an error message to the user here if needed
                }
            },
            deleteTask(id) {
                const index = this.tasks.findIndex(task => task.id === id);
                if (index !== -1) {
                    this.tasks.splice(index, 1);
                }
            }
        }
    });