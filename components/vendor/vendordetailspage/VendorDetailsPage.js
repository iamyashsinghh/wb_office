import Header from "@/components/layout.js/Header";
import BreadCrumb from "@/components/miscellaneous/NavigationHeader";
import VendorBasicInfo from "./vendorbasicinfo/VendorBasicInfo";
import { useRouter } from "next/router";
import Policies from "./policy/Policies";
import SimilarVendors from "./similarvendor/SimilarVendor";
import Tabs from "./tabs/Tabs";
import ImageSlider from "@/components/venue/venuedetailspage/imageslider/ImageSlider";
import HaveUsCallYou from "@/components/miscellaneous/haveuscallyou/HaveUsCallYou";
import { useGlobalContext } from "@/context/MyContext";
import Gallery from "@/components/vendor/vendordetailspage/gallery/Gallery";
import TabsComponent from "./tabsComponent/TabsComponent";

export default function VendorDetailsPage({ response }) {
  // console.log(response)
  const router = useRouter();

  const { setLeadFormData, setIsLeadsModelOpen } = useGlobalContext();

  const { similar_vendors, vendor } = response.data;
  // console.log(similar_vendors,vendor)

  const openLeadsModel = (e, v_slug = vendor?.slug, v_id = vendor?.id) => {
    const leadData = {
      url: router.asPath,
      venue_id: v_id,
      venue_slug: v_slug,
      type: "click",
      request_handle_by: "form",
    };
    // console.log(leadData)

    //Setting the data to the form
    setLeadFormData(leadData);

    //Opening the lead model
    setIsLeadsModelOpen(true);

    if (e) {
      e.stopPropagation();
    }
  };
  return (
    <>
      <Header />
      <BreadCrumb meta_title={vendor.meta_title} />
      <ImageSlider images={vendor.images} wb_assured={vendor?.wb_assured} />
      <VendorBasicInfo vendor={vendor} openLeadsModel={openLeadsModel} />
      {/* <TabsComponent images={vendor.images} /> */}
      <Tabs vendor={vendor} openLeadsModel={openLeadsModel} />
      <HaveUsCallYou />
      <Policies />
      {similar_vendors && <SimilarVendors vendors={similar_vendors} />}
    </>
  );
}
