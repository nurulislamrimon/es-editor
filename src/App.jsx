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
  const [selectedBlock, setSelectedBlock] = useState(0);

  // Handle changes in text blocks
  const handleChange = (index, event) => {
    const newBlocks = [...blocks];
    newBlocks[index].data.text = event.target.value;
    setBlocks(newBlocks);
  };

  const applyFormatting = (format) => {
    document.execCommand(format, false, null);
  };

  return (
    <div className="es--editor-container">
      <Toolbar
        selectedBlock={selectedBlock}
        setBlocks={setBlocks}
        applyFormatting={applyFormatting}
      />
      <Blocks
        blocks={blocks}
        setBlocks={setBlocks}
        handleChange={handleChange}
        setSelectedBlock={setSelectedBlock}
      />
      <button onClick={() => console.log(blocks)}>Submit</button>
    </div>
  );
};

export default App;
