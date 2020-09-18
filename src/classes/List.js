import generateID from '../helpers/generateID.js';

class List
{

    constructor(text, description, id)
    {
        this.id          = (id) ? id : generateID();
        this.text        = text;
        this.description = description;
        this.selected    = false;
    }
}

export default List;
