/* eslint-disable react/prop-types */
import Block from "../Components/Block";

const Blocks = ({ handleChange, blocks, setBlocks, setSelectedBlock }) => {
  return (
    <div className="blocks-container">
      {blocks.map((block, index) => (
        <Block
          key={index}
          blocks={blocks}
          block={block}
          setBlocks={setBlocks}
          index={index}
          handleChange={handleChange}
          setSelectedBlock={setSelectedBlock}
        />
      ))}
    </div>
  );
};

export default Blocks;
