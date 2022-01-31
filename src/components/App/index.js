// == Import npm
// j'importe useEffect pour pouvoir l'utiliser
import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

// J'importe axios pour pouvoir m'en servir
import axios from 'axios';

// == Import local
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Posts from 'src/components/Posts';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';
import Single from 'src/components/Single';
import Error from 'src/components/Error';

import { getPostsByCategory } from 'src/utils';

// = Import des data
import categoriesListData from 'src/data/categories';
import postsListData from 'src/data/posts';

// == Import scss
import './app.scss';

/*
Et si on ajoutait un peu de dynamisme ?
Objectif : Charger nos articles depuis une API distante.

Pour y parvenir :

- Stocker nos articles dans du state
- Créer un bouton pour déclencher le chargement
- Créer un statut loading
- Challenge : Lancer le chargement :smirk:
*/

// State via les hooks
// -------------------
// La mécanique du state (useState dans un composant) permet :
// - définir des données dans le composant
// - si ces données changent, React refait le rendu du composant
//   - > refait le JSX du composant et des composants imbriqués
// => La modification d'une donnée du state passe par le "setter" fournit par useState
//
// const [donnée, modifierLaDonnée] = useState(valeur de départ);
// quand on exécute useState, on récupère :
// 1 - la donnée
// 2 - le moyen de la modifier
//
// -------------------

// Lifecycles avec useEffect
// -------------------------
// Permet d'exécuter une fonction lors des rendus d'un composant
//
// Des effets peuvent être déclenchés :
// - lors de la création du composant - mount - (rendu initial)
// - lors de la mise à jour du composant - update - (évolutions - par exemple le state)
//
// Syntaxe :
// - useEffect(() => {}) : au chargement initial et lors d'évolutions
// - useEffect(() => {}, []) : uniquement au chargement initial
// - useEffect(() => {}, [info]) : uniquement si la variable `info` change
//
// -------------------------

// Ce useEffect s'exécute à chaque rendu (mount et update)
// useEffect(() => {
//   console.log('Oh, un nouveau rendu vient de se produire');
// });

// Ce useEffect s'exécute uniquement au rendu initial (mount)
// useEffect(() => {
//   console.log('Au chargement initial, composant construit / rendu');
// }, []);

// 1er exo : aller chercher les catégories depuis l'api
// plutôt que depuis le fichier src/data/categories.js
// useEffect + axios + useState

// 2ème exo : mise à jour du titre de la page de manière dynamique (document.title)
// useEffect

// 3ème exo : revenir à la page d'accueil à l'appuis sur la touche ESC
// useEffect

// == Composant
const App = () => {
  // On va utiliser un hook d'état pour gérer le loading
  const [loading, setLoading] = useState(true);

  // On va utiliser le state pour stocker nos catégories
  const [categories, setCategories] = useState([]);

  // On va utiliser un hook d'état pour gérer nos posts
  const [posts, setPosts] = useState([]);

  // On utilise le state pour stocker le fait qu'une erreur se soit produit ou pas
  const [hasError, setError] = useState(false);

  const loadPosts = () => {
    console.log('allez, ça charge !');

    setLoading(true);

    // TODO : allez chercher les posts
    // - interroger l'api,
    axios.get('https://oclock-open-apis.now.sh/api/blog/posts')
      // le callback passé à then sera exécuté si la requête réussit
      .then((response) => {
        // on affiche ce qui nous intéresse dans la réponse, la propriété data
        console.log(response.data);

        // j'ai reçu mes posts, je souhaite les
        //  mettre dans le state grâce à setPosts.
        const receivedPosts = response.data;
        setPosts(receivedPosts);
      })
      // le callback passé à catch sera exécuté si la requête échoue
      .catch((error) => {
        // handle error
        console.error('une erreur est survenue');

        // on modifie notre état pour indiquer qu'une erreur est survenue
        setError(true);
      })
      // le callback passé à finally (ou then après catch)
      // sera exécuté dans tous les cas
      .finally(() => {
        console.log('erreur ou pas, je m\'exécute...');

        // je mets à jour le loading dans le state puisque
        // le chargement est teminé.
        setLoading(false);
      });

    //    - mettre à jour l'état de chargement
    //    -  provoquer un nouveau rendu, donc afficher les articles
  };

  // on souhaite aller chercher les posts une seule fois
  // au lancement de l'application, donc après le premier
  // rendu de notre composant App.
  // On utilise [] comme deuxième paramètre de useEffect pour cela.
  useEffect(loadPosts, []);

  useEffect(() => {
    // je vais interroger mon API pour récupérer les catégories
    axios.get('https://oclock-open-apis.now.sh/api/blog/categories')
      // callback à exécuter à la réception de la réponse
      .then(
        (response) => {
          console.log(response);
          // mettre à jour le state avec les catégories récupérées.
          setCategories(response.data);
        },
      ).catch(
        () => {
          console.log('une erreur est survenue');

          // on modifie notre état pour indiquer qu'une erreur est survenue
          setError(true);
        },
      );
  }, []);

  return (
    <div className="app">
      {hasError && <Error />}
      {!hasError && (
        <>
          {
            // un fragment s'utilise si le jsx retourné à plus
            // d'un élément de premier niveau
          }
          {loading && <Spinner />}
          {!loading && (
          <>
            <Header categories={categories} />
            <Switch>
              {
            // On souhaite générer de manière dynamique une route par catégorie,
            // Donc autant de route que de catégorie.
            // On va ainsi réaliser un map sur les catégories pour générer une route dont le path
            // correspond à la propriété route de chacune des catégories.
            // Dans chacune de ces routes, on va récupérer seulement les articles
            // de la catégorie correspondante grâce au sélecteur getPostsByCategory.
            // On pourra finalement passer ce tableau filtré à notre composant posts.
            categories.map(
              (category) => {
                const filteredPosts = getPostsByCategory(posts, category.label);
                return (
                  <Route key={category.route} path={category.route} exact>
                    <Posts posts={filteredPosts} categoryName={category.label} />
                  </Route>
                );
              },
            )
          }
              {
            // Ici, on va rediriger /jquery vers /autre.
            // Utile pour une route qui a existé mais qui
            // n'existe plus. */
            }
              {/* On prévoit la route pour le détail de nos articles */}
              <Route path="/post/:slug">
                <Single posts={posts} />
              </Route>
              <Redirect from="/jquery" to="/autre" />
              <Route>
                <NotFound />
              </Route>
            </Switch>
            <Footer />
          </>
          )}
        </>
      )}
    </div>
  );
};

// == Export
export default App;
