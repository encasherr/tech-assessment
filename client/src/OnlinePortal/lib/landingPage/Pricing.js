import React from 'react'

import { CodeRounded, ChevronRight, ComputerSharp, QuestionAnswer, 
    LibraryBooksOutlined, CheckCircleOutlineRounded, Close, Check  } from '@material-ui/icons';
import { GetFooterSectionHtml, GetHeaderHtml, SellingCurrency } from './CommonLayout';
import examsForSale from './ExamsForSale.json'

class PricingPage extends React.Component {

    render = () => {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />
                    <link href="landingPageAssets/vendor/animate.css/animate.min.css" rel="stylesheet"/>
                    <link href="../landingPageAssets/vendor/aos/aos.css" rel="stylesheet"/>
                    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
                    <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"/>
                    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet"/>
                    <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet"/>
                    <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet"/>
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
    crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
    crossorigin="anonymous"></script>
                </head>
            <body>
                {getAboutPageHtml()}
            </body>
            </html>
        )
    }
}

const SiteTitle = "Online Valuate"

export default PricingPage

const getAboutPageHtml = () => {
    return (
        <>
            {/* about page */}
            {GetHeaderHtml('Pricing')}            
            {/* {getHeroSectionHtml()} */}
            {getMainSectionHtml()}
        </>
    )
}

const getHeroSectionHtml = () => {
    return (
        <section id="abouts" className="d-flex justify-content-center align-items-center">
            <div className="container position-relative" data-aos="" data-aos-delay="">
                <h1>About Us </h1>
                <h2>Valuate is an easy system of Plug and play Saas platform to make online examination a lot more efficient, reliable and scalable.</h2>
            </div>
        </section>
    )
}

const getMainSectionHtml = () => {
    return (
        <main id="main">
            {getMarketingStatement1Html()}
            {getPricingSectionHtml()}
            {GetFooterSectionHtml()}
        </main>
    )
}

const getPricingSectionHtml = () => {
    let { features } = examsForSale
    return (
        <section id="pricing" class="pricing">
        <div class="container" data-aos="fade-up">
  
          <div class="row">
            {/* <div class="col-lg-3 col-md-6 d-none d-sm-none d-md-block">
                <div class="box">
                    <ul>
                        {[1,2,3,4,5,6,7,8].map((i) => {
                            return (
                                <li></li>
                            )
                        })}
                        {features && features.map((feature) => {
                            return (
                                <li className='feature-item'>{feature.parameter}</li>
                            )
                        })}
                    </ul>
                </div>
            </div> */}
            <div class="col-lg-4 col-md-6">
              <div class="box">
                <h3>Basic</h3>
                <h4><sup dangerouslySetInnerHTML={{ __html: SellingCurrency }}></sup>0<span> / month</span></h4>
                <ul className='mt-4'>
                    {features && features.map((feature) => {
                        return (
                            <li className='feature-item bg-basic'>
                                <h5 className='d-sm-none d-md-block'>{feature.parameter}</h5>
                                {feature.basicPlan === "No" && <Close style={styles.crossIcon} />}
                                {feature.basicPlan === "Yes" && <Check style={styles.checkIcon} />}
                                <h6>{(feature.basicPlan !== "No" && feature.basicPlan !== "Yes") ? feature.basicPlan : ''}</h6>
                            </li>
                        )
                    })}
                </ul>
                <div class="btn-wrap">
                  <a href="#" class="btn-buy">Buy Now</a>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="box featured">
                <h3>Premium</h3>
                <h4><sup dangerouslySetInnerHTML={{ __html: SellingCurrency }}></sup>1000<span> / month</span></h4>
                <ul className='mt-4'>
                    {features && features.map((feature) => {
                        return (
                            <li className='feature-item bg-basic'>
                                <h5 className='d-sm-none d-md-block'>{feature.parameter}</h5>
                                {feature.premiumPlan === "No" && <Close style={styles.crossIcon} />}
                                {feature.premiumPlan === "Yes" && <Check style={styles.checkIcon} />}
                                <h6>{(feature.premiumPlan !== "No" && feature.premiumPlan !== "Yes") ? feature.premiumPlan : ''}</h6>
                            </li>
                        )
                    })}
                </ul>
                <div class="btn-wrap">
                  <a href="#" class="btn-buy">Buy Now</a>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mt-4 mt-lg-0">
              <div class="box">
                <span class="advanced">Advanced</span>
                <h3>Enterprise</h3>
                <h4><sup dangerouslySetInnerHTML={{ __html: SellingCurrency }}></sup>5000<span> / month</span></h4>
                <ul className='mt-4'>
                    {features && features.map((feature) => {
                        return (
                            <li className='feature-item bg-basic'>
                                <h5 className='d-sm-none d-md-block'>{feature.parameter}</h5>
                                {feature.enterprisePlan === "No" && <Close style={styles.crossIcon} />}
                                {feature.enterprisePlan === "Yes" && <Check style={styles.checkIcon} />}
                                <h6>{(feature.enterprisePlan !== "No" && feature.enterprisePlan !== "Yes") ? feature.enterprisePlan : ''}</h6>
                            </li>
                        )
                    })}
                </ul>
                <div class="btn-wrap">
                  <a href="/signup" class="btn-buy">Buy Now</a>
                </div>
              </div>
            </div>
  
          </div>
  
        </div>
      </section>
    )
}

const getMarketingStatement1Html = () => {
    return (
        <div className="breadcrumbs marketing-section">
            <div className="container">
                <h2>Evaluate Instantly</h2>
                <p className='marketing-text'>Valuate platform is built by considering the way schools, institutes, individual teachers or parents would like to assess the students and evaluate their performance in more effective way.
    IT Professionals can take periodic tests on this platform to ensure they are prepared for all types of questions they are going to surface during their Job hunt interviews.
                </p>
            </div>
        </div>
    )
}

const styles = {
    checkIcon: {
        fontSize: '19px',
        color: '#24AB70',
        fontWeight: 'bold'
    },
    crossIcon: {
        fontSize: '19px',
        color: '#E62B59'
    },
    aboutUsTests: {
        fontSize: '24px'
    },
}