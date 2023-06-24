import { heroes } from "../data/heroes";

export const getHeroesByName = (name = '') => {
    
    name = name.toLocaleLowerCase().trim();

    //Si el usuario busca y no hay coloca nada, se muestra un array basio
    if(name.length === 0) return [];
  
    //De lo contrario se realiza un filtro
    return heroes.filter(
        hero => hero.superhero.toLocaleLowerCase().includes( name )
    );


}