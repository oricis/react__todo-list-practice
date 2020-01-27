
const getSelected = (elements) =>
{
    if (isSomeSelected(elements)) {
        selectFirst(elements);

        return elements[0];
    }

    let selected = null;
    elements.forEach(element => {
        if (element.selected) {
            selected = element;
        }
    });

    return selected;
}

const isSomeSelected = (elements) =>
{
    let selectedFlag = false;
    elements.forEach(element => {
        if (element.selected) {
            selectedFlag = true;
        }
    });

    return selectedFlag
}

const selectFirst = (elements) =>
{
    elements[0].selected = true;

    return elements;
}



export {
    getSelected,
    isSomeSelected,
    selectFirst
}
