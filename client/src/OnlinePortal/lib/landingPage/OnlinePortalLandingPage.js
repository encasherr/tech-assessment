import React from 'react'
import '../landingPageAssets/landingPage.css'


import { CodeRounded, ChevronRight, ComputerSharp, QuestionAnswer, 
    LibraryBooksOutlined, CheckCircleOutlineRounded  } from '@material-ui/icons';
import { GetFooterSectionHtml, GetHeaderHtml } from './CommonLayout';


class OnlinePortalLandingPage extends React.Component {
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
                {getLandingPageHtml()}
            </body>
            </html>
        )
    }
}

const SiteTitle = "Online Valuate"

const getLandingPageHtml = () => {
    return (
        <>
            {/* landing page */}
            {GetHeaderHtml('Home')}            
            {getHeroSectionHtml()}
            {getMainSectionHtml()}
        </>
    )
}

const getHeroSectionHtml = () => {
    return (
        <section id="hero" className="d-flex justify-content-center align-items-center">
            <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
            <h1>Evaluate Your Skills Instantly </h1>
            <h2>Digital Assessments can help students and institutes simplify the examination and evaluation process as a whole. It would result in significant cost savings as well as improved test taking experience.</h2>
            <a href="/academic" className="btn-get-started">Get Started</a>
            </div>
        </section>
    )
}

