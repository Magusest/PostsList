import { useEffect, useState } from "react";
import { postType } from "../../types/postType";
import PostItem  from "../postItem/postItem";
import styles from './app.module.scss'



export default function App() {
  const [posts, setPosts] = useState<postType[]>([]);

  const getApiData = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/"
    ).then((response) => response.json());

    setPosts(response);
  };

  useEffect(() => {
    getApiData();
  }, []);
  console.log(posts)
  return (
    <section className={`${styles.app}`}>
      <h1>Список постов</h1>
      <ul>
          {posts.map((post) => (
          <li key={post.id} >
            <PostItem post={post}/>
          </li>))}
      </ul>
    </section>
  );
}

