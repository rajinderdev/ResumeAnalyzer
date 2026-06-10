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

export default function TermsOfService({ auth }) {
    return (
        <>
            <Head title="Terms of Service" />
            <div className="min-h-screen bg-white">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <section className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 py-16 lg:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <ScrollReveal animation="fade-in-up">
                            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Terms of Service</h1>
                            <p className="text-teal-200 text-sm">Last updated: June 10, 2026</p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <ScrollReveal animation="fade-in-up">
                        <p className="text-gray-600 leading-relaxed mb-10">
                            Welcome to CVPilot. These Terms of Service ("Terms") govern your access to and use of the CVPilot platform, including our website, applications, and services. By accessing or using CVPilot, you agree to be bound by these Terms. If you do not agree, please do not use our services.
                        </p>
                    </ScrollReveal>

                    <Section title="1. Acceptance of Terms">
                        <p>By creating an account or using CVPilot in any way, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <Link href="/privacy-policy" className="text-teal-600 hover:text-teal-700 font-medium">Privacy Policy</Link>. If you are using CVPilot on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.</p>
                    </Section>

                    <Section title="2. Description of Service">
                        <p>CVPilot is an AI-powered resume analysis platform that provides:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Automated resume scoring against ATS (Applicant Tracking System) standards</li>
                            <li>Keyword analysis and optimization suggestions</li>
                            <li>Formatting and structure recommendations</li>
                            <li>Resume building tools</li>
                            <li>Score tracking across resume iterations</li>
                        </ul>
                        <p>Our service is designed to provide guidance and suggestions. We do not guarantee employment outcomes, interview invitations, or job placements as a result of using CVPilot.</p>
                    </Section>

                    <Section title="3. User Accounts & Registration">
                        <p>To access certain features, you must create an account. When registering, you agree to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide accurate, current, and complete information</li>
                            <li>Maintain and promptly update your account information</li>
                            <li>Keep your password secure and confidential</li>
                            <li>Accept responsibility for all activity under your account</li>
                            <li>Notify us immediately of any unauthorized access</li>
                        </ul>
                        <p>We reserve the right to suspend or terminate accounts that violate these Terms or that we reasonably believe are being used fraudulently.</p>
                    </Section>

                    <Section title="4. User Content & Resume Data">
                        <p><strong>Ownership:</strong> You retain all ownership rights to the resumes and content you upload to CVPilot. We do not claim ownership of your content.</p>
                        <p><strong>License Grant:</strong> By uploading content, you grant CVPilot a limited, non-exclusive license to process, analyze, and store your content solely for the purpose of providing our services to you.</p>
                        <p><strong>Responsibility:</strong> You are solely responsible for the accuracy and legality of content you upload. Do not upload resumes or documents that contain false information, content you do not have the right to share, or material that violates any law.</p>
                        <p><strong>AI Analysis:</strong> Our AI-generated analysis and recommendations are provided as suggestions only. You are responsible for reviewing and deciding which suggestions to implement.</p>
                    </Section>

                    <Section title="5. Acceptable Use Policy">
                        <p>You agree not to use CVPilot to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Violate any applicable law, regulation, or third-party rights</li>
                            <li>Upload malicious files, viruses, or harmful code</li>
                            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                            <li>Use automated tools (bots, scrapers) to access the platform without permission</li>
                            <li>Interfere with or disrupt the platform's infrastructure</li>
                            <li>Reverse engineer, decompile, or disassemble any part of our service</li>
                            <li>Use the service for competitive intelligence or to build a competing product</li>
                            <li>Upload content that is defamatory, obscene, or otherwise objectionable</li>
                        </ul>
                    </Section>

                    <Section title="6. Intellectual Property">
                        <p>The CVPilot platform, including its design, features, code, algorithms, branding, logos, and documentation, is the intellectual property of CVPilot and is protected by copyright, trademark, and other intellectual property laws.</p>
                        <p>You may not copy, modify, distribute, sell, or lease any part of our platform or included software, nor may you reverse engineer or attempt to extract the source code, unless laws prohibit these restrictions or you have our written permission.</p>
                    </Section>

                    <Section title="7. Disclaimer of Warranties">
                        <p>CVPilot is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not limited to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                            <li>Warranties that the service will be uninterrupted, error-free, or secure</li>
                            <li>Warranties regarding the accuracy or reliability of AI-generated analysis</li>
                            <li>Warranties that the service will meet your specific requirements</li>
                        </ul>
                        <p>Our AI analysis is based on general best practices and may not reflect the specific requirements of every employer or ATS system.</p>
                    </Section>

                    <Section title="8. Limitation of Liability">
                        <p>To the maximum extent permitted by applicable law, CVPilot and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or related to your use of the service.</p>
                        <p>In no event shall our total liability exceed the amount you have paid to CVPilot in the twelve (12) months preceding the claim, or $100, whichever is greater.</p>
                    </Section>

                    <Section title="9. Termination">
                        <p>You may terminate your account at any time by contacting us or using account deletion features in your profile settings. Upon termination:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Your right to use CVPilot will cease immediately</li>
                            <li>We will delete your uploaded resumes and analysis data within 30 days</li>
                            <li>We may retain certain information as required by law or for legitimate business purposes</li>
                        </ul>
                        <p>We reserve the right to suspend or terminate your access at any time, with or without notice, for conduct that we believe violates these Terms, is harmful to other users, or is otherwise objectionable.</p>
                    </Section>

                    <Section title="10. Governing Law">
                        <p>These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.</p>
                    </Section>

                    <Section title="11. Changes to Terms">
                        <p>We reserve the right to modify these Terms at any time. When we make material changes, we will update the "Last updated" date at the top of this page and, where appropriate, notify you via email or through the platform. Your continued use of CVPilot after changes are posted constitutes your acceptance of the revised Terms. If you do not agree to the updated Terms, you should discontinue use of the service.</p>
                    </Section>

                    <Section title="12. Contact Information">
                        <p>If you have questions or concerns about these Terms of Service, please contact us:</p>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mt-4">
                            <p className="font-semibold text-gray-900">CVPilot Legal Team</p>
                            <p>Email: legal@cvpilot.com</p>
                            <p>We aim to respond to all inquiries within 30 business days.</p>
                        </div>
                    </Section>

                    <ScrollReveal animation="fade-in-up">
                        <div className="border-t border-gray-200 pt-8 mt-12 text-center">
                            <p className="text-sm text-gray-500">
                                See also our{' '}
                                <Link href="/privacy-policy" className="text-teal-600 hover:text-teal-700 font-medium">
                                    Privacy Policy
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
