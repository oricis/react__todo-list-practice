import generateID from '../helpers/generateID.js';

class Task
{
    completed = false;


    constructor(text, color, listId)
    {
        this.id     = generateID();
        this.text   = text;
        this.color  = color;
        this.listId = listId;
    }
}

export default Task;
