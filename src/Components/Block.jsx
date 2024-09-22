/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { handleChange } from "../utils/changeHandlers";
import {
  removeAndSwitchBlockBackspaceDeleteEvent,
  switchToPrevNextBlockEvent,
} from "../utils/eventListeners";
import { moveCursorToEndAndFocus } from "../utils/cursorController";

const Block = ({ blocks, block, setBlocks, index }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // switch blocks by pressing left and right arrow key
      switchToPrevNextBlockEvent({ e, index, contentRef });
      // remove and switch block while backspace or delete button pressed in an empty block
      removeAndSwitchBlockBackspaceDeleteEvent({
        e,
        contentDiv,
        index,
        blocks,
        setBlocks,
      });
    };

    const contentDiv = contentRef.current;
    if (contentDiv) {
      contentDiv.addEventListener("keydown", handleKeyDown);

      return () => {
        contentDiv.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [index, setBlocks, blocks]);

  const handleInput = () => {
    const newText = contentRef.current.innerHTML;
    handleChange(index, { target: { value: newText } }, setBlocks);

    setTimeout(() => {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);
  };

  // auto focus at the new element while created
  useEffect(() => {
    const contentDiv = contentRef.current;
    if (block.shouldFocus && contentDiv) {
      moveCursorToEndAndFocus(contentDiv);
    }
  }, [block.shouldFocus]);

  // create elements
  const blockElements = {
    paragraph: "p",
    header1: "h1",
    header2: "h2",
  };

  const BlockElement =
    (block.type === "header" && blockElements[block.type + block.data.level]) ||
    "p";

  return (
    <BlockElement
      ref={contentRef}
      contentEditable
      onInput={handleInput}
      data-index={index}
      dangerouslySetInnerHTML={{ __html: block.data.text }}
    />
  );
};

export default Block;
