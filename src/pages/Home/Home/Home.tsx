
import Banner from "../Banner/Banner";
import FAQ from "../FAQ/FAQ";
import Featured from "../Featured/Featured";
import { useGetAllPhonesQuery } from "@/redux/features/phone/phoneManagementApi";
import TodayDeals from "@/components/home/todayDeals";
import CompanyFeatures from "@/components/home/companyFeatures";
import CTA from "../CTA";
import WhyChoose from "@/pages/WhyChoose/WhyChoose";
import Review from "../Review/Review";

const Home = () => {
  const { data: phoneData } = useGetAllPhonesQuery({});
  
  return (
    <>
      <div>
        <Banner />
        <Featured />
        <TodayDeals data={{ data: phoneData?.data ?? [] }} />
        <CompanyFeatures />
        <WhyChoose/>
        <Review/>
        <FAQ />
        <CTA/>
      </div>
    </>
  );
};

export default Home;
