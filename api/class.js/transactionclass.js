//Movimiento de dinero(Crear transaccion)
//Obtener transacciones
//Obtener  transacciones por usuario

import TransactionModel from "../models/TransactionModel.js";
class ManagerTransaction {
    constructor(
        accountFromId,
        accountToId,
        Type,
        Amount,
        Description
    ) {
        this.accountFromId = accountFromId;
        this.accountToId = accountToId;
        this.Type = Type;
        this.Amount = Amount;
        this.Description = Description;
    }

    async createTransaction() {
        try {
            const transaction = await TransactionModel.create({
                accountFromId:this.accountFromId,
                accountToId:this.accountToId,
                Type: this.Type,
                Amount: this.Amount,
                Description: this.Description
            })
            return transaction;
        } catch (error) {
            throw new Error(`Error al crear la transaccion ${error}`)
        }
    }
    
    async getTransaction(id){
        try {
            const transaction = await TransactionModel.findById(id);
            return transaction;
        } catch (error) {
            throw new Error(`Error al obtener la transaccion ${error}`)
        }
    }

    async getTransactions(){
        try {
            const transactions = await TransactionModel.find();
            return transactions;
        } catch (error) {
            throw new Error(`Error al obtener las transacciones ${error}`)
        }
    }

    async getAccountTransactions(id){
        try {
            const transactions = await TransactionModel.find({accountFromId:id});
            return transactions;
        } catch (error) {
            throw new Error(`Error al obtener la transaccion ${error}`)
        }
    }
}
export default ManagerTransaction;