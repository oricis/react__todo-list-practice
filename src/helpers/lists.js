import { find } from './todo.js';

const getSelectedListText = (lists, listId) =>
{
    const list = lists.length ? find(lists, listId) : null;

    return (list) ? list.text : '';
}


export {
    getSelectedListText,
}
