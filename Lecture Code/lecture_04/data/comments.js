const Promise = require('bluebird');

const commentList = [
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
    }];

let exportedMethods = {
    getAllComments() {
        return Promise.resolve(commentList);
    },
    addComment(comment) {
        commentList.push(comment);
        
        return Promise.resolve(comment);
    }
}

module.exports = exportedMethods;
