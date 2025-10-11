import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export function PrivacyPolicy(){
    return(
        <div>
            <div>
                <SiteHeader/>
            </div>
            <div className="d-flex mt-28 ms-4 fs-1 justify-center text-center fw-bold">
                <span className="bi bi-shield-fill-exclamation">
                   &nbsp; Privacy Policy
                </span>
            </div>
            <div className="mt-20 ms-4">
                <div className="fs-5 fw-bold">1. Introduction</div>
                 <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> These Privacy Policy outlines the types of personal information we collect, how we use and protect this information, and your choice regarding the collection and use of your data.</li>
                    <li className="ms-4"><strong>●</strong> By using our website, you agree to the terms outlined in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our website.</li>
                 </ol>
                 <div className="fs-5 fw-bold mt-3">2. Information We Collect</div>
                 <div className="fs-6 fw-bold mt-3">2.1 Personal Information</div>
                 <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> We may collect personal information directly from you, such as your name, email address, and other contact details, when you interact with our website,subscribe to our newsletter, or use our services</li>
                 </ol>
                 <div className="fs-6 fw-bold mt-4">2.2 Automatically Collected Information</div>
                 <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> We may automatically collect information about your device and how you interact with our website. This information may include your IP address, browser type, device identifers, and pages visited</li>
                 </ol>

                  <div className="fs-5 fw-bold mt-3">3. Use of Information</div>
                 <div className="fs-6 fw-bold mt-3">3.1 How We Use Your Information</div>
                 <div className="mt-3">We use the collected information for various purposes, including:</div>
                 <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> Providing and improving our services</li>
                    <li className="ms-4 mt-1"><strong>●</strong> Sending newsletters or promotional materials</li>
                    <li className="ms-4 mt-1"><strong>●</strong> Analyzing website usage and performance</li>
                    <li className="ms-4 mt-1"><strong>●</strong> Personalizing user experience</li>
                    <li className="ms-4 mt-1"><strong>●</strong> Responding to user inquiries or requests</li>
                 </ol>
                 <div className="fs-6 fw-bold mt-4">3.2 Sharing Information</div>
                 <ol>
                    <li className="ms-4 mt-3"> We do not sell, trade or transfer your personal information to third party without your consent,except as outlined in the Privacy Policy or as required by law</li>
                 </ol>
                 <div className="fs-6 fw-bold mt-4">3.3 Security</div>
                 <ol>
                    <li className="ms-4 mt-3 mb-20"> We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security</li>
                 </ol>
            </div> 
            <div>
                <SiteFooter/>
            </div>   
           
        </div>
    )
}