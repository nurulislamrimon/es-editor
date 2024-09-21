/* eslint-disable react/prop-types */
const NewBlock = ({ block, index, handleChange }) => (
  <textarea
    value={block.data.text}
    onChange={(e) => handleChange(index, e)}
    className={`${block.type}-${block.data.level}-block`}
  />
);

const Blocks = ({ blocks, handleChange }) => {
  return (
    <div className="blocks-container">
      {blocks.map((block, index) => (
        <div key={index} className="block">
          {block.type === "paragraph" && (
            <NewBlock block={block} index={index} handleChange={handleChange} />
          )}
          {block.type === "header" && (
            <NewBlock block={block} index={index} handleChange={handleChange} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Blocks;
