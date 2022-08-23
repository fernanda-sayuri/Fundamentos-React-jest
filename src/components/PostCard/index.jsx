export const PostCard = ({title, cover, body, id}) => {

    return (
        <div>
            <div className="post" key={id}>
                <img src={cover} alt={title} />
                <div key={id} className="content">
                <h1>{title}</h1>
                <p>{body}</p>
                </div>
            </div>
        </div>
    )
}