/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function getUseStrictComments(path) {
  const allComments = path.hub.file.ast.comments;
  if (path.node.leadingComments) {
    // Babel AST includes comments.
    const useStrictComments = path.node.leadingComments.filter(comment => comment.value.includes('use strict'));
    return useStrictComments;
  }
  // In Hermes AST we need to find the comments by range.
  const useStrictComments = [];
  let line = path.node.loc.start.line;
  let i = allComments.length - 1;
  while (i >= 0 && allComments[i].loc.end.line >= line) {
    i--;
  }
  while (i >= 0 && allComments[i].loc.end.line === line - 1) {
    line = allComments[i].loc.start.line;
    if (allComments[i].value.includes('use strict')) {
      useStrictComments.unshift(allComments[i]);
    }
    i--;
  }
  return useStrictComments;
}

module.exports = getUseStrictComments;

