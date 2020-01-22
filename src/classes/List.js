import generateID from '../helpers/generateID.js';

class List
{

    constructor(text, description)
    {
        this.id          = generateID();
        this.text        = text;
        this.description = description;
    }
}

export default List;
