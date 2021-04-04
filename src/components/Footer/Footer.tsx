import React from 'react'
import styles from './Footer.module.css'

//todo: implement footer
const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div
        onClick={() => {
          window.scrollTo(0, 0)
        }}
        className={styles.backToTop}
      >
        Back to top
      </div>
      <div className={styles.navTop}>
        <div className={styles.container}>
          <div>
            <h4>Get to know us</h4>
            <p>List of</p>
            <p>Careers</p>
            <p>Blog</p>
            <p>About Amazon</p>
            <p>Sustainability</p>
            <p>Investor Relations</p>
            <p>Amazon Devices</p>
            <p>Amazon Tours</p>
          </div>
          <div>
            <h4>Make Money with Us</h4>
            <p>Sell products on Amazon</p>
            <p>Sell apps on Amazon</p>
            <p>Become an Affiliate</p>
            <p>Advertise Your Products</p>
            <p>Self-Publish with Us</p>
            <p>Host an Amazon Hub</p>
            <p>›See More Make Money with Us</p>
          </div>
          <div>
            <h4>Amazon Payment Products</h4>
            <p>Amazon Business Card</p>
            <p>Shop with Points</p>
            <p>Reload Your Balance</p>
            <p>Amazon Currency Converter</p>
          </div>
          <div>
            <h4>Let Us Help You</h4>
            <p>Amazon and COVID-19</p>
            <p>Your Account</p>
            <p>Your Orders</p>
            <p>Shipping Rates & Policies</p>
            <p>Returns & Replacements</p>
            <p>Manage Your Content and Devices</p>
            <p>Amazon Assistant</p>
            <p>Help</p>
          </div>
        </div>
        <div className={styles.logo}>
          <img src={'http://pngimg.com/uploads/amazon/amazon_PNG11.png'} alt={'logo'} />
        </div>
      </div>
      <div className={styles.navBottom}>
        <div className={styles.container}>
          <div className={styles.navItem}>
            <h4>Amazon Music</h4>
            <p>Stream millions of songs</p>
          </div>
          <div className={styles.navItem}>
            <h4>Amazon Advertising</h4>
            <p>Find, attract, and engage customers</p>
          </div>
          <div className={styles.navItem}>
            <h4>6pm</h4>
            <p>Score deals on fashion brands</p>
          </div>
          <div className={styles.navItem}>
            <h4>AbeBooks</h4>
            <p>Books, art & collectibles</p>
          </div>
          <div className={styles.navItem}>
            <h4>ACX</h4>
            <p>Audiobook Publishing Made Easy</p>
          </div>
          <div className={styles.navItem}>
            <h4>Alexa</h4>
            <p>Actionable Analytics for the Web</p>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.navItem}>
            <h4>Sell on Amazon</h4>
            <p>Start a Selling Account</p>
          </div>
          <div className={styles.navItem}>
            <h4>Amazon Business</h4>
            <p>Everything For Your Business</p>
          </div>
          <div className={styles.navItem}>
            <h4>AmazonGlobal</h4>
            <p>Ship Orders Internationally</p>
          </div>
          <div className={styles.navItem}>
            <h4>Home Services</h4>
            <p>Experienced Pros Happiness Guarantee</p>
          </div>
          <div className={styles.navItem}>
            <h4>Amazon Web Services</h4>
            <p>Scalable Cloud Computing Services</p>
          </div>
          <div className={styles.navItem}>
            <h4>Audible</h4>
            <p>Listen to Books & Original Audio Performances</p>
          </div>
        </div>
        <div className={styles.conditions}>
          <p>Conditions of Use</p>
          <p>Privacy Notice</p>
          <p>Interest-Based Ads</p>
          <span>© 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
