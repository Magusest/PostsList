import { postType } from '../../types/postType'
import { Link } from 'react-router-dom';
import styles from './postItem.module.scss'

type Props = {
    post: postType;
}

export default function PostItem({post}: Props) {
    const {id, title, body} = post;
    return(
        <Link to={`posts/${id}`}>
            <div className={`${styles.postItem}`}>
                <h2>{title}</h2>
                <p>{body}</p>
                <div>{id}</div>
            </div> 
        </Link>
    )
}