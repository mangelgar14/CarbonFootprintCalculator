import { checkUndefined, post, alertError } from "../drey.js?v1";
import { getId } from "../../utils/id/username.js?v1";
import { checkGroupIndex } from "../../utils/groups/checkGroups.js?v1";

export async function controlUser(page = false) {

    const userId = getId();

    await post("../connections/users/checkUserExist.php", {
        idUser: userId,
    }).then((jsonData) => {
        if (checkUndefined(jsonData?.success)) {
            if (jsonData?.success === 1) {
                if (jsonData.exist) {
                    //Usuario existe, comprobar si tiene grupo
                    checkGroupIndex(userId, page);
                } else {
                    //Usuario no existe volver a index
                    Swal.fire(
                        '¡Error!',
                        `Debes logearte antes de visitar esta página.<br>Se te va a redirigir.`,
                        'error'
                    ).then(() => {
                        location.replace("../index.html");
                    });
                }
            } else {
                alertError();
                error(jsonData);
            }
        } else {
            alertError();
            error(jsonData);
        }
    });
}