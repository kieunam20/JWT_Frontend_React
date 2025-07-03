import './About.scss';

const About = () =>{
    return (
    <div className="portfolio container">
      <header className="header text-center mt-4">
       
        <h1>Kiều Hoàng Nam</h1>
        <p>Web Developer | Intern</p>
      </header>

      <main className="content mt-4">
        <section className="mb-4">
          <h2>About Me</h2>
          <p>
            I am a final-year Software Engineering student with a passion for building high-quality,
            maintainable, and user-friendly web applications. I enjoy learning new technologies and
            continuously improving my development workflow.
          </p>
        </section>

        <section className="mb-4">
          <h2>Projects</h2>
          <div className="projects row">
            <div className="card col-md-4 mb-3">
              <h3>Website bán nhà</h3>
              <a href="https://homespace-2024.netlify.app/" target="_blank" rel="noreferrer">
                View Demo
              </a>
            </div>
            <div className="card col-md-4 mb-3">
              <h3>Website bán quần áo</h3>
              <a href="https://clothes-myweb.netlify.app/" target="_blank" rel="noreferrer">
                View Demo
              </a>
            </div>
            <div className="card col-md-4 mb-3">
              <h3>Website mua dụng cụ thể thao</h3>
              <a href="https://sport-myweb2024.netlify.app/" target="_blank" rel="noreferrer">
                View Demo
              </a>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <h2>Skills</h2>
          <ul>
            <li>HTML, CSS, JavaScript, SCSS</li>
            <li>Node.js, React, Express.js, .NET, JavaScript, JavaCore</li>
            <li>MongoDB, SQL Server, MariaDB</li>
            <li>Microsoft Office (Word, Excel, PowerPoint)</li>
            <li>English Level: B2 (2025)</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2>Contact</h2>
          <p>
            Email:{' '}
            <a href="mailto:namk63866@gmail.com">namk63866@gmail.com</a>
          </p>
          <p>Phone: 0985 753 416</p>
          <p>Location: Mỹ Đình, Nam Từ Liêm, Hà Nội</p>
          <p>
            Facebook:{' '}
            <a
              href="https://www.facebook.com/hoangnamkieu.22/"
              target="_blank"
              rel="noreferrer"
            >
              facebook.com/hoangnamkieu.22
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default About;