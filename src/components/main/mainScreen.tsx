import { useEffect, useState } from "react";
import axios from 'axios'
import { postType } from "../../types/postType";
import PostItem  from "../postItem/postItem";
import styles from './mainScreen.module.scss'
import MoreButton from "../moreButton/moreButton";
import Loading from "../loading/loading";
import { buttonInit, fetchingStock } from "../../utils/const";

export default function Main() {
  const [posts, setPosts] = useState<postType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)

  useEffect(() => {
    if (isFetching) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
      .then(response => {
        if (response.status !== 200) {
            throw new Error(response.statusText)
        }
        console.log(response.status, response.statusText)
        setPosts([...posts, ...response.data])
        setCurrentPage(prevState => prevState + 1)
        setTotalCount(response.headers['x-total-count'])
      })
      .finally(() => {
        setIsFetching(false)
      })
      .catch((err) => console.log(err))
    }
  }, [isFetching])


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [currentPage])

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < fetchingStock && currentPage <= buttonInit) {
      setIsFetching(true)
    }
  }

  const moreButtomHandler = () => {
    if (posts.length < totalCount) {
      setIsFetching(true)
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
      {isFetching ? <Loading /> : null}
      {currentPage > buttonInit && posts.length <= totalCount ? <MoreButton onClick={moreButtomHandler}/> : null}
    </section>
  );
}

