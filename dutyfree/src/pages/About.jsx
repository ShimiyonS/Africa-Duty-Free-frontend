import aboutImg from '../assets/travelers.png'
import '../css/about-us.css'

const About = () => {
  return (
    <div className="container">
      <div className="d-flex flex-wrap mt-5 about-main-div pb-5">

        <div className="  col-md-12 col-sm-12 col-xl-6 pb-md-5 pb-5 pb-xl-0" >
          <img className="about-main-img mt-3 w-100 " src={aboutImg} alt="about-img" />
        </div>

        <div class="aux-widget-modern-heading col-md-12 col-sm-12 col-xl-6 ps-xl-5">
          <div class="aux-widget-inner">
            <p class="why-choose justuspro-medium text-color-gold">Why Choose Us</p>
            <h3 class="about-content justuspro-medium pb-5">Delivering exceptional duty-free services across Africa with unmatched quality and care.</h3>
            <div class="aux-modern-heading-divider  bg-color-warning "></div> <div class="aux-modern-heading-description pt-5 "><p>Our journey revolves around seizing opportunities in Africa's duty-free market. With a collective three decades of experience living and working in Africa, Jordan de Looff, Willemijn Jumelet,&nbsp; came together to address a gap in travel retail. Collaborating with seasoned board members and founders since 2007, they leverage their expertise from the pharmaceutical and branding sectors to deliver top-quality products throughout Africa</p></div></div>
          <div className="d-flex flex-column flex-md-row gap-3">
            <div className="border-right"><h4 className="justuspro-bold">Efficient Distribution &amp; Adherence:</h4><p ><span >ADF fully aligns with and rigorously upholds all brand marketing strategies and guidelines, backed by accurate reporting to demonstrate our commitment to ensuring your products seamlessly reach their destinations.</span></p></div>
            <div className="border-right"><h4 className="justuspro-bold">Trustworthy Compliance:</h4><p ><span >ADF is committed to being a dependable and compliant partner for your brand. We steadfastly adhere to the laws and regulations governing the markets in which we operate.</span></p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About