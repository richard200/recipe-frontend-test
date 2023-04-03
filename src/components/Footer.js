import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer bg-dark">
      <div className="container">
        <div className="row ">
        <div className="col">
                <h2>Project Members</h2>
                    <li href="#">Richard Ngeti</li>
                    <li href="#">Saviour Khalwale</li>
                    <li href="#">Richard Okongo</li>
                    <li href="#">Victor Aketch</li>
                    </div>
                    <div className="col">
                <h2>Services</h2>
                    <li href="#">Backend</li>
                    <li href="#">Frontend</li>
                    <li href="#">Development</li>
                    <li href="#">Design</li>
               </div>
               <div className="col">
                <h2>Contact Us</h2>
                    <li href="#">+254 717445 204</li>
                    <li href="#">+254 790844 918</li>
                    <li href="#">+254 720120 031</li>
                    <li href="#">+254 456789 090</li>
               </div>
               <div className="col">
                <h2>Social</h2>
                    <li href="#" className="fab fa-facebook-f">Facebook</li>
                    <li href="#" className="fab fa-instagram">Instagram</li>
                    <li href="#"  className="fab fa-youtube" >Youtube</li>
                    <li href="#" className="fab fa-twitter" >Twitter</li>
              </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} THICC MEMES | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Footer;