export enum Sexo{
    indefinido="indefinido",
    Macho='Macho',
    Hembra='Hembra'
}
export enum Especie{
    Perro = 'Perro',
    Gato = 'Gato',
    Conejo = 'Conejo',
    Hamster = 'Hámster',
    Ave = 'Ave',
    Reptil = 'Reptil',
    Otros = 'Otros'
}

export interface Mascota {
    nombre:string
    especie:Especie
    raza:string
    sexo:Sexo
    fechaNacimiento:string
}
