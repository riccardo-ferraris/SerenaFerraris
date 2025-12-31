import LandingAudienceSection from "../components/LandingAudienceSection";
import LandingHero from "../components/LandingHero";
import LandingPhilosophySection from "../components/LandingPhilosophySection";
import LandingWhatYouGetSection from "../components/LandingWhatYouGetSection";
import LandingAboutSection from "../components/LandingAboutSection";
import LandingDownloadSection from "../components/LandingDownloadSection";

const LandingPage = () => {
  return (
    <>
      <LandingHero />
      <LandingAudienceSection />
      <LandingWhatYouGetSection />
      <LandingPhilosophySection />
      <LandingAboutSection />
      <LandingDownloadSection />
    </>
  );
};

export default LandingPage;
