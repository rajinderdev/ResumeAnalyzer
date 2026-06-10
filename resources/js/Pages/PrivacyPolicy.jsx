import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ScrollReveal from '@/Components/ScrollReveal';
import { Head, Link } from '@inertiajs/react';

function Section({ title, children }) {
    return (
        <ScrollReveal animation="fade-in-up">
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
                <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
            </div>
        </ScrollReveal>
    );
}

export default function PrivacyPolicy({ auth }) {
    return (
        <>
            <Head title="Privacy Policy" />
            <div className="min-h-screen bg-white">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-16 lg:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <ScrollReveal animation="fade-in-up">
                            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
                            <p className="text-teal-200 text-sm">Last updated: June 10, 2026</p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <ScrollReveal animation="fade-in-up">
                        <p className="text-gray-600 leading-relaxed mb-10">
                            At CVPilot, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our resume analysis platform. Please read this policy carefully. By using CVPilot, you consent to the practices described in this policy.
                        </p>
                    </ScrollReveal>

                    <Section title="1. Information We Collect">
                        <p><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password. If you sign up through a third-party provider, we may receive your name and email from that service.</p>
                        <p><strong>Resume Data:</strong> When you upload a resume for analysis, we collect the contents of your resume, including personal details, work history, education, skills, and any other information contained in the document.</p>
                        <p><strong>Usage Data:</strong> We automatically collect information about how you interact with our platform, including pages visited, features used, analysis results viewed, and timestamps of activity.</p>
                        <p><strong>Device Information:</strong> We collect browser type, operating system, IP address, and device identifiers to ensure platform compatibility and security.</p>
                    </Section>

                    <Section title="2. How We Use Your Information">
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide, maintain, and improve our resume analysis services</li>
                            <li>Analyze your resume against ATS filters and hiring best practices</li>
                            <li>Generate personalized recommendations and score breakdowns</li>
                            <li>Communicate with you about your account, updates, and support requests</li>
                            <li>Monitor and analyze usage trends to improve the platform</li>
                            <li>Detect, prevent, and address technical issues and security threats</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </Section>

                    <Section title="3. Data Storage & Security">
                        <p>We implement industry-standard security measures to protect your personal information, including encryption in transit (TLS/SSL) and at rest. Your data is stored on secure servers with restricted access controls.</p>
                        <p>While we strive to use commercially acceptable means to protect your information, no method of electronic storage or transmission over the Internet is 100% secure. We cannot guarantee absolute security but are committed to promptly notifying you and relevant authorities in the event of a data breach.</p>
                    </Section>

                    <Section title="4. Resume Data Handling">
                        <p>Your resume data is central to our service. Here is how we handle it:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Processing:</strong> Uploaded resumes are processed by our AI analysis engine to generate scores, insights, and recommendations.</li>
                            <li><strong>Storage:</strong> Resumes are stored securely and associated with your account so you can view past analyses and track improvements.</li>
                            <li><strong>No Sharing:</strong> We do not sell, rent, or share your resume content with third-party employers, recruiters, or job boards unless you explicitly opt in to such a feature.</li>
                            <li><strong>Deletion:</strong> You can delete your uploaded resumes at any time through your dashboard. Deleted resumes are permanently removed from our active systems within 30 days.</li>
                        </ul>
                    </Section>

                    <Section title="5. Cookies & Tracking">
                        <p>We use cookies and similar tracking technologies to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Essential Cookies:</strong> Required for authentication, session management, and security. These cannot be disabled.</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with CVPilot so we can improve the experience. These are anonymized where possible.</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences for future visits.</li>
                        </ul>
                        <p>You can control cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.</p>
                    </Section>

                    <Section title="6. Third-Party Services">
                        <p>We may use third-party services that collect, monitor, and analyze data to help us improve CVPilot. These services have their own privacy policies, and we encourage you to review them:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>AI/ML Providers:</strong> We may use third-party AI services to assist with resume analysis. Data sent to these providers is processed in accordance with their privacy policies and our data processing agreements.</li>
                            <li><strong>Analytics Providers:</strong> We use analytics tools to understand platform usage patterns.</li>
                            <li><strong>Payment Processors:</strong> If applicable, payment information is handled by PCI-compliant payment processors. We do not store your full credit card details.</li>
                        </ul>
                    </Section>

                    <Section title="7. Your Rights">
                        <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
                            <li><strong>Portability:</strong> Request your data in a portable, machine-readable format.</li>
                            <li><strong>Objection:</strong> Object to processing of your data for certain purposes.</li>
                            <li><strong>Withdrawal of Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
                        </ul>
                        <p>To exercise any of these rights, please contact us at the email address listed below. We will respond to requests within 30 days.</p>
                    </Section>

                    <Section title="8. Children's Privacy">
                        <p>CVPilot is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child under 16, we will take steps to delete that information promptly. If you believe a child has provided us with personal data, please contact us immediately.</p>
                    </Section>

                    <Section title="9. Changes to This Policy">
                        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by posting the updated policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically. Continued use of CVPilot after changes constitutes acceptance of the revised policy.</p>
                    </Section>

                    <Section title="10. Contact Information">
                        <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mt-4">
                            <p className="font-semibold text-gray-900">CVPilot Privacy Team</p>
                            <p>Email: privacy@cvpilot.com</p>
                            <p>We aim to respond to all inquiries within 30 business days.</p>
                        </div>
                    </Section>

                    <ScrollReveal animation="fade-in-up">
                        <div className="border-t border-gray-200 pt-8 mt-12 text-center">
                            <p className="text-sm text-gray-500">
                                See also our{' '}
                                <Link href="/terms-of-service" className="text-teal-600 hover:text-teal-700 font-medium">
                                    Terms of Service
                                </Link>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                <Footer />
            </div>
        </>
    );
}
