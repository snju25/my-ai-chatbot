import { TypeAnimation } from"react-type-animation";
import { Box } from"@mui/material";

const TypingAnim = () => {
  return (
    <Box sx={{fontSize: { xs: "30px", sm: "40px", md: "50px", lg: "60px" },
        color: "white",
        display: "inline-block",
        textShadow: "1px1px20px #000",
      }}
    ><TypeAnimation
        sequence={[
          'Chat with Your Own AI ',
          1000,
          'Built with OpenAI 🤖 ',
          2000,
          'Your own customised chatGPT 💻',
          1500,
        ]}
        speed={50}
        repeat={Infinity}
      /></Box>
  );
};

export default TypingAnim;
