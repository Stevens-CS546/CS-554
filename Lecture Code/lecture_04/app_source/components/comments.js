const CommentContainer = React.createClass({
    getInitialState() {
        return {
            comments: [],
            newComment: "",
            commenterName: "",
            error: ""
        }
    },

    loadComments() {
        return $.get("/comments");
    },

    addComment(commenter, comment) {
        return $.ajax({
            url: "/comments",
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                comment: {
                    commenter, comment
                }
            })
        });
    },

    componentDidMount() {
        this.loadComments().then((commentList) => {
            this.setState({ comments: commentList });
        })
    },

    handleCommentChange(newText) {
        this.setState({ newComment: newText });
    },

    handleCommentSubmission(newComment, newCommenterName) {
        if (!newComment) {
            this.setState({ error: "No comment provided" });
            return;
        };

        if (!newCommenterName) {
            this.setState({ error: "No comment name provided" });
            return;
        };

        let commentList = this.state.comments;
        let currentlyMatchingComment = commentList.filter(commentData => {
            return commentData.comment === newComment && commentData.commenter === newCommenterName;
        });

        if (currentlyMatchingComment.length > 0) {
            this.setState({ error: "No spamming allowed" });
            return;
        }

        this.setState({ error: "" });

        this.setState({
            newComment: ""
        });

        this.addComment(newCommenterName, newComment).then((newCommentObject) => {
            this.setState({
                comments: this.state.comments.concat(newCommentObject),
            });
        }, (error) => {
            this.setState({ error: JSON.stringify(error) });
        });
    },

    handleCommentNameChange(newCommenterName) {
        if (!newCommenterName) return;

        this.setState({
            commenterName: newCommenterName
        });
    },

    render() {
        return <div>
            <CommentList comments={this.state.comments} />
            <CommentForm
                commenterName={this.state.commenterName}
                comment={this.state.newComment}
                onCommentChange={this.handleCommentChange}
                onCommentSubmit={this.handleCommentSubmission}
                onCommenterNameChange={this.handleCommentNameChange}
                formError={this.state.error}
            />
        </div>
    }
})