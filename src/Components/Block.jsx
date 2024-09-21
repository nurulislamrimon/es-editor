/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import {
  focusNextBlock,
  focusPrevBlock,
  removeBlock,
} from "../utils/blocksController";
import { handleChange } from "../utils/changeHandlers";

const Block = ({ blocks, block, setBlocks, index, setSelectedBlock }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const contentDiv = contentRef.current;
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      const isAtStart =
        range.startOffset === 0 &&
        range.startContainer === contentDiv.firstChild;
      const isAtEnd =
        range.endOffset === contentDiv.textContent.length &&
        range.endContainer === contentDiv.lastChild;

      // Arrow navigation
      if (e.key === "ArrowRight" && isAtEnd) {
        focusNextBlock(index);
      } else if (e.key === "ArrowLeft" && isAtStart) {
        focusPrevBlock(index);
      }

      // Focus logic for Delete and Backspace
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

    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection.isCollapsed) {
        setSelectedBlock(index);
      }
    };

    const contentDiv = contentRef.current;
    if (contentDiv) {
      contentDiv.addEventListener("keydown", handleKeyDown);
      contentDiv.addEventListener("mouseup", handleMouseUp);

      return () => {
        contentDiv.removeEventListener("keydown", handleKeyDown);
        contentDiv.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [index, setBlocks, setSelectedBlock]);

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

  useEffect(() => {
    const contentDiv = contentRef.current;
    if (block.shouldFocus && contentDiv) {
      contentDiv.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentDiv);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [block.shouldFocus]);

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
