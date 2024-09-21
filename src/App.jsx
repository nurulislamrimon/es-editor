import "./global.css";
import { useState } from "react";
import Blocks from "./UI/Blocks";
import Toolbar from "./UI/Toolbar";

// Define initial block structure
const initialBlocks = [
  {
    type: "paragraph",
    data: {
      text: "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓",
    },
  },
  {
    type: "header",
    data: {
      text: "Key features",
      level: 1,
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

  // Add new block (e.g., header or paragraph)
  const addBlock = (event) => {
    const blockType = event.target.value;

    // Handle inline styling
    if (
      blockType === "bold" ||
      blockType === "italic" ||
      blockType === "underline"
    ) {
      document.execCommand(blockType, false);
      return;
    }

    let newBlock;
    if (blockType === "h1" || blockType === "h2") {
      newBlock = {
        type: "header",
        data: {
          text: "",
          level: blockType === "h1" ? 1 : 2,
        },
      };
    } else if (blockType === "p") {
      newBlock = {
        type: "paragraph",
        data: { text: "" },
      };
    }

    if (newBlock) {
      setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    }
  };

  // Save data to backend
  const handleSubmit = async () => {
    console.log(blocks);
  };

  return (
    <div className="es--editor-container">
      <Toolbar addBlock={addBlock} />
      <Blocks
        blocks={blocks}
        handleChange={handleChange}
        addBlock={addBlock}
        handleSubmit={handleSubmit}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
