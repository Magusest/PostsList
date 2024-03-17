import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { postType } from "../../types/postType";
import styles from './postScreen.module.scss'

export default function PostScreen() {
    const {id} = useParams();
    const [post, setPost] = useState<postType>()

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => setPost(response.data))

    }, [post])

    return(
        <section className={`${styles.postScreen}`}>
            <Link to={'/'}>
                <p className={`${styles.linkBack}`}>Вернуться к списку постов</p>
            </Link>
            <div className={`${styles.postCard}`}>
                <h1 className={`${styles.title}`}>{post?.title}</h1>
                <p className={`${styles.text}`}>{post?.body}</p>
                <p className={`${styles.postNumber}`}>Номер поста: {post?.id}</p>
            </div>
        </section>
    )
}