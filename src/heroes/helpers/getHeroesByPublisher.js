import { heroes } from "../data/heroes";

export const getHeroesByPublisher = ( publisher ) => {

    //publisher sera DC o Marvel
    const validPublishers = ['DC Comics', 'Marvel Comics'];
    //Validamos si no existe tira una excepcion
    if (!validPublishers.includes(publisher)) {
        throw new Error(`${publisher} is not a valid publisher`);
    }

    return heroes.filter( hero => hero.publisher == publisher);

}