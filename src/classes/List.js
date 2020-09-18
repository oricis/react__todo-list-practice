import generateID from '../helpers/generateID.js';

class List
{

    constructor(text, description, id)
    {
        this.id          = id || generateID().substr(1, 16);
        this.text        = text || this.id.substr(1, 6)
        this.description = description;
        this.selected    = false;
    }
}

export default List;
