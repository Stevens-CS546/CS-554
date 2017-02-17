const CommentList = ({comments}) => {
    return <ul className="list-unstyled">
        {comments.map(commentData => <li>[{commentData.commenter}]: {commentData.comment}</li>)}
    </ul>;
}