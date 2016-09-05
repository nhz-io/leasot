'use strict';
var commentsUtil = require('../utils/comments');

module.exports = function (params) {
    params = params || {};
    var listItemRegex = /\s*(?:[*+-]|[0-9]+\.)\s+(.+)$/

    return function parse(contents, file) {
        var comments = [];

        contents.split('\n').forEach(function (line, index) {
            var match = listItemRegex.exec(line);
            if (match && match[1]) {
                match = [1, 'todo', '', match[1]]
                var comment = commentsUtil.prepareComment(match, index + 1, file);

                if (comment) {
                    comments.push(comment)
                }
            }
        });

        return comments;
    };
};
