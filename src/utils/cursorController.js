const moveCursorToEnd = (contentDiv) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(contentDiv);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  contentDiv.focus();
};
export { moveCursorToEnd };
