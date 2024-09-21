import { useState } from "react";

const useBlocks = () => {
  const initialBlocks = [
    {
      type: "header",
      shouldFocus: false,
      data: {
        text: "Key features",
        level: 1,
      },
    },
    {
      type: "paragraph",
      shouldFocus: false,
      data: {
        text: "Hey. Meet the new Editor. Try a demo 🤓",
      },
    },
  ];
  const [blocks, setBlocks] = useState(initialBlocks);
  const [selectedBlock, setSelectedBlock] = useState(0);

  // ===========================================
  //   add new block
  // ===========================================
  const addBlock = (event) => {
    const blockType = event.target.value;

    let newBlock;

    if (blockType === "h1" || blockType === "h2") {
      newBlock = {
        type: "header",
        data: { text: "", level: blockType === "h1" ? 1 : 2 },
        shouldFocus: true,
      };
    } else if (blockType === "p") {
      newBlock = {
        type: "paragraph",
        data: { text: "" },
        shouldFocus: true,
      };
    }

    if (newBlock) {
      setBlocks([...blocks, newBlock]);
    }
  };

  // =========================================
  // remove block
  // =========================================

  const removeBlock = (index) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  // =========================================
  // focus next block
  // =========================================

  const focusNextBlock = (index) => {
    const nextElement = document.querySelector(
      `.block:nth-child(${index + 2}) div`
    );
    if (nextElement) {
      nextElement.focus();
    }
  };

  // =========================================
  // focus previous block
  // =========================================

  const focusPrevBlock = (index) => {
    const prevElement = document.querySelector(
      `.block:nth-child(${index}) div`
    );
    if (prevElement) {
      prevElement.focus();
    }
  };

  return {
    blocks,
    setBlocks,
    selectedBlock,
    setSelectedBlock,

    // functions
    addBlock,
    removeBlock,
    focusNextBlock,
    focusPrevBlock,
  };
};
export default useBlocks;
