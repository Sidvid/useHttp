import React, { useEffect } from 'react';
import './style.css';
import useHttp from './hook';

export default function App() {
  const todo = useHttp();
  const post = useHttp();
  useEffect(() => {
    todo.hitServer('https://jsonplaceholder.typicode.com/posts');
  }, []);
  useEffect(() => {
    post.hitServer('https://jsonplaceholder.typicode.com/users');
  }, []);
  console.log('=>', todo.state);
  console.log('!!!', post.state);
  return <div>useHttp demo</div>;
}
