import { postType } from '../../types/postType'
import styles from './postItem.module.scss'

type Props = {
    post: postType;
}

function PostItem({post}: Props) {
    const {id, title, body} = post;
    return(
       <div className={`${styles.postItem}`}>
            <h2>{title}</h2>
            <p>{body}</p>
            <div>{id}</div>
       </div> 
    )
}

export default PostItem