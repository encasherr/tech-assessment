import React from 'react'

import { CodeRounded, ChevronRight, ComputerSharp, QuestionAnswer, 
    LibraryBooksOutlined, CheckCircleOutlineRounded  } from '@material-ui/icons';
import { GetFooterSectionHtml, GetHeaderHtml } from './CommonLayout';

class AboutPage extends React.Component {

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

                </head>
            <body>
                {getAboutPageHtml()}
            </body>
            </html>
        )
    }
}

const SiteTitle = "Online Valuate"

export default AboutPage

const getAboutPageHtml = () => {
    return (
        <>
            {/* about page */}
            {GetHeaderHtml('About')}            
            {getHeroSectionHtml()}
            {getMainSectionHtml()}
        </>
    )
}

// const getHeaderHtml = () => {
//     return (
//         <header id="header" className="fixed-top">
//         <div className="container d-flex align-items-center">
    
//           <h1 className="logo me-auto"><a href="#">{SiteTitle}</a></h1>
    
//           <nav id="navbar" className="navbar order-last order-lg-0">
//             <ul>
//               <li><a className="nav-link" href="/home">Home</a></li>
//               <li><a className="nav-link" href="/academic">Academic</a></li>
//               <li><a className="nav-link" href="/professional">Professional</a></li>
//               <li><a className="nav-link" href="/services">Services</a></li>
//               <li><a className="nav-link" href="/blogs">Blogs</a></li>
//               <li><a className="nav-link active" href="/about">About</a></li>
//               <li><a className="nav-link" href="/contact">Contact</a></li>
//             </ul>
//             <i className="bi bi-list mobile-nav-toggle"></i>
//           </nav>
    
//           <a href="/academic" className="get-started-btn">Get Started</a>
    
//         </div>
//       </header>
    
//     )
// }

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
            {getAboutSectionHtml()}
            {getMarketingStatement1Html()}
            {GetFooterSectionHtml()}
        </main>
    )
}

const getAboutSectionHtml = () => {
    return (
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">

                <div className="row">
                <div className="col-lg-6 order-1 order-lg-2 text-center" data-aos="fade-left" data-aos-delay="100">
                    {/* <img id="abouts" height="350" width="500" className="img-fluid" alt="" /> */}
                    <QuestionAnswer style={styles.iconFont} color='primary' height="200" className='h1 text-center' />
                    <ComputerSharp style={styles.iconFont} color='primary' height="200" className='h1 text-center' />
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                    <h3>Take Online Tests</h3>
                    <p className="fst-italic">
                    You can take online tests yourself or define tests for someone else to take, taking advantage of unique features
                    </p>
                    <ul>
                    <li><CheckCircleOutlineRounded className='text-success' /> Define Question Paper As per Syllabus</li>
                    <li><CheckCircleOutlineRounded className='text-success' /> Evaluate Answer Sheets Online</li>
                    <li><CheckCircleOutlineRounded className='text-success' /> Auto Calculation of Results</li>
                    <li><CheckCircleOutlineRounded className='text-success' /> Subject/ Topic-wise Analysis</li>
                    <li><CheckCircleOutlineRounded className='text-success' /> Detailed Report in excel, pdf format</li>
                    </ul>

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
    iconFont: {
        fontSize: '200px',
        color: '#5fcf80'
    },
    aboutUsTests: {
        fontSize: '24px'
    },
}