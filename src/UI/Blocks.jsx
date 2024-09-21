/* eslint-disable react/prop-types */
import { useRef } from "react";
import Block from "../Components/Block";
import { moveCursorToEnd } from "../utils/cursorController";

const Blocks = ({ blocks, setBlocks, setSelectedBlock }) => {
  const containerRef = useRef(null);

  const focusLastBlockWhileEmpty = (event) => {
    // Only proceed if the click target is the container itself (empty space)
    if (event.target === containerRef.current) {
      const lastBlock = containerRef.current?.lastElementChild;

      if (lastBlock) {
        lastBlock.focus();
        moveCursorToEnd(lastBlock);
      }
    }
  };

  return (
    <div
      className="blocks-container"
      ref={containerRef}
      onClick={focusLastBlockWhileEmpty}
    >
      {blocks.map((block, index) => (
        <Block
          key={index}
          blocks={blocks}
          block={block}
          setBlocks={setBlocks}
          index={index}
          setSelectedBlock={setSelectedBlock}
        />
      ))}
    </div>
  );
};

export default Blocks;
