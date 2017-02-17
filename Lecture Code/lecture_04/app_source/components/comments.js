const CommentContainer = React.createClass({
    getInitialState() {
        return {
            comments: [
                {
                    comment: "Hello",
                    commenter: "Phil"
                },
                {
                    comment: "This is awkward",
                    commenter: "Phil"
                },
                {
                    comment: "You're all staring at me",
                    commenter: "Phil"
                }],
            newComment: "",
            commenterName: ""
        }
    },

    handleCommentChange(newText) {
        this.setState({ newComment: newText });
    },

    handleCommentSubmission(newComment, newCommenterName) {
        if (!newComment) return;
        if (!newCommenterName) return;

        let commentList = this.state.comments;
        let currentlyMatchingComment = commentList.filter(commentData => {
            return commentData.comment === newComment && commentData.commenter === newCommenterName;
        });

        if(currentlyMatchingComment.length > 0) {
            alert("Stop spamming");
            return;
        }

        let newCommentObject = {
            commenter: newCommenterName,
            comment: newComment
        };

        this.setState({
            comments: this.state.comments.concat(newCommentObject),
            newComment: ""
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
            />
        </div>
    }
})