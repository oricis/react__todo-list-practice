const UUIDGeneratorBrowser = () => (
    [1e7] + -1e3 + -4e3 + -8e3 + -1e11
).replace(
    /[018]/g, c => (
        c ^ (crypto.getRandomValues(
            new Uint8Array(1)
        )[0] & (15 >> (c / 4)))
    ).toString(16)
);

class List
{
    constructor(id, text, description, color)
    {
        this.id   = id;
        this.text = text;
        this.description = description;
        this.color = color;
    }
}
class Task
{
    constructor(text, color, listId) {
        this.id = UUIDGeneratorBrowser();
        this.text = text;
        this.color = color;
        this.listId = listId;
    }
}


////////////////////////////////////////////////////////////////////////
// Test

console.log('Testing Task...');

const task1a = new Task('Some text', 'red', 1);
const task2a = new Task('Some text', 'red', 1);
const task3a = new Task('Some text', 'red', 2);
const task4a = new Task('Some text', 'red', 2);
const task3b = new Task('Lorem ipsum', 'green', 2);
const task4b = new Task('Lorem ipsum', 'green', 3);

const list1 = new List(1, 'List One', 'Lorem ipsum', 'green');
const list2 = new List(2, 'List Two', '', 'yellow');
let storedLists = [
    list1,
    list2,
];
let storedTasks = [
    task1a, // listId === 1
    task2a, // listId === 1
    task3a, // listId === 2
];

// simulate tasks in the app's state, only can be of one list
const activeListId = 2;
task3a.text = 'Modified text label !!!';
let activeTasks = [
    task3a, // listId === 2
    task4a, // listId === 2
    task3b, // listId === 2
];

let commonTasks = [
    task1a,
    task2a,
];

const firstCommonTaskId = task1a.id;
