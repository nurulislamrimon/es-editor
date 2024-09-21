/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const NewBlock = ({
  block,
  index,
  handleChange,
  removeBlock,
  focusNextBlock,
  focusPrevBlock,
}) => {
  const inputRef = useRef(null);

  // Function to auto-resize textarea height
  const autoResize = () => {
    const textarea = inputRef.current;
    textarea.style.height = "auto"; // Reset height to auto to get accurate scrollHeight
    textarea.style.height = textarea.scrollHeight + "px"; // Set height based on content
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { selectionStart, selectionEnd } = inputRef.current;

      // Check if the cursor is at the start or end of the block
      const isAtStart = selectionStart === 0;
      const isAtEnd = selectionEnd === block.data.text.length;

      // Move to next block on right arrow if at the end
      if (e.key === "ArrowRight" && isAtEnd) {
        focusNextBlock(index);
      }

      // Move to previous block on left arrow if at the start
      if (e.key === "ArrowLeft" && isAtStart) {
        focusPrevBlock(index);
      }

      // Remove empty block on backspace
      if (e.key === "Backspace" && !block.data.text) {
        removeBlock(index);
        e.preventDefault();
      }
    };

    const textarea = inputRef.current;
    textarea.addEventListener("keydown", handleKeyDown);
    textarea.addEventListener("input", autoResize); // Trigger auto-resize on input

    // Auto-resize initially if there's already content
    autoResize();

    return () => {
      textarea.removeEventListener("keydown", handleKeyDown);
      textarea.removeEventListener("input", autoResize);
    };
  }, [block.data.text, index, removeBlock, focusNextBlock, focusPrevBlock]);

  useEffect(() => {
    if (block.shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [block.shouldFocus]);

  return (
    <textarea
      ref={inputRef}
      value={block.data.text}
      onChange={(e) => handleChange(index, e)}
      placeholder={
        block.type === "paragraph"
          ? "Write your text..."
          : `Write your ${block.type}...`
      }
      className={`${block.type}-${block.data.level}-block`}
    />
  );
};

export default NewBlock;
