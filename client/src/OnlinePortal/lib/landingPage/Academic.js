import React from 'react'

import { CodeRounded, ChevronRight, ComputerSharp, QuestionAnswer, 
    LibraryBooksOutlined, CheckCircleOutlineRounded  } from '@material-ui/icons';

import examsForSale from './ExamsForSale.json'
import { GetFooterSectionHtml, GetHeaderHtml } from './CommonLayout';

class AcademicPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedGradeId: -1
    }
  }

  selectGrade = (gradeId) => {
    this.setState({
      selectedGradeId: gradeId
    })
  }

    render = () => {
      let { selectedGradeId } = this.state

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
                {getAcademicPageHtml(selectedGradeId, this.selectGrade)}
            </body>
            </html>
        )
    }
}

const SiteTitle = "Online Valuate"

export default AcademicPage

const getAcademicPageHtml = (selectedGradeId, selectGrade) => {
    return (
        <>
            {/* about page */}
            {GetHeaderHtml('Academic')}            
            {getHeroSectionHtml()}
            {getMainSectionHtml(selectedGradeId, selectGrade)}
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

const getMainSectionHtml = (selectedGradeId, selectGrade) => {
    return (
        <main id="main" data-aos="fade-in">
            {getMarketingStatement1Html()}
            {getAcademicGradesSectionHtml(selectGrade)}
            {getExamsForSelectedGrade(selectedGradeId)}
            {GetFooterSectionHtml()}
        </main>
    )
}

const getMarketingStatement1Html = () => {
  return (
      <div className="breadcrumbs marketing-section">
          <div className="container">
              <h2>Academic</h2>
              <p className='marketing-text'>Valuate platform is built by considering the way schools, institutes, individual teachers or parents would like to assess the students and evaluate their performance in more effective way.
              </p>
          </div>
      </div>
  )
}

const getAcademicGradesSectionHtml = (selectGrade) => {
  let contentArray = [
    { gradeId: 10, gradeName: 'Grade 10', board: 'NCERT', category: 'Academic', descr: 'Science, Maths, Social Science, English, Computer Applications' },
    { gradeId: 9, gradeName: 'Grade 9', board: 'NCERT', category: 'Academic', descr: 'Science, Maths, Social Science, English, Computer Applications' },
    { gradeId: 8, gradeName: 'Grade 8', board: 'NCERT', category: 'Academic', descr: 'Science, Maths, Social Science, English' },
    { gradeId: 7, gradeName: 'Grade 7', board: 'NCERT', category: 'Academic', descr: 'Science, Maths, Social Science, English' },
    { gradeId: 6, gradeName: 'Grade 6', board: 'NCERT', category: 'Academic', descr: 'Science, Maths, Social Science, English' },
    { gradeId: 5, gradeName: 'Grade 5', board: 'NCERT', category: 'Academic', descr: 'Maths, EVS, English' },
    { gradeId: 4, gradeName: 'Grade 4', board: 'NCERT', category: 'Academic', descr: 'Maths, English, General Awareness, EVS' },
    { gradeId: 3, gradeName: 'Grade 3', board: 'NCERT', category: 'Academic', descr: 'Maths, English, General Awareness, EVS' },
    { gradeId: 2, gradeName: 'Grade 2', board: 'NCERT', category: 'Academic', descr: 'Maths, English, General Awareness, EVS' },
    { gradeId: 1, gradeName: 'Grade 1', board: 'NCERT', category: 'Academic', descr: 'Maths, English, General Awareness, EVS' },
  ]

  return (
      <section id="features" className="features">
        <div className="container" data-aos="fade-up">

          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {contentArray && contentArray.length > 0 && contentArray.map((contentItem) => {
              return (
                <div className="col-lg-2 col-md-4 mt-4">
                  <div className="icon-box">
                    <button className='btn btn-default' onClick={() => selectGrade(contentItem.gradeId)}>
                      <h3>{contentItem.gradeName}</h3>
                    </button>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </section>
  )
}

const getExamsForSelectedGrade = (gradeId) => {
  let examsForSelectedGrade = examsForSale.exams.filter((examItem) => {
    return examItem.category === 'Academic' && examItem.gradeId === gradeId
  })
  return (
    <section id="courses" class="courses">
      <div class="container" data-aos="fade-up">

        <div class="row" data-aos="zoom-in" data-aos-delay="100">
          {examsForSelectedGrade && examsForSelectedGrade.length > 0 && examsForSelectedGrade.map((examItem) => {
            return (

              <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div class="course-item">
                  <LibraryBooksOutlined style={styles.iconFont} color='primary' height="200" className='text-center'  />
                  <div class="course-content">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <h4>{examItem.gradeName}</h4>
                      <p class="price">
                      <span dangerouslySetInnerHTML={{ __html: examItem.sellingCurrency }} /> 
                      &nbsp;{examItem.sellingPrice}
                      </p>
                    </div>
    
                    <h3><a href="course-details.html">{examItem.subject}</a></h3>
                    <p>{examItem.topics.join(",")}</p>
                    <div class="trainer d-flex justify-content-between align-items-center">
                      <div class="trainer-profile d-flex align-items-center">
                        {/* <img src="assets/img/trainers/trainer-1.jpg" class="img-fluid" alt=""> */}
                        <span>{examItem.board}</span>
                      </div>
                      <div class="trainer-rank d-flex align-items-center">
                        <i class="bx bx-user"></i>&nbsp;50
                        &nbsp;&nbsp;
                        <i class="bx bx-heart"></i>&nbsp;65
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
            )
          })}
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