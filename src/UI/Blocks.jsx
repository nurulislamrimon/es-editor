/* eslint-disable react/prop-types */
import Block from "../Components/Block";
import useBlocks from "../hooks/useBlocks";

const Blocks = ({ handleChange }) => {
  const { blocks } = useBlocks();

  return (
    <div className="blocks-container">
      {blocks.map((block, index) => (
        <Block
          key={index}
          block={block}
          index={index}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default Blocks;