const getMainSectionHtml = () => {
    return (
        <main id="main">
            {getAboutSectionHtml()}
            {getCountsSectionHtml()}
            {getWhyUsSectionHtml()}
            {getFeaturesSectionHtml()}
            {getAcademicExamsSectionHtml()}
            {getPopularCoursesSectionHtml()}
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

const getCountsSectionHtml = () => {
    return (
        <section id="counts" className="counts section-bg">
            <div className="container">

                <div className="row counters">

                <div className="col-lg-3 col-6 text-center">
                    <span data-purecounter-start="0" data-purecounter-end="1232" data-purecounter-duration="1" className="purecounter"></span>
                    <p>Students</p>
                </div>

                <div className="col-lg-3 col-6 text-center">
                    <span data-purecounter-start="0" data-purecounter-end="64" data-purecounter-duration="1" className="purecounter"></span>
                    <p>Courses</p>
                </div>

                <div className="col-lg-3 col-6 text-center">
                    <span data-purecounter-start="0" data-purecounter-end="42" data-purecounter-duration="1" className="purecounter"></span>
                    <p>Events</p>
                </div>

                <div className="col-lg-3 col-6 text-center">
                    <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter"></span>
                    <p>Trainers</p>
                </div>

                </div>

            </div>
        </section>
    )
}

const getWhyUsSectionHtml = () => {
    return (
        <section id="why-us" className="why-us">
            <div className="container" data-aos="fade-up">

                <div className="row">
                <div className="col-lg-4 d-flex align-items-stretch">
                    <div className="content">
                    <h3>Why Choose {SiteTitle}?</h3>
                    <p>
                    Valuate is the most comprehensive testing platform in the market. It’s perfect for schools, coaching institutes of any size to gauge preparation of their students. It also  provides full control to parents or teachers for testing their child's preparation, all in a seamless fashion.
                    </p>
                    <div className="text-center">
                        <a href="/about" className="more-btn">Learn More <ChevronRight /></a>
                    </div>
                    </div>
                </div>
                <div className="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                    <div className="icon-boxes d-flex flex-column justify-content-center">
                    <div className="row">
                        <div className="col-xl-4 d-flex align-items-stretch">
                        <div className="icon-box mt-4 mt-xl-0">
                            <CheckCircleOutlineRounded className='text-success' fontSize='large' />
                            <h4>Fully Customizable</h4>
                            <p>Valuate gives you full control to build Tests that is suitable for you. Customized solutions for every need</p>
                        </div>
                        </div>
                        <div className="col-xl-4 d-flex align-items-stretch">
                        <div className="icon-box mt-4 mt-xl-0">
                            <CheckCircleOutlineRounded className='text-success' fontSize='large' />
                            <h4>Comprehensive Set of Features</h4>
                            <p>Valuate provides comprehensive set of features right from defining a test to the way test taker submits test responses and evaluation results are shared</p>
                        </div>
                        </div>
                        <div className="col-xl-4 d-flex align-items-stretch">
                        <div className="icon-box mt-4 mt-xl-0">
                            <CheckCircleOutlineRounded className='text-success' fontSize='large' />
                            <h4>For Students & Professionals</h4>
                            <p>Valuate comes with ready to use questions for both Academic studies and Professional programming skills</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        </section>
    )
}

const getFeaturesSectionHtml = () => {
    return (
        <section id="features" className="features">
            <div className="container" data-aos="fade-up">

                <div className="row" data-aos="zoom-in" data-aos-delay="100">
                <div className="col-lg-3 col-md-4">
                    <div className="icon-box">
                    {/* <i className="ri-store-line" style="color: #ffbb2c;"></i> */}
                    <h3><a href="">Grade 1 - 10</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                    <div className="icon-box">
                    {/* <i className="ri-bar-chart-box-line" style="color: #5578ff;"></i> */}
                    <h3><a href="">General Knowledge</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                    <div className="icon-box">
                    {/* <i className="ri-calendar-todo-line" style="color: #e80368;"></i> */}
                    <h3><a href="">Aptitude Tests</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
                    <div className="icon-box">
                    {/* <i className="ri-paint-brush-line" style="color: #e361ff;"></i> */}
                    <h3><a href="">Computer Engineering</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                    <div className="icon-box">
                    {/* <i className="ri-database-2-line" style="color: #47aeff;"></i> */}
                    <h3><a href="">BCA</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                    <div className="icon-box">
                    {/* <i className="ri-gradienter-line" style="color: #ffa76e;"></i> */}
                    <h3><a href="">MCA</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                    <div className="icon-box">
                    {/* <i className="ri-file-list-3-line" style="color: #11dbcf;"></i> */}
                    <h3><a href="">Web Development</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                    <div className="icon-box">
                    {/* <i className="ri-price-tag-2-line" style="color: #4233ff;"></i> */}
                    <h3><a href="">Angular</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                    <div className="icon-box">
                    {/* <i className="ri-anchor-line" style="color: #b2904f;"></i> */}
                    <h3><a href="">JavaScript</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                    <div className="icon-box">
                    {/* <i className="ri-disc-line" style="color: #b20969;"></i> */}
                    <h3><a href="">ReactJs</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                    <div className="icon-box">
                    {/* <i className="ri-base-station-line" style="color: #ff5828;"></i> */}
                    <h3><a href="">C#</a></h3>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                    <div className="icon-box">
                    {/* <i className="ri-fingerprint-line" style="color: #29cc61;"></i> */}
                    <h3><a href="">Python</a></h3>
                    </div>
                </div>
                </div>

            </div>
        </section>
    )
}

const getAcademicExamsSectionHtml = () => {
    return (
        <section id="popular-courses" className="courses">
            <div className="container" data-aos="fade-up">
    
            <div className="section-title">
                <h2>Academic Exams</h2>
                <p>Recent Additions</p>
            </div>
    
            <div className="row" data-aos="zoom-in" data-aos-delay="100">
    
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="course-item">
                    {/* <img src="assets/img/course-1.jpg" className="img-fluid" alt="..."/> */}
                    <LibraryBooksOutlined style={styles.iconFont} color='primary' height="200" className='text-center'  />
                    <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Grade 9</h4>
                        <p className="price">$169</p>
                    </div>
    
                    <h3><a href="course-details.html">Science</a></h3>
                    <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                        <div className="trainer-profile d-flex align-items-center">
                        <img src="assets/img/trainers/trainer-1.jpg" className="img-fluid" alt=""/>
                        <span>Antonio</span>
                        </div>
                        <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;50
                        &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;65
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="course-item">
                    {/* <img src="assets/img/course-2.jpg" className="img-fluid" alt="..."/> */}
                    <LibraryBooksOutlined style={styles.iconFont} color='primary' height="200" className='text-center'  />
                    <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Grade 8</h4>
                        <p className="price">$250</p>
                    </div>
    
                    <h3><a href="course-details.html">Social Studies</a></h3>
                    <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                        <div className="trainer-profile d-flex align-items-center">
                        <img src="assets/img/trainers/trainer-2.jpg" className="img-fluid" alt=""/>
                        <span>Lana</span>
                        </div>
                        <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;35
                        &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;42
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                <div className="course-item">
                    {/* <img src="assets/img/course-3.jpg" className="img-fluid" alt="..."/> */}
                    <LibraryBooksOutlined style={styles.iconFont} color='primary' height="200" className='text-center'  />
                    <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Grade 7</h4>
                        <p className="price">$180</p>
                    </div>
    
                    <h3><a href="course-details.html">Maths</a></h3>
                    <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                        <div className="trainer-profile d-flex align-items-center">
                        <img src="assets/img/trainers/trainer-3.jpg" className="img-fluid" alt=""/>
                        <span>Brandon</span>
                        </div>
                        <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;20
                        &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;85
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    
            </div>
    
            </div>
        </section>
    )
}

const getPopularCoursesSectionHtml = () => {
    return (
        <section id="popular-courses" className="courses">
            <div className="container" data-aos="fade-up">
    
            <div className="section-title">
                <h2>Tutorials</h2>
                <p>Popular Topics</p>
            </div>
    
            <div className="row" data-aos="zoom-in" data-aos-delay="100">
    
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="course-item">
                    {/* <img src="assets/img/course-1.jpg" className="img-fluid" alt="..."/> */}
                    <CodeRounded style={styles.iconFont} color='primary' height="200" className='text-center'  />
                    <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Web Development</h4>
                        <p className="price">$169</p>
                    </div>
    
                    <h3><a href="course-details.html">Fullstack Development</a></h3>
                    <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                        <div className="trainer-profile d-flex align-items-center">
                        <img src="assets/img/trainers/trainer-1.jpg" className="img-fluid" alt=""/>
                        <span>Antonio</span>
                        </div>
                        <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;50
                        &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;65
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="course-item">
                    {/* <img src="assets/img/course-2.jpg" className="img-fluid" alt="..."/> */}
                    <CodeRounded style={styles.iconFont} color='primary' height="200" className='text-center'  />
                    <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Coding</h4>
                        <p className="price">$250</p>
                    </div>
    
                    <h3><a href="course-details.html">C#</a></h3>
                    <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                        <div className="trainer-profile d-flex align-items-center">
                        <img src="assets/img/trainers/trainer-2.jpg" className="img-fluid" alt=""/>
                        <span>Lana</span>
                        </div>
                        <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;35
                        &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;42
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                <div className="course-item">
                    {/* <img src="assets/img/course-3.jpg" className="img-fluid" alt="..."/> */}
                    <CodeRounded style={styles.iconFont} color='primary' height="200" className='text-center'  />
                    <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Coding</h4>
                        <p className="price">$180</p>
                    </div>
    
                    <h3><a href="course-details.html">Angular</a></h3>
                    <p>Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.</p>
                    <div className="trainer d-flex justify-content-between align-items-center">
                        <div className="trainer-profile d-flex align-items-center">
                        <img src="assets/img/trainers/trainer-3.jpg" className="img-fluid" alt=""/>
                        <span>Brandon</span>
                        </div>
                        <div className="trainer-rank d-flex align-items-center">
                        <i className="bx bx-user"></i>&nbsp;20
                        &nbsp;&nbsp;
                        <i className="bx bx-heart"></i>&nbsp;85
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    
            </div>
    
            </div>
        </section>
    )
}

export default OnlinePortalLandingPage

const styles = {
    iconFont: {
        fontSize: '200px',
        color: '#5fcf80'
    }
}