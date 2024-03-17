import { useEffect, useState } from "react";
import axios from 'axios'
import { postType } from "../../types/postType";
import PostItem  from "../postItem/postItem";
import styles from './main.module.scss'
import MoreButton from "../moreButton/moreButton";

const fetchingStock: number = 100;
const buttonInit = 5


export default function Main() {
  const [posts, setPosts] = useState<postType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [fetching, setFetching] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)

  useEffect(() => {
    if (fetching) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
      .then(response => {
        setPosts([...posts, ...response.data])
        setCurrentPage(prevState => prevState + 1)
        setTotalCount(response.headers['x-total-count'])
      })
      .finally(() => {
        setFetching(false)
      })
    }
  }, [fetching])


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [currentPage])

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < fetchingStock && currentPage <= buttonInit) {
      setFetching(true)
    }
  }

  const moreButtomHandler = () => {
    if (posts.length < totalCount) {
      setFetching(true)
    }
  }

  return (
    <section className={`${styles.app}`}>
      <h1>Список постов</h1>
      <ul>
          {posts.map((post) => (
          <li key={post.id} >
            <PostItem post={post}/>
          </li>))}
      </ul>
      {currentPage >= buttonInit && posts.length <= totalCount ? <MoreButton onClick={moreButtomHandler}/> : null}
    </section>
  );
}

