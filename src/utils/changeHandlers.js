// Handle changes in text blocks
const handleChange = (index, event, setBlocks) => {
  setBlocks((blocks) => {
    const newBlocks = [...blocks];
    newBlocks[index].data.text = event.target.value;
    return newBlocks;
  });
};

const applyFormatting = (format) => {
  document.execCommand(format, false, null);
};

export { handleChange, applyFormatting };
