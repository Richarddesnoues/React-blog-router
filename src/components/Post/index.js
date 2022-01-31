import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
// J'importe le composant link
import { Link } from 'react-router-dom';

import './post.scss';

const Post = ({
  title, category, excerpt, slug,
}) => {
  function createMarkup() {
    // Je nettoie le markup récupéré grâce à DOMPurify
    // Une fois nettoyé, je peux m'en servir pour l'injecté en innerHTML
    const sanitizedExcerpt = DOMPurify.sanitize(excerpt, { ALLOWED_TAGS: ['strong', 'em'] });

    return { __html: sanitizedExcerpt };
  }

  return (
    <Link to={`/post/${slug}`}>
      <article className="post">
        <h2 className="post__title">{title}</h2>
        <span className="post__category">{category}</span>
        <p className="post__excerpt" dangerouslySetInnerHTML={createMarkup()} />
      </article>
    </Link>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Post;
