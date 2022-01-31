# useState

C'est le hook d'état. Il permet de définir une données à stocker dans le state ; de lui donner une valeur initiale, ainsi que le moyen de la lire et de la mettre à jour.

```js

// ...

import { useState } from 'react';

// ...

// utilisation, dans un composant fonctionnel :
const [ maDonnee, setMaDonnee ] = useState(valeurInitialeDeMaDonnee);
```

Ainsi :

- on pourra lire le contenu de cette 'partie du state' en consultant la variable maDonnee,
- on pourra modifier cette 'partie du state' en appellant la fonction setMaDonnee (par exemple : `setMaDonnee('nouvelle valeur');`

A bien comprendre :

Le fait de mettre à jour le state d'un composant provoque un nouveau rendu cde ce dernier.

A lire :
- https://fr.reactjs.org/docs/hooks-state.html

# useEffect

C'est le hook d'effet. Il permet de définir un effet de bord à lancer après le rendu d'un composant. On appelle effet de bord toute action non ointimement liée au fonctionnement de React. Par exemple : aller récupérer des informations depuis une API distante, accèder au DOM).

```js
// ...

import { useEffect } from 'react';

// ...

// utilisation, dans un composant fonctionnel :
// Cas classique 1 (lancer l'effet à chaque rendu du composant):
useEffect(
    () => {
        // ici, on traite l'effet de bord.
    }
)
// Cas classique 2 (lancer l'effet à uniquement au premier rendu du composant):
useEffect(
    () => {
        // ici, on traite l'effet de bord.
    },
    [],// <- on ajoute dans ce cas ce second paramètre
)

```
 
# axios

Axios est une librairie permettant d'effectuer des requêtes HTTP en javascript. Avec axios, on traite de l'ascynchrone.

## Installation

`yarn add axios`

## Utilisation
```js 

axios.get('url du end point de l\'api')
    // .then permet de définir le callback à exécuter en cas de succès
    .then(
        (response) => {
            // ici, le traitement en cas de succès
            // on va pouvoir travailler sur les données
            // reçues depuis l'API
        },
    )
    // .catch permet de définir le callback à exécuter en cas d'erreur
    .catch(
        (error) => {
            // ici, le traitement en cas d'erreur
            // si besoin, on pourrait accéder à l'erreur (error)
        },
    )
    // .catch permet de définir le callback à exécuter à la suite du then ou du catch selon si succès ou échec
    .finally(
        (response) => {
            // ici, le traitement commun en cas de succès ou d'échec
        }
    );
```

# les vues conditionnelles (&&)

On appelle vue conditionnelle le fait de rendre une portion de JSX en fonction de la valeur d'une variable de type booléen.

Dans le principe, c'est comme si on faisait :

si (maVariable === vrai){
    retourner telle postion de l'UI
}

Au niveau de la syntaxe, on utilise :

```js
{maVariable && <div>le JSX à rendre si maVariable est vrai</div>}
```

On retrouve donc également :

```js
{!maVariable && <div>le JSX à rendre si maVariable est fausse</div>}
```

# les composants contrôlés

Utilité : avoir une propriété du state et le contenu d'un champ de formulaire toujours synchronisés.

Pour ce faire, il faut travailler dans 2 directions :
- forcer à tout moment la valeur du champ (souvent grâce à value={donneDuState}),
- pouvoir répercuter les modification faites sur le champ dans le state (souvent grâce en écoutant l'évènement onChange.)

```js

const Field = () => {

    const [maValue, setMaValue] = useState('');

    return (
        <input
          type="text"
          value={maValue}
          onChange={
              (event) => {
                  setMaValue(event.target.value);
                }
          }
        />
    );
};

```
 
# le fonctionnement du state (quand on a un tableau on le remplace, on ne le modifie pas)

Si on souhaite modifier un tableau ou un objet dans le state, on doit procéder à un remplacement plutôt qu'à une modification effective.

exemple :

```js

const [elements, setElements] = useState([]);

// exemple de l'ajout d'un élément
// plutôt que :
setElements(
    elements.push('nouvel élément'),
);

//on fera :
setElements(
   [...elements, 'nouvel élément'],
);

```

# fragment

Quand on renvoie du JSX, il est indispensable d'avoir un seul élément de premier niveau.

Le fragment : <></> permet de résoudre cette problématique si on souhaite retourner plus d'un élément de premier niveau.

Par exemple, si on veut retourner :

```html
<header>
<main>
<footer>
```

Deux possibilité :

La première, utiliser une balise neutre pour englober le tout :

```html
<div>
    <header>
    <main>
    <footer>
</div>
```

Problème, on a un div en plus qui ne sert pas à grand chose.

La seconde, utiliser un fragment :

```html
<>
    <header>
    <main>
    <footer>
</>
```
