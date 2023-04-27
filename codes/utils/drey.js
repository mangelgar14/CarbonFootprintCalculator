/* import { ready, login, $, html, append, css, addClass, removeClass, ifClass, hasClass, replaceClass, attr, event, post, load, checkUndefined, script, page, parseCognito, reload, resizeWindow, delay, error, alertError, browser, dialog, getId, validate } from "./utils/drey.js"; */

//import { authenticate, storage } from "../../../../dist_cookie/module/authenticator.js";

const ready = (action) => {
    window.addEventListener("load", action);
}

export const login = (action) => {
    ready(() => {/*
        authenticate().then((response) => {
            if (response) {
                storage(action);
            } else {
                console.log("Error login");
            }
        });
        */
        const id = "accenture.com_id.prueba@accenture.com";
        localStorage.setItem('input_id', id);
        (action)();
        
    });
}

export const $ = (selector) => {
    return document.querySelector(selector);
}

export const html = (selector, content) => {
    selector.innerHTML = content;
}

export const append = (selector, content) => {
    selector.append(content);
}

export const css = (selector, css, val) => {
    selector.setAttribute("style", `${css}:${val}`);
}

export const addClass = (selector, newclass) => {
    selector.classList.add(newclass);
}

export const removeClass = (selector, targetclass) => {
    selector.classList.remove(targetclass);
}

export const ifClass = (selector, targetclass, condition) => {
    selector.classList.toggle(targetclass, condition);
}

export const hasClass = (selector, targetclass) => {
    return selector.classList.contains(targetclass);
}

export const replaceClass = (selector, targetClass, replaceclass) => {
    selector.classList.replace(targetClass, replaceclass);
}

export const attr = (selector, name, value = "") => {
    selector.setAttribute(name, value);
}

export const event = (selector, event, action, callback = null, capture = false) => {
    if (event === "hover") {
        selector.addEventListener("mouseover", action, capture);
        selector.addEventListener("mouseleave", callback, capture);
    } else {
        selector.addEventListener(event, action, capture);
    }
}

export const post = (url, data, json = true) => {
    let params = { method: 'POST' }
    if (json) { params.headers = { 'Content-Type': 'application/json' } }
    json ? params.body = JSON.stringify(data) : params.body = data;

    return new Promise(resolve => {
        fetch(url, params).then(res => res.text())
            .then(jsonData => {
                resolve(JSON.parse(jsonData));
            }).catch(error => {
                resolve(error);
            });
    });
}

export const load = (selector, url) => {
    fetch(url).then((response) => {
        return response.text();
    }).then((body) => {
        html(selector, body);
    });
}

export const checkUndefined = (input) => {
    return input === undefined ? false : true;
}

export const script = (selector, code, name = null) => {
    const loadScript = (src) => new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;
        script.type = "module";
        if (name != null) script.id = name;
        script.onload = resolve;
        script.onerror = reject;
        selector.appendChild(script);
    }); loadScript(code);
}

export const page = (page, noreturn = false) => {
    noreturn ? location.replace(page) : location.assign(page);
}

export const parseCognito = (url) => {
    if ((window.location.href).slice(-1) === "#") history.pushState(null, "", url);
}

export const reload = (force = false) => {
    force ? location.reload(true) : location.reload();
}

export const resizeWindow = (action) => {
    window.onresize = action;
}

export const delay = (time, action) => {
    setTimeout(action, time);
}

export const error = (error) => {
    console.log(`%c Error: ${error} `, 'background: red; color: white;');
    console.trace(error);
}

export const alertError = () => {
    dialog("error", "¡Ops!", "OK", `Se ha producido un <b class="bold">fallo</b> de conexión. Se va a <b class="bold">recargar la página</b> para que vuelvas a intentarlo.`, true, () => {
        reload(true);
    });
}

export const browser = (browser) => {
    /* chrome - firefox - opera - MSIE */
    return navigator.userAgent.toLowerCase().indexOf(browser) > -1;
}

