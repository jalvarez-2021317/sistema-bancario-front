import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {

    //No trabajamos con use State por que los datos NO CAMBIAN
    const heroes = useMemo( () => getHeroesByPublisher(publisher), [ publisher ] ); 

    return (
        <>
            <div className="row rows-cols-1 row-cols-md-3 g-3">
                {
                    heroes.map((hero) => (
                        <HeroCard key={hero.id}
                                      {...hero}
                        />
                    ))
                }
            </div>
        </>
    )
}