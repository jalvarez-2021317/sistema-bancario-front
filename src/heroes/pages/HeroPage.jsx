import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getBHeroById } from "../helpers";

export const HeroPage = () => {

  //use Params nos sirve para obetener los parametros de un router
  const { id } = useParams();

  const hero = useMemo( () => getBHeroById(id), [ id ] );
  //console.log(hero);

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1); //Regresa a la ventana anterior, incluso sacar del navegador
  }

  //Si el heroe no existe que regresa a la pantalla de marvel
  if (!hero) {
    return <Navigate to="/marvel" />
  }

  return (
    <>
      <div className="row mt-3">

        <div className="col-4">
          <img src={`/assets/heroes/${id}.jpg`}
            alt={hero.superhero} className="img-thumbnail animate__animated animate__fadeInLeft"/>
        </div>

        <div className="col-8">
          <h3>{hero.superhero}</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"> <b>Alter Ego: </b>{hero.alter_ego}</li>
            <li className="list-group-item"> <b>Publisher: </b>{hero.publisher}</li>
            <li className="list-group-item"> <b>First Apperence: </b>{hero.first_appearance}</li>
          </ul>

          <h5 className="mt-3">Characters</h5>
          <p>{hero.characters}</p>
          <button onClick={onNavigateBack}  className="btn btn-outline-primary">
            Regresar
          </button>
        </div>



      </div>
    </>
  )

}
