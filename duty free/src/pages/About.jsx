import aboutImg from '../assets/travelers.png'
import '../css/about-us.css'
import DiscountComponent from '../components/commonComponents/DiscountComponent'

const About = () => {
  return (
    <>
      <div className="d-block mt-5 d-lg-flex justify-content-center gap-2 about-main-div container ">

        <div className=" col-md-12 col-sm-12 col-lg-6" >
          <img className="about-main-img mt-3 " src={aboutImg} alt="about-img" />
        </div>

        <section class="aux-widget-modern-heading col-md-12 col-lg-6 col-sm-12">
          <div class="aux-widget-inner">
            <p class="why-choose">Why Choose Us</p>
            <h3 class="aux-modern-heading-secondary aux-head-before  pb-5">Delivering exceptional duty-free services across Africa with unmatched quality and care.</h3>
            <div class="aux-modern-heading-divider"></div> <div class="aux-modern-heading-description pt-5 "><p>Our journey revolves around seizing opportunities in Africa's duty-free market. With a collective three decades of experience living and working in Africa, Jordan de Looff, Willemijn Jumelet,&nbsp; came together to address a gap in travel retail. Collaborating with seasoned board members and founders since 2007, they leverage their expertise from the pharmaceutical and branding sectors to deliver top-quality products throughout Africa</p></div></div>
          <div className="d-flex gap-3 ">
            <div className="border-right"><h4 >Efficient Distribution &amp; Adherence:</h4><p ><span className="text-muted" >ADF fully aligns with and rigorously upholds all brand marketing strategies and guidelines, backed by accurate reporting to demonstrate our commitment to ensuring your products seamlessly reach their destinations.</span></p></div>
            <div className="border-right"><h4>Trustworthy Compliance:</h4><p ><span>ADF is committed to being a dependable and compliant partner for your brand. We steadfastly adhere to the laws and regulations governing the markets in which we operate.</span></p></div>
          </div>
        </section>
      </div>
      <DiscountComponent/>
    </>
  )
}

export default About