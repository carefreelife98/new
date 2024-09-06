import './style.css';
import config from '../../tech_blog_config.json'

export default function Header() {

    // function: 네비게이트 함수
    // const navigate = useNavigate();

    const onNavbarButtonClickEventHandler = (index: number) => {
        let category = config.header.navbar.categories[index];
        if (category === 'About') {

        } else if (category === 'Projects') {

        } else if (category === 'Portfolio') {
            window.open('https://carefreelife98.github.io/portfolio/');
        } else {

        }
    };

    return (
        <div id='cfl-tech-blog-header-wrapper'>
            <div className='cfl-tech-blog-header-container'>
                <div className='cfl-tech-blog-header-navbar-box'>
                    <div className='cfl-tech-blog-header-navbar-writer-name'>{config.header.navbar.writer}</div>
                    <div className='cfl-tech-blog-header-navbar-category-box'>
                        {config.header.navbar.categories &&
                            config.header.navbar.categories.map((category, index) => {
                                return (
                                    <div key={index} className='cfl-tech-blog-header-navbar-category' onClick={() => onNavbarButtonClickEventHandler(index)}>{category}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='cfl-tech-blog-header-title-box'>
                    <div className='divider' />
                    <div className='cfl-tech-blog-header-title'>{config.header.title}</div>
                    <div className='cfl-tech-blog-header-sub-title'>{config.header.subtitle}</div>
                    <div className='divider' />
                </div>
            </div>
        </div>
    );
};
