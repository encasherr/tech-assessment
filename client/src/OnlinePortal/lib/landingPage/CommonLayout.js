import React from 'react'

import { Menu, CodeRounded, ChevronRight, ComputerSharp, QuestionAnswer, 
    LibraryBooksOutlined, CheckCircleOutlineRounded  } from '@material-ui/icons';

export const SiteTitle = "Online Valuate"
export const SellingCurrency = "&#x20B9;"

export const GetHeaderHtml = (activeLink) => {
    let menuItems = [
        {route: '/home', caption: 'Home' },
        {route: '/academic', caption: 'Academic' },
        {route: '/professional', caption: 'Professional' },
        {route: '/services', caption: 'Services' },
        {route: '/pricing', caption: 'Pricing' },
        {route: '/blogs', caption: 'Blogs' },
        {route: '/about', caption: 'About' },
        {route: '/contact', caption: 'Contact' },
        {route: '/login', caption: 'Login' }
    ]
    return (
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">
        
            <h1 className="logo me-auto"><a href="#">{SiteTitle}</a></h1>
        
            <nav id="navbar" className="navbar order-last order-lg-0">
                <ul>
                    {menuItems && menuItems.map((menuItem) => {
                        return (
                            <li><a className={`nav-link ${activeLink===menuItem.caption ? 'active' : ''}`}  href={menuItem.route}>{menuItem.caption}</a></li>
                        )
                    })}
                </ul>
                <i className="bi bi-list mobile-nav-toggle"></i>
                
            </nav>
            <a href="/signup" className="get-started-btn">Get Started</a>
        
            </div>
        </header>

    )
}

export const GetFooterSectionHtml = () => {
    return (
        <footer id="footer">

            <div className="footer-top">
            <div className="container">
                <div className="row">

                <div className="col-lg-3 col-md-6 footer-contact">
                    <h3>{SiteTitle}</h3>
                    {/* <p>
                    A108 Adam Street <br/>
                    New York, NY 535022<br/>
                    United States <br/><br/>
                    <strong>Phone:</strong> +1 5589 55488 55<br/>
                    <strong>Email:</strong> info@example.com<br/>
                    </p> */}
                </div>

                <div className="col-lg-2 col-md-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                    </ul>
                </div>

                <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Our Services</h4>
                    <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Exams for Schools</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Exams for Coaching Institutes</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Exams for Professional Skills</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Exams for Self preparation</a></li>
                    </ul>
                </div>

                {/* <div className="col-lg-4 col-md-6 footer-newsletter">
                    <h4>Join Our Newsletter</h4>
                    <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                    <form action="" method="post">
                    <input type="email" name="email"/><input type="submit" value="Subscribe"/>
                    </form>
                </div> */}

                </div>
            </div>
            </div>

            <div className="container d-md-flex py-4">

            <div className="me-md-auto text-center text-md-start">
                <div className="copyright">
                &copy; Copyright <strong><span>{SiteTitle}</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                {/* <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/ --> */}
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
            </div>
            <div className="social-links text-center text-md-right pt-3 pt-md-0">
                <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
            </div>
            </div>
        </footer>
    )
}
