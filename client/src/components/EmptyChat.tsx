import Lottie from "react-lottie";
import animationData from "../assets/chat_animation.json";

export default function EmptyChat() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6">
      <div className="lg:max-w-[40rem] xl:max-w-[44rem] 2xl:max-w-[48rem] flex flex-col">
        <Lottie height={150} width={150} options={defaultOptions} />
        <h1 className="text-3xl lg:text-4xl font-bold text-center">
          Analyze Your Code with AI
        </h1>
        <p className="text-base md:text-lg text-gray-600 text-center mt-2">
          Paste your JavaScript or TypeScript code below, and let AI provide
          insights, suggestions, and improvements in seconds.
        </p>
      </div>
    </div>
  );
}
