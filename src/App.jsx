import "./global.css";
import useBlocks from "./hooks/useBlocks";
import Blocks from "./UI/Blocks";
import Toolbar from "./UI/Toolbar";

const App = () => {
  const { blocks, setBlocks } = useBlocks();

  const handleChange = (index, event) => {
    const newContent = event.target.value;

    // Ensure you're accessing the correct node
    const contentDiv = document.querySelector(
      `.editor-content[data-index="${index}"]`
    );

    if (contentDiv) {
      const range = document.createRange();
      range.selectNodeContents(contentDiv); // Ensure contentDiv is a valid node
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      console.error("Content div not found for index:", index);
    }

    // Update the block with new content
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[index].data.text = newContent;
      return newBlocks;
    });
  };

  const applyFormatting = (format) => {
    document.execCommand(format, false, null); // Apply text formatting
  };

  return (
    <div className="es--editor-container">
      <Toolbar applyFormatting={applyFormatting} />
      <Blocks handleChange={handleChange} />
      <button onClick={() => console.log(blocks)}>Submit</button>
    </div>
  );
};

export default App;
