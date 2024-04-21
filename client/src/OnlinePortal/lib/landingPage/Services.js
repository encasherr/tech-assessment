import React from 'react'

import { CodeRounded, ChevronRight, ComputerSharp, QuestionAnswer, 
    LibraryBooksOutlined, CheckCircleOutlineRounded  } from '@material-ui/icons';
import { GetFooterSectionHtml, GetHeaderHtml } from './CommonLayout';

class ServicesPage extends React.Component {

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
                {getServicesPageHtml()}
            </body>
            </html>
        )
    }
}

const SiteTitle = "Online Valuate"

export default ServicesPage

const getServicesPageHtml = () => {
    return (
        <>
            {/* services page */}
            {GetHeaderHtml('Services')}            
            {getHeroSectionHtml()}
            {getMainSectionHtml()}
        </>
    )
}

const getHeroSectionHtml = () => {
    return (
        <section id="abouts" className="d-flex justify-content-center align-items-center">
            <div className="container position-relative" data-aos="" data-aos-delay="">
                <h1>Services </h1>
                <h2>Valuate provides a comprehensive set of features to those who want to conduct online exams for their students. </h2>
            </div>
        </section>
    )
}

const getMainSectionHtml = () => {
    return (
        <main id="main">
            {getSchoolExamServicesSectionHtml()}
            {getInstituteExamServicesSectionHtml()}
            {getProfessionSkillExamServicesSectionHtml()}
            {GetFooterSectionHtml()}
        </main>
    )
}

const getSchoolExamServicesSectionHtml = () => {
    return (
        <section className="about">
            <div className="container" data-aos="fade-up">

                <div className="row">
                <div className="col-lg-6 order-1 order-lg-2 text-center" data-aos="fade-left" data-aos-delay="100">
                    <QuestionAnswer style={styles.iconFont} color='primary' height="200" className='h1 text-center' />
                    <ComputerSharp style={styles.iconFont} color='primary' height="200" className='h1 text-center' />
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                    <h3>Online Exams for Schools</h3>
                    <p className="fst-italic">
                    Schools can define their own question paper sets, use them while defining new tests targeting a specific grade students.
Students will appear for online exams through their verified Valuate accounts on the exam day and their exam responses to subjective questions will be captured for further evaluation by teachers while responses to objective questions will be evaluated instantly.
                    </p>
                </div>
                </div>

            </div>
        </section>
    )
}

const getInstituteExamServicesSectionHtml = () => {
    return (
        <section className="about">
            <div className="container" data-aos="fade-up">

                <div className="row">
                <div className="col-lg-6 order-1 order-lg-2 text-center" data-aos="fade-left" data-aos-delay="100">
                <h3>Online Exams for Coaching Institutes</h3>
                    <p className="fst-italic">
                    Coaching Institutes or individual teachers can now take periodic assessments of their students to check the progress of their understanding of subjects that they are preparing for.
Students will appear for online exams through their verified Valuate accounts on the exam day and their exam responses to subjective questions will be captured for further evaluation by teachers while responses to objective questions will be evaluated instantly.
                    </p>
                    
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                    <QuestionAnswer style={styles.iconFont} color='primary' height="200" className='h1 text-center' />
                    <ComputerSharp style={styles.iconFont} color='primary' height="200" className='h1 text-center' />
                </div>
                </div>

            </div>
        </section>
    )
}

const getProfessionSkillExamServicesSectionHtml = () => {
    return (
        <section className="about">
            <div className="container" data-aos="fade-up">

                <div className="row">
                <div className="col-lg-6 order-1 order-lg-2 text-center" data-aos="fade-left" data-aos-delay="100">
                    <QuestionAnswer style={styles.iconFont} color='primary' height="200" className='h1 text-center' />
                    <ComputerSharp style={styles.iconFont} color='primary' height="200" className='h1 text-center' />
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                    <h3>Online Tests for Professionals</h3>
                    <p className="fst-italic">
                    Recruiters often find it difficult to hire desired candidates for given skills and role, as it involves browsing huge number of profiles from a job portal, shortlist the relevant ones, invite applications from the shortlisted candidates, arrange screening round before actual interviews.
Valuate comes with unique solutions to all these problems and reduces the overall time and efforts for recruiters in the hiring process, before selecting the most ideal candidate for final interview with recruiter.
                    </p>
                </div>
                </div>

            </div>
        </section>
    )
}

const styles = {
    iconFont: {
        fontSize: '200px',
        color: '#5fcf80'
    },
    aboutUsTests: {
        fontSize: '24px'
    }
}