import {
  focusNextBlock,
  focusPrevBlock,
  removeBlock,
} from "./blocksController";

// switch block by pressing left and right arrow key
const switchToPrevNextBlockEvent = ({ e, index, contentRef }) => {
  const contentDiv = contentRef.current;
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  const isAtStart =
    range.startOffset === 0 && range.startContainer === contentDiv.firstChild;
  const isAtEnd =
    range.endOffset === contentDiv.textContent.length &&
    range.endContainer === contentDiv.lastChild;

  // Arrow navigation
  if (e.key === "ArrowRight" && isAtEnd) {
    focusNextBlock(index);
  } else if (e.key === "ArrowLeft" && isAtStart) {
    focusPrevBlock(index);
  }
};

// switch block while a block is empty and backspace or delete key pressed
const removeAndSwitchBlockBackspaceDeleteEvent = ({
  e,
  contentDiv,
  index,
  blocks,
  setBlocks,
}) => {
  if (e.key === "Backspace" && contentDiv.textContent.trim() === "") {
    removeBlock({ index, setBlocks });
    e.preventDefault();
  } else if (e.key === "Delete" && index < blocks.length - 1) {
    focusNextBlock(index);
  }

  // Move focus to previous block on Backspace
  if (e.key === "Backspace" && contentDiv.textContent.trim() === "") {
    focusNextBlock(index);
    e.preventDefault();
  }
};

export { switchToPrevNextBlockEvent, removeAndSwitchBlockBackspaceDeleteEvent };
