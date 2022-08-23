export const PostCard = ({title, cover, body, id}) => {

    return (
        <div>
            <div className="post" key={id}>
                <img src={cover} alt={title} />
                <div key={id} className="content">
                <h2>{title}</h2>
                <p>{body}</p>
                </div>
            </div>
        </div>
    )
}