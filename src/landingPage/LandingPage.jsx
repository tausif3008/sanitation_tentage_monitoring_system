import UncontrolledCarouselLogin from "./CarouselControlLogin";
import MessageContainer from "./MessageContainer";
import Statistics from "./Statistics";
import SupportAndInfo from "./SupportAndInfo";

const LandingPage = () => {
  document.title = "KUMBH MELA 2025 - Monitoring System";

  return (
    <div className="relative z-10 w-full m-auto">
      <UncontrolledCarouselLogin></UncontrolledCarouselLogin>
      <MessageContainer></MessageContainer>
      <Statistics></Statistics>
      <SupportAndInfo></SupportAndInfo>
    </div>
  );
};

export default LandingPage;
