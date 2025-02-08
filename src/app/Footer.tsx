const Footer = () => {
  return (
    <footer className="footer m-auto mt-10 w-full max-w-7xl bg-base-100 p-10 text-base-content">
      <aside>
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="2" fill="#000" />
          <path
            d="M84.9559 20.7126C85.9018 21.8415 87.5837 21.9899 88.7126 21.0441C89.8415 20.0982 89.9899 18.4163 89.0441 17.2874C88.0982 16.1585 86.4163 16.0101 85.2874 16.9559C84.1585 17.9018 84.0101 19.5837 84.9559 20.7126ZM50.3211 50.3833L87.3211 19.3833L86.6789 18.6167L49.6789 49.6167L50.3211 50.3833Z"
            fill="white"
          />
          <path
            d="M32.8367 31.9333C33.9044 30.919 33.9477 29.2311 32.9333 28.1633C31.919 27.0956 30.2311 27.0523 29.1633 28.0667C28.0956 29.081 28.0523 30.7689 29.0667 31.8367C30.081 32.9044 31.7689 32.9477 32.8367 31.9333ZM50.3625 49.6556L31.3625 29.6556L30.6375 30.3444L49.6375 50.3444L50.3625 49.6556Z"
            fill="white"
          />
          <circle cx="50" cy="50" r="2" fill="#D9D9D9" />
          <path
            d="M50.5157 73H48.1831L44.1157 61.9928H46.506L48.7807 69.0675C48.9221 69.5301 49.1149 70.2241 49.359 71.1494L49.5325 70.4747L49.9181 69.0675L52.1735 61.9928H54.5639L50.5157 73Z"
            fill="white"
          />
        </svg>
        <p>
          Vadanam Industries Ltd.
          <br />
          Providing reliable tech since 2000
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <h2 className="link-hover link">Branding</h2>
        <h2 className="link-hover link">Design</h2>
        <h2 className="link-hover link">Marketing</h2>
        <h2 className="link-hover link">Advertisement</h2>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <h2 className="link-hover link">About us</h2>
        <h2 className="link-hover link">Contact</h2>
        <h2 className="link-hover link">Jobs</h2>
        <h2 className="link-hover link">Press kit</h2>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <h2 className="link-hover link">Terms of use</h2>
        <h2 className="link-hover link">Privacy policy</h2>
        <h2 className="link-hover link">Cookie policy</h2>
      </nav>
    </footer>
  );
};

export default Footer;
