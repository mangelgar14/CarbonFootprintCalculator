import { login, getId } from "./utils/drey.js?v1";

login(() => {

    // Cogéis la id con este módulo getId():
    console.log(`Se ha logado ${getId()}`);

});
