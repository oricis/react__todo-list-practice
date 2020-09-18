import generateID from '../helpers/generateID.js';

class Task
{
    completed = false;


    constructor(text, color, listId)
    {
        this.id     = listId || generateID().substr(1, 16)
        this.text   = text || this.id.substr(1, 6)
        this.color  = color;
        this.listId = listId;
    }
}

export default Task;
