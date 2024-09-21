// =========================================
// add block
// =========================================
const addNewBlock = ({ e, setBlocks }) => {
  const blockType = e.target.value;
  let newBlock;

  if (blockType === "h1" || blockType === "h2") {
    newBlock = {
      type: "header",
      data: {
        text: ``,
        level: blockType === "h1" ? 1 : 2,
      },
      shouldFocus: true, // Set focus flag
    };
  } else if (blockType === "p") {
    newBlock = {
      type: "paragraph",
      data: { text: "" },
      shouldFocus: true, // Set focus flag
    };
  }

  if (newBlock) {
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  }
};

// =========================================
// remove block
// =========================================

const removeBlock = ({ index, setBlocks }) => {
  setBlocks((blocks) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    return newBlocks;
  });
};

// =========================================
// focus next block
// =========================================
const focusNextBlock = (index) => {
  const nextElement = document.querySelector(
    `.blocks-container > :nth-child(${index + 2})`
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
    `.blocks-container > :nth-child(${index})`
  );
  if (prevElement) {
    prevElement.focus();
  }
};

export { addNewBlock, removeBlock, focusNextBlock, focusPrevBlock };
