import styles from '@/styles/Section.module.css';

const About = () => {
  return (
    <div
      className={`${styles.content_text} ${styles.black} container`}
      id="about"
    >
      <h2>About me</h2> <br />
      <p>
        Welcome to my website! I am a skilled web developer with a passion for
        creating beautiful, functional, and user-friendly websites for
        businesses of all sizes.
      </p>
      <br />
      <p>
        With years of experience in the field, I have honed my skills in web
        development, design, and programming to create websites that truly
        reflect the unique personality and needs of each brand, shop, or service
        provider I work with.
      </p>
      <br />
      <p>
        Whether you are starting from scratch or looking to revamp your existing
        website, I can help you bring your vision to life. From simple, elegant
        designs to complex, dynamic sites, I can create a website that will help
        you stand out from the competition and make a lasting impression on your
        visitors.
      </p>
      <br />
      <p>
        My process is collaborative and tailored to your specific needs. I take
        the time to get to know you and your business, so that I can create a
        website that aligns with your brand identity and effectively
        communicates your message to your target audience.
      </p>
      <br />
      <p>
        In addition to creating beautiful and functional websites, I also offer
        ongoing maintenance and support services to ensure that your website
        remains up-to-date, secure, and optimized for performance.
      </p>
      <br />
      <p>
        Thank you for considering my services as your web developer. I look
        forward to working with you to create a website that you can be proud
        of!
      </p>
    </div>
  );
};

export default About;
