import { useEffect } from 'react'

export default function PrivacyPolicyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <main id="main">
      <section className="section" id="privacy">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="kicker">Legal</div>
          <h1 style={{ fontSize: 'clamp(32px,4vw,48px)', fontWeight: 200, letterSpacing: '-.03em', lineHeight: 1.05, margin: '8px 0 6px', color: 'var(--white)' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 32px' }}>
            <strong style={{ color: 'var(--gold-light)' }}>Krypton Energy Private Limited</strong>
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 13, margin: '0 0 24px' }}>
            <strong>Effective Date:</strong> 4 November 2026 &nbsp;·&nbsp; <strong>Last Updated:</strong> 4 November 2026
          </p>

          <div className="legal-body">
            <h2>1. Introduction</h2>
            <p>Welcome to <strong>Krypton Energy Private Limited</strong> ("Krypton Energy", "we", "our", or "us").</p>
            <p>At Krypton Energy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, process, and protect your information when you visit our website, contact us, submit an enquiry, request a quotation, or use any of our products and services.</p>
            <p>Our services include solar energy solutions, rooftop solar installations, battery energy storage systems, EV charging solutions, inverters, hybrid solar systems, and other smart energy solutions.</p>
            <p>By accessing or using our website, you acknowledge that you have read and understood this Privacy Policy.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following categories of information:</p>
            <h3>A. Personal Information</h3>
            <ul>
              <li>Full name</li>
              <li>Mobile number and WhatsApp number</li>
              <li>Email address</li>
              <li>Residential or business address</li>
              <li>City, state, and PIN code</li>
            </ul>
            <h3>B. Project and Technical Information</h3>
            <ul>
              <li>Average monthly electricity bill</li>
              <li>Electricity consumption details</li>
              <li>Current electrical load requirements</li>
              <li>Rooftop or installation area</li>
              <li>Property type (residential, commercial, or industrial)</li>
              <li>Solar installation preferences</li>
              <li>EV charger and battery storage requirements</li>
              <li>Other technical details voluntarily provided by you.</li>
            </ul>
            <h3>C. Automatically Collected Information</h3>
            <p>When you visit our website, certain technical information may automatically be collected, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Website traffic and usage statistics</li>
              <li>Referral sources.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information collected for the following purposes:</p>
            <ul>
              <li>To respond to your enquiries and service requests.</li>
              <li>To provide quotations and customised energy solutions.</li>
              <li>To assess your solar installation and energy requirements.</li>
              <li>To communicate regarding solar panels, battery storage, EV chargers, inverters, and related services.</li>
              <li>To schedule site inspections, consultations, and installations.</li>
              <li>To process orders and manage customer relationships.</li>
              <li>To send service updates, offers, promotional communications, and company announcements, where permitted.</li>
              <li>To improve our website, products, services, and customer experience.</li>
              <li>To comply with applicable legal and regulatory requirements.</li>
            </ul>

            <h2>4. Sharing of Information</h2>
            <p>Krypton Energy Private Limited does not sell, rent, or trade your personal information to third parties.</p>
            <p>However, we may share relevant information with trusted third parties when necessary, including:</p>
            <ul>
              <li>Installation partners and service providers.</li>
              <li>Technology, website hosting, and IT service providers.</li>
              <li>Logistics and equipment suppliers.</li>
              <li>Payment processing partners, where applicable.</li>
              <li>Professional consultants, auditors, or legal advisors.</li>
              <li>Government authorities or regulatory bodies when required by applicable law.</li>
            </ul>
            <p>Such sharing will be limited to what is reasonably necessary for the relevant purpose.</p>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>Our website may use cookies and similar technologies to improve your browsing experience, understand visitor behaviour, analyse website traffic, and enhance website performance.</p>
            <p>Cookies may help us:</p>
            <ul>
              <li>Remember your website preferences.</li>
              <li>Understand how visitors interact with our website.</li>
              <li>Improve website functionality.</li>
              <li>Measure marketing and advertising performance.</li>
            </ul>
            <p>You can manage or disable cookies through your browser settings. Please note that disabling certain cookies may affect some website functionalities.</p>

            <h2>6. Data Security</h2>
            <p>We take reasonable technical and organisational measures to protect your personal information against unauthorised access, misuse, alteration, disclosure, or loss.</p>
            <p>These measures may include secure hosting environments, access restrictions, and appropriate security practices.</p>
            <p>However, no method of electronic transmission or storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.</p>

            <h2>7. Data Retention</h2>
            <p>We retain personal information only for as long as reasonably necessary to fulfil the purposes described in this Privacy Policy, including providing services, maintaining business records, resolving disputes, and complying with applicable legal obligations.</p>
            <p>When information is no longer required, we take reasonable steps to delete or anonymise it, subject to applicable legal requirements.</p>

            <h2>8. Your Privacy Rights</h2>
            <p>Subject to applicable Indian data protection laws, you may have the right to:</p>
            <ul>
              <li>Request access to your personal information.</li>
              <li>Request correction or updating of inaccurate information.</li>
              <li>Request deletion of your personal information, where legally permissible.</li>
              <li>Withdraw consent for the processing of personal information where processing is based on consent.</li>
              <li>Raise concerns or grievances regarding the handling of your personal information.</li>
            </ul>
            <p>To exercise these rights, please contact us using the details provided in the Contact Information section below.</p>

            <h2>9. Third-Party Websites</h2>
            <p>Our website may contain links to third-party websites, platforms, or services. These websites operate independently and have their own privacy policies.</p>
            <p>Krypton Energy Private Limited is not responsible for the privacy practices, content, or security of third-party websites. We encourage visitors to review their respective privacy policies before sharing personal information.</p>

            <h2>10. Children's Privacy</h2>
            <p>Our website and services are not specifically directed towards children.</p>
            <p>We do not knowingly collect personal information from children in violation of applicable laws. If we become aware that personal information has been collected unlawfully from a child, we will take appropriate steps to address the matter in accordance with applicable legal requirements.</p>

            <h2>11. Marketing and Communications</h2>
            <p>We may use your contact details to communicate with you regarding our services, new products, offers, energy solutions, and company updates, subject to applicable consent and communication requirements.</p>
            <p>You may opt out of promotional communications at any time by contacting us or using the unsubscribe option where available.</p>
            <p>Please note that essential service-related communications may still be sent where necessary.</p>

            <h2>12. Changes to This Privacy Policy</h2>
            <p>Krypton Energy Private Limited reserves the right to update or modify this Privacy Policy from time to time to reflect changes in our business practices, website functionality, technology, or applicable laws and regulations.</p>
            <p>Any updates will be published on this page along with the revised "Last Updated" date.</p>
            <p>We encourage visitors to review this page periodically.</p>

            <h2>13. Contact Information and Grievance Redressal</h2>
            <p>If you have any questions, concerns, complaints, or requests relating to this Privacy Policy or the handling of your personal information, you may contact us using the details below:</p>
            <p><strong>Krypton Energy Private Limited</strong></p>
            <p><strong>Email:</strong> [Insert Official Company Email]<br />
            <strong>Phone:</strong> [Insert Official Contact Number]<br />
            <strong>Address:</strong> [Insert Registered Office Address]<br />
            <strong>Website:</strong> [Insert Website URL]</p>
            <p>We will make reasonable efforts to acknowledge and address your privacy-related concerns within the timelines prescribed under applicable laws.</p>

            <hr style={{ border: 0, borderTop: '1px solid var(--hair)', margin: '32px 0' }} />
            <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>© 2026 Krypton Energy Private Limited. All Rights Reserved.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
