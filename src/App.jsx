import "./global.css";
import { useState } from "react";
import Blocks from "./UI/Blocks";
import Toolbar from "./UI/Toolbar";

// Define initial block structure
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
      text: "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓",
    },
  },
];

const App = () => {
  const [blocks, setBlocks] = useState(initialBlocks);

  // Handle changes in text blocks
  const handleChange = (index, event) => {
    const newBlocks = [...blocks];
    newBlocks[index].data.text = event.target.value;
    setBlocks(newBlocks);
  };

  // Remove block if it's empty and backspace is pressed
  const removeBlock = (index) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  // Add new block (header or paragraph) and focus it
  const addBlock = (event) => {
    const blockType = event.target.value;
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

  return (
    <div className="es--editor-container">
      <Toolbar addBlock={addBlock} />
      <Blocks
        blocks={blocks}
        handleChange={handleChange}
        removeBlock={removeBlock}
      />
      <button onClick={() => console.log(blocks)}>Submit</button>
    </div>
  );
};

export default App;
