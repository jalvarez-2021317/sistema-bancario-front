import { heroes } from "../data/heroes"

export const getBHeroById = (id) => {
  
    return heroes.find(hero => hero.id === id);

}
