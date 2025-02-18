import './style.css';
import config from '../../../../tech_blog_config.json';
import Link from "next/link";

export default function Header() {

    const onNavbarButtonClickEventHandler = (index: number) => {
        const category = config.header.navbar.categories[index];
        let path = '';
        if (category === 'About') {

        } else if (category === 'Projects') {

        } else if (category === 'Portfolio') {
            path = 'https://carefreelife98.github.io/portfolio/';
        } else {

        }

        return path;
    };

    return (
        <div id='cfl-tech-blog-header-wrapper'>
            <div className='cfl-tech-blog-header-container'>
                <div className='cfl-tech-blog-header-navbar-box'>
                    <Link href='/'>
                        <div className='cfl-tech-blog-header-navbar-writer-name-box'>
                            <div className='cfl-tech-blog-header-navbar-writer-name'>
                                {config.header.navbar.writer}
                            </div>
                        </div>
                    </Link>
                    <div className='cfl-tech-blog-header-navbar-category-box'>
                        {config.header.navbar.categories &&
                            config.header.navbar.categories.map((category, index) => {
                                const path = onNavbarButtonClickEventHandler(index);
                                return (
                                    <Link key={index} href={path}>
                                        <div key={index} className='cfl-tech-blog-header-navbar-category'>{category}</div>
                                    </Link>
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
