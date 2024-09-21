/* eslint-disable react/prop-types */
import NewBlock from "../Components/NewBlock";

const Blocks = ({ blocks, handleChange, removeBlock }) => {
  const focusNextBlock = (index) => {
    const nextElement = document.querySelector(
      `.block:nth-child(${index + 2}) textarea`
    );
    if (nextElement) {
      nextElement.focus();
    }
  };

  const focusPrevBlock = (index) => {
    const prevElement = document.querySelector(
      `.block:nth-child(${index}) textarea`
    );
    if (prevElement) {
      prevElement.focus();
    }
  };

  return (
    <div className="blocks-container">
      {blocks.map((block, index) => (
        <div key={index} className="block">
          <NewBlock
            block={block}
            index={index}
            handleChange={handleChange}
            removeBlock={removeBlock}
            focusNextBlock={focusNextBlock}
            focusPrevBlock={focusPrevBlock}
          />
        </div>
      ))}
    </div>
  );
};

export default Blocks;
