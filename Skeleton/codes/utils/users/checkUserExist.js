import { checkUndefined, post, error, alertError } from "../drey.js?v1";
import { checkGroupIndex } from "../groups/checkGroups.js?v1";
import { setUser } from "../users/setUser.js?v1";

export async function checkUserExist(userId) {
    await post("./connections/users/checkUserExist.php", {
        idUser: userId,
    }).then((jsonData) => {
        if (checkUndefined(jsonData?.success)) {
            if (jsonData?.success === 1) {
                if (jsonData.exist) {
                    //Usuario existe
                    checkGroupIndex(userId);
                } else {
                    //Usuario no existe
                    setUser(userId);
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