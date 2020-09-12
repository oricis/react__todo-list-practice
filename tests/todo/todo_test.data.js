const UUIDGeneratorBrowser = () => (
    [1e7] + -1e3 + -4e3 + -8e3 + -1e11
).replace(
    /[018]/g, c => (
        c ^ (crypto.getRandomValues(
            new Uint8Array(1)
        )[0] & (15 >> (c / 4)))
    ).toString(16)
);

class Task
{
    constructor(text, color, listId)
    {
        this.id = UUIDGeneratorBrowser();
        this.text   = text;
        this.color  = color;
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

let storedTasks = [
    task1a,
    task2a,
    task3a,
];

let activeTasks = [
    task1a,
    task2a,
    task3b, // NOTE: different task than in "storedTask"
    task4b
];

let commonTasks = [
    task1a,
    task2a,
];
