const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

const TODOS_FILE = 'todos.json';

// Helper function to read the todos from the file
function readTodos() {
    if (!fs.existsSync(TODOS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(TODOS_FILE, 'utf8');
    return JSON.parse(data);
}

// Helper function to write todos to the file
function writeTodos(todos) {
    fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2), 'utf8');
}

// Add a todo
program
    .command('add <task>')
    .description('Add a new todo')
    .action((task) => {
        const todos = readTodos();
        todos.push({ task, done: false });
        writeTodos(todos);
        console.log(`Added todo: "${task}"`);
    });

// Delete a todo
program
    .command('delete <index>')
    .description('Delete a todo by index')
    .action((index) => {
        const todos = readTodos();
        const numIndex = parseInt(index, 10);
        if (numIndex < 1 || numIndex > todos.length) {
            console.log(`Invalid index: ${index}`);
        } else {
            const [deleted] = todos.splice(numIndex - 1, 1);
            writeTodos(todos);
            console.log(`Deleted todo: "${deleted.task}"`);
        }
    });

// Mark a todo as done
program
    .command('done <index>')
    .description('Mark a todo as done by index')
    .action((index) => {
        const todos = readTodos();
        const numIndex = parseInt(index, 10);
        if (numIndex < 1 || numIndex > todos.length) {
            console.log(`Invalid index: ${index}`);
        } else {
            todos[numIndex - 1].done = true;
            writeTodos(todos);
            console.log(`Marked todo as done: "${todos[numIndex - 1].task}"`);
        }
    });

// List all todos
program
    .command('list')
    .description('List all todos')
    .action(() => {
        const todos = readTodos();
        if (todos.length === 0) {
            console.log('No todos found.');
        } else {
            console.log('Todos:');
            todos.forEach((todo, index) => {
                const status = todo.done ? '[✔]' : '[ ]';
                console.log(`${index + 1}. ${status} ${todo.task}`);
            });
        }
    });

program.parse(process.argv);
