//Registrar el usuario
//Iniciar sesion
//Cerrar sesion
//Obtener informacion del usuario
//Crear transacciones
//Pedir prestamos
//Borrar cuenta
//Actualizar

import UserModel from "../models/UserModel.js";
import ManagerAccount from "./accountclass.js";
import ManagerCard from "./cardclass.js";

class ManagerUser {
    constructor(
        name,
        lastName,
        email,
        phone,
        isInSession,
        isAdmin,
        password
    ) {
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.isInSession = isInSession;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    async register() {
        try {
            const user = await UserModel.create({
                email: this.email,
                phone: this.phone,
                name: this.name,
                lastName: this.lastName,
                isInSession: this.isInSession,
                isAdmin: this.isAdmin,
                password: this.password,
            });
            //instanciamos clase
            const MA = new ManagerAccount(user._id, 12345, "Ahorro", 10000);
            const currentAccount = await MA.createAccount();
            const MC = new ManagerCard(user._id, currentAccount._id, "16 digitos al azar",
                "debito", "de la fecha actual sumar 3 años", "generar codigo de 3 cifras",
                "active");
            await MC.createCard();
            return user;
        } catch (error) {
            throw new Error(`Error al registrar usuario: ${error}`);
        }
    }

    async Login(email, password) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("Usuario no registrado")
            }
            if (user.password !== password) {
                throw new Error("Contraseña incorrecta")
            }
            return "Succeeded";
        } catch (error) {
            throw new Error(`Error al iniciar sesion: ${error}`);

        }
    }

    async getuserInfo(id) {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw new Error(`Error al obtener informacion del usuario: ${error}`);
        }
    }

    async updateEmail(id, email) {
        try {
            if (!email) {
                throw new Error(`Email invalido: ${error}`);
            }
            await UserModel.findByIdAndUpdate(id, {
                $set: { email }
            })
            return "ok"
        } catch (error) {
            throw new Error(`Error al actualizar el correo: ${error}`);


        }
    }
    async updatePhone(id, phone) {
        try {
            if (!phone) {
                throw new Error(`Numero Inavlido: ${error}`);
            }
            await UserModel.findByIdAndUpdate(id, {
                $set: { phone }
            })
            return "ok"
        } catch (error) {
            throw new Error(`Error al actualizar el numero: ${error}`);


        }
    }
    async updatePassword(id, password) {
        try {
            if (!password) {
                throw new Error(`Contraseña invalida: ${error}`);
            }
            await UserModel.findByIdAndUpdate(id, {
                $set: { password }
            })
            return "ok"
        } catch (error) {
            throw new Error(`Error al actualizar la contraseña: ${error}`);
        }
    }
    
    //Pendiente eliminar usuario
}

export default ManagerUser;


