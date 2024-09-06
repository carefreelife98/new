import './style.css';
import config from '../../tech_blog_config.json'

//          component: 푸터 레이아웃          //
export default function Footer() {

    // event handler: 깃헙 아이콘 클릭 핸들러
    const onGithubIconClickHandler = () => {
        window.open(config.writer_info.sns.github)
    };

    // event handler: 인스타그램 아이콘 클릭 핸들러
    const onInstagramIconClickHandler = () => {
        window.open(config.writer_info.sns.instagram)
    };

    // event handler: 포트폴리오 아이콘 클릭 핸들러
    const onPortfolioIconClickHandler = () => {
        window.open(config.writer_info.sns.portfolio)
    };

    return (
        <div id='cfl-tech-blog-footer-wrapper'>
            <div className='cfl-tech-blog-footer-container'>
                <div className='cfl-tech-blog-footer-copyright-box'>
                    <div className='cfl-tech-blog-footer-copyright'>{'© 2024 CarefreeLife98. All rights reserved. | Copyrighted by Carefreelife98'}</div>
                    <div className='cfl-tech-blog-footer-sns-box'>
                        {config.writer_info.sns.github &&
                            <div className='icon-button' onClick={onGithubIconClickHandler}>
                                <div className='icon github-icon'/>
                            </div>
                        }
                        {config.writer_info.sns.instagram &&
                            <div className='icon-button' onClick={onInstagramIconClickHandler}>
                                <div className='icon instagram-icon' />
                            </div>
                        }
                        {config.writer_info.sns.portfolio &&
                            <div className='icon-button' onClick={onPortfolioIconClickHandler}>
                                <div className='icon portfolio-icon' />
                            </div>
                        }
                    </div>
                </div>
                <div className='cfl-tech-blog-footer-info-box'>
                    <div className='cfl-tech-blog-footer-contact-box'>
                        <div className='cfl-tech-blog-footer-contact'>블로그 운영자: <span className='cfl-tech-blog-footer-contact-detail'>{config.writer_info.name}</span></div>
                        <div className='cfl-tech-blog-footer-contact'>E-Mail: <span className='cfl-tech-blog-footer-contact-detail'>{config.writer_info.contact.email}</span></div>
                        <div className='cfl-tech-blog-footer-contact'>Tel: <span className='cfl-tech-blog-footer-contact-detail'>{config.writer_info.contact.tel}</span></div>
                        <div className='cfl-tech-blog-footer-contact'>Office: <span className='cfl-tech-blog-footer-contact-detail'>{config.writer_info.contact.address}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
