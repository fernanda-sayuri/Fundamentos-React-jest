import './styles.css';

export const PostCard = ({title, cover, body, id}) => {

    return (
        <div>
            <div className="post" key={id}>
                <img src={cover} alt={title} />
                <div className="post-content">
                    <h2>{title} {id}</h2>
                    <p>{body}</p>
                </div>
            </div>
        </div>
    )
}