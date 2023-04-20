import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './components/NotFound';

const generatePage = name => {
  if (name) name = name[0].toUpperCase() + name.slice(1);
  const component = () => require(`./pages/${name}`).default;

  //   console.log(component());

  try {
    return React.createElement(component());
  } catch (e) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, slug } = useParams();

  let name = '';

  if (page) {
    name = slug ? `${page}/[slug]` : `${page}`;
  }
  return generatePage(name);
};

export default PageRender;
