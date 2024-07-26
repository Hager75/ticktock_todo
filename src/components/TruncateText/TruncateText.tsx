import { Box, Tooltip } from "@mui/material";

interface TruncateTextProps {
  text: string;
  length?: number;
}

const TruncateText: React.FC<TruncateTextProps> = ({ text, length = 20 }) => {
  const truncatedText = () => text?.slice(0, length - 1) + "…";

  return (
    <Box component="span">
      {text.length > length ? (
          <Tooltip title={text} placement="top">
            <span>{truncatedText()}</span>
          </Tooltip>
      ) : (
        text
      )}
    </Box>
  );
};

export default TruncateText;
