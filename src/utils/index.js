/* eslint-disable import/prefer-default-export */

// Ici, on crée un sélecteur qui nous permet de récupérer seulement
// les post d'une catégorie donnée
export const getPostsByCategory = (posts, categoryName) => {
  if (categoryName === 'Accueil') {
    return posts;
  }

  // Ici, on ne garde que les posts dont le nom de la catégorie correspond
  const filteredPostsList = posts.filter((post) => post.category === categoryName);

  return filteredPostsList;
};