export const dialog = (idName = "", titleDialog = "", buttonDialog = "OK", contentDialog = "<br>", escape = true, callback = ()=>{}) => {

    /*
    dialog {
        width: 30%;
        display: grid;
        align-items: center;
        justify-items: center;
        border: none;
        border-radius: 1rem;
        padding: 2rem 0rem 2rem 0rem;
    }

    dialog > div > h1 {
        font-size: 1.5rem;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(1px);
    }

    dialog > button {
        padding: 0.5rem 2rem 0.5rem 2rem;
        border-radius: 1rem;
        border: none;
        background: #a100ff;
        color: white;
        cursor: pointer;
    }

    dialog > button:hover {
        background: #66039f;
    }
    */

    const closeDialog = (dialog) => {
        dialog.removeAttribute("style");
        dialog.style.setProperty('--animate-duration', '0.2s');
        removeClass(dialog, "animate__fadeIn");
        addClass(dialog, "animate__fadeOut");

        event(dialog, "animationend", () => {
            dialog.remove();
            (callback)();
        });
    }

    const dialog = document.createElement("dialog");
    const content = document.createElement("div");
    const button = document.createElement("button");

    button.textContent = buttonDialog;
    content.innerHTML = `<h1>${titleDialog}</h1>${contentDialog}`;

    dialog.appendChild(content);
    dialog.appendChild(button);

    dialog.style.setProperty('--animate-duration', '0.3s');
    dialog.className = "animate__animated animate__fadeIn";
    dialog.setAttribute("id", idName);

    $("body").appendChild(dialog);

    event(dialog, "close", () => {
        closeDialog(dialog);
    });

    event(button, "click", () => {
        closeDialog(dialog);
    });

    if (!escape) $(`dialog#${idName}`).addEventListener('cancel', (event) => event.preventDefault());

    $(`dialog#${idName}`).showModal();
    button.blur();
}

export const getId = () => {
    return localStorage.getItem('input_id');
}

export const validate = (value, type, formats = null) => {
    let regExp;
    const regExpOptions = {
        'email': () => regExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
        'mail': () => regExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
        'file': () => regExp = `^.*\.(${formats})$`,
    }; const regExpDefault = () => regExp = null;

    regExpOptions[type] ? regExpOptions[type]() : regExpDefault;

    if (type === "file") {
        let validate = new RegExp(regExp);
        return Boolean(validate.test(value));
    } else {
        return Boolean(regExp.test(value));
    }
}

/**
 * <
 * <
 * <
 * Validate Function - https://regexr.com/
 * @param {string} value
 * @param {string} type
 * @param {string|null} formats
 * @return {Boolean}
**/


/* ---------------------------------------------------------------- */

//Con argumentos definidos

const pruebaParametrosDefinidos = ({ color, height = 100, sound, power }) => {

} //pruebaParametrosDefinidos({color: 'red', power: ['lighting','nuclear bomb'], sound: 'GROARR'});


//Poco usadas

export const removeEvent = (selector, event, action, capture = false) => {
    if (event === "hover") {
        selector.removeEventListener("mouseover", action, capture);
        selector.removeEventListener("mouseleave", callback, capture);
    } else {
        selector.removeEventListener(event, action, capture);
    }
}

export const fadeIn = (selector) => {
    if (hasClass(selector, 'hide')) selector.classList.remove('hide');
    selector.classList.add('show');
}

export const fadeOut = (selector) => {
    if (hasClass(selector, 'show')) selector.classList.remove('show');
    selector.classList.add('hide');
}


//Generador (Función que activas cuando tu quieras)

export function* generator(val1, val2, val3) {
    yield val1;
    yield val2;
    yield val3;
}


// Clausuras (Closures) - Forma segura de que no accedan a una variable y poder modificarla

export const crearContador = (contador = 0) => {
    return {
        incrementar: () => {
            contador++;
            return Number(contador);
        },
        decrementar: () => {
            contador--;
            return Number(contador);
        },
        obtenerValor: () => {
            return Number(contador);
        }
    }
}

// Probar el pasarle una cantidad de parametros indefinida

export const infiniteParams = (...values) => {
    values.forEach(element => console.log("Parametro: " + element));
}
