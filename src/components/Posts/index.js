import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Post from 'src/components/Post';

import './posts.scss';

const Posts = ({ posts, categoryName }) => {
  // Ici, on met à jour le titre du document lorsque
  // la liste de posts est montée
  useEffect(
    () => {
      document.title = categoryName;
    },
    [],
  );

  return (
    <div className="posts">
      <h1 className="posts__title">Dev of thrones</h1>
      <div className="posts__list">
        {
        // Ici, je souhaite passer au composant Post toutes les propriétés
        // de mon objet post.
        // Cela équivaut à :
        // <Post key={post.id} id={post.id} title={post.title}  category={post.category} etc. />
        posts.map((post) => (<Post key={post.id} {...post} />))
      }
      </div>
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  categoryName: PropTypes.string.isRequired,}

  export default Posts