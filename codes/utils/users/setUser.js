import { checkUndefined, post, error, alertError } from "../drey.js?v1";
import { checkGroupIndex } from "../../utils/groups/checkGroups.js?v1";

export async function setUser(userId) {
    await post("./connections/users/setUser.php", {
        idUser: userId,
    }).then((jsonData) => {
        if (checkUndefined(jsonData?.success)) {
            if (jsonData?.success === 1) {
                console.log("Usuario añadido a la BD");
                checkGroupIndex(userId);
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