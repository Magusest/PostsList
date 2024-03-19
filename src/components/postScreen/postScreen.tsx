import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { postType } from "../../types/postType";
import styles from './postScreen.module.scss'
import Loading from "../loading/loading";

export default function PostScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {id} = useParams();
    const [post, setPost] = useState<postType>()

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
            setPost(response.data)
            setIsLoading(true)
        })
        .finally(() => setIsLoading(false))

    }, [])

    return(
        <section className={`${styles.postScreen}`}>
            {isLoading 
                ? <Loading />
                : 
                <>
                    <Link to={'/'}>
                        <p className={`${styles.linkBack}`}>Вернуться к списку постов</p>
                    </Link>
                    <div className={`${styles.postCard}`}>
                        <h1 className={`${styles.title}`}>{post?.title}</h1>
                        <p className={`${styles.text}`}>{post?.body}</p>
                        <p className={`${styles.postNumber}`}>Номер поста: {post?.id}</p>
                    </div>
                </>
            }
        </section>
        
    )
}