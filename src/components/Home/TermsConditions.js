import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export function TermsCondition(){
    return(
        <div>
            <div>
                <SiteHeader/>
            </div>
            <div className="d-flex mt-28 ms-4 fs-1 justify-center text-center fw-bold">
                <span className="bi bi-file-earmark-text">
                    Terms and Conditions
                </span>
            </div>
            <div className="mt-20 ms-4">          
                <div className="fs-5 fw-bold">1. Introduction / Acceptance</div>
                 <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> These Terms & Conditions (“Terms”) govern your use of the website rathnabhoomidevelopers.in (the “Website”) and any services offered through it by Rathnabhoomi Developers (the “Company”, “we”, “us”).</li>
                    <li className="ms-4"><strong>●</strong> By accessing or using the Website, you agree to be bound by these Terms (and any policies referenced herein). If you do not accept them, do not use the Website.</li>
                 </ol>
                 <div className="fs-5 fw-bold mt-4">2. Changes to Terms</div>
                  <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> We reserve the right to modify, update or change these Terms at any time without prior notice.</li>
                    <li className="ms-4"><strong>●</strong> The updated Terms will be posted on the Website, and your continued use after such posting constitutes acceptance.</li>
                 </ol>
                 <div className="fs-5 fw-bold mt-4">3. Intellectual Property</div>
                  <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> You may not reproduce, modify, distribute, republish, upload, transmit, or otherwise use the content in whole or in part without prior written permission from us (except for viewing or personal, noncommercial use as allowed).</li>
                    <li className="ms-4"><strong>●</strong> If you believe any content violates your rights, contact us for removal or resolution..</li>
                 </ol>
                 <div className="fs-5 fw-bold mt-4">4. Inquiries, Submissions & Leads</div>
                  <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> When you send us inquiries (e.g. through contact forms, email), you grant permission for us to use your name, contact information, and messages to respond or process your request.</li>
                    <li className="ms-4"><strong>●</strong> You represent that the information you provide is accurate, current, and lawful.</li>
                    <li className="ms-4"><strong>●</strong> We may store and use the submitted data in accordance with our Privacy Policy.</li>
                 </ol>
                 <div className="fs-5 fw-bold mt-4">5. Limitation of Liability</div>
                  <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> To the maximum extent permitted by law, in no event shall the Company, its directors, employees, agents, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages (including loss of profits, data, business opportunities) arising from your use of or inability to use the Website or reliance on any content.</li>
                    <li className="ms-4"><strong>●</strong> Our total aggregate liability (if any) shall not exceed the amount you have paid (if any) for use of services via the Website, or a minimal nominal sum if no payment is involved.</li>
                 </ol>
                 <div className="fs-5 fw-bold mt-4">6. Indemnification</div>
                  <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> You agree to indemnify, defend, and hold harmless the Company, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, losses, damages, costs, or expenses (including legal fees) arising out of:</li>
                    <li className="ms-4"><strong>(a)</strong> your breach of these Terms;</li>
                    <li className="ms-4"><strong>(b)</strong> your use of the Website;</li>
                    <li className="ms-4"><strong>(c)</strong> your submitting content or materials;</li>
                    <li className="ms-4"><strong>(d)</strong> your violation of any law or third-party rights.</li>
                 </ol>
                 <div className="fs-5 fw-bold mt-4">7. Third-Party Links / Services</div>
                  <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> The Website may contain links to third-party websites, resources or services that are not owned or controlled by us.</li>
                    <li className="ms-4"><strong>●</strong> We are not responsible for their content, accuracy, privacy practices, or any consequences of your use of those third-party sites.</li>
                    <li className="ms-4"><strong>●</strong> Inclusion of any link does not imply endorsement by us.</li>
                 </ol>
                 <div className="fs-5 fw-bold mt-4 ">08. Termination / Suspension</div>
                  <ol>
                    <li className="ms-4 mt-3"><strong>●</strong> We reserve the right to suspend or terminate your access (temporarily or permanently) to the Website or parts thereof, without notice, for any conduct we deem in violation of these Terms or harmful.</li>
                    <li className="ms-4 mb-20"><strong>●</strong> On termination, all rights granted to you under these Terms will cease immediately.</li>
                 </ol>
            </div>
            <div>
                <SiteFooter/>
            </div>
        </div>
    )
}