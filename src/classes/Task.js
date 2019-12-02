import generateID from '../helpers/generateID.js';

class Task 
{
    completed = false;
    

    constructor(text, color)
    {
        this.id    = generateID();
        this.text  = text;
        this.color = color;
    }
}

export default Task;
