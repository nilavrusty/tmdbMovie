import axios from 'axios';

export const null_path = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
export const domain = 'https://api.themoviedb.org/3/';
export const api_key = '?api_key=e58383df89b5c8249bc8788a2b29f3f2'

export const getGuestandStore = async () => {
    try {
        const data = await axios.get(` ${domain}authentication/guest_session/new${api_key}`);
        if (data.data) {
            localStorage.setItem('guest', JSON.stringify(data.data))
        }
        return { ...data.data };
    } catch (e) {
        console.log('failed', e.message)
    }
}

var timerId;
export const throttleFunction = function (func, delay = 500) {
    // If setTimeout is already scheduled, no need to do anything
    if (timerId) {
        return
    }
    // Schedule a setTimeout after delay seconds
    timerId = setTimeout(function () {
        func()
        // for the next scroll event function execution to be scheduled by the setTimeout so setting it undefined
        timerId = undefined;
    }, delay)
}

