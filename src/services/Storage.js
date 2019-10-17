/**
 * Class to handle LocalStorage
 *
 * Moisés Alcocer, 2019
 * contacto@ironwoods.es
 */

class Storage
{

    clear()
    {
        window.localStorage.clear();
    }

    get(key)
    {
        const storedData = window.localStorage.getItem(key);
        const value = (storedData !== null)
            ? JSON.parse(storedData)
            : '';

        return value;
    }

    set(key, value)
    {
        value = JSON.stringify(value);

        window.localStorage.setItem(key, value);
    }

    unset(key)
    {
        window.localStorage.removeItem(key);
    }
}

export default Storage;
