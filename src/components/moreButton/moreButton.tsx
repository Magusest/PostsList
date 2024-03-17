import styles from './moreButton.module.scss'

type Props = {
    onClick: () => void;
}

export default function MoreButton({onClick}: Props) {
    return(
        <button 
            className={`${styles.button}`}
            onClick={onClick}
        >Показать еще</button>
    )
}