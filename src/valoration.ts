//Interfaz de 'Valoration'

export interface Valoration {
    eventName: string;
    date: Date;
    idUser: string;
    description: string;
    avatar: string;
    idComments: string[];
    _id: string;
    createdAt?: string; 
    updatedAt?: string;
}