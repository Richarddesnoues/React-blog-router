import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import './single.scss';

// Notre composant récupère l'ensemble des posts
// On lui laisse la responsabilité de récupérer la bonne
const Single = ({ posts }) => {
  // on utilise le hook useParams pour récupérer 
  // le paramètre slug de la route qui a matché (celle dans laquelle on est)
  // pour mémoire on avait défini : '/post/:slug' comme path.
  const { slug } = useParams();

  // on souhaite récupérer le post dont le slug est le même que le contenu de notre variable slug
  // pour se faire, on utilise la fonction find
  const singlePost = posts.find((post) => (post.slug === slug));

  // Ici, on veut provoquuer un effet de bord lors du montage du composant
  // On utilise donc le deuxième paramètre [] pour indiquer
  // que cet effet ne doit se produire qu'au premier rendu.
  // Ici, on met à jour le title (API DOM) de la page
  // avec le titre de l'article
  useEffect(
    () => {
      document.title = singlePost.title;
    },
    [],
  );

  console.log(posts);

  return (
    <div className="single">
      <h2 className="single__title">{singlePost.title}</h2>
      <span className="single__category">{singlePost.category}</span>
      <div className="single__content">
        {singlePost.content}
      </div>
    </div>
  );
};

Single.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Single;
