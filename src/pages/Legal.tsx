import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div className="min-h-screen bg-black text-zinc-300 font-sans flex flex-col">
        <header className="px-8 py-6 flex items-center justify-between sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/5">
            <Link to="/" className="text-xl font-bold tracking-tight text-white uppercase letter-spacing-2">SABER</Link>
        </header>
        <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
            <div className="text-sm leading-relaxed text-zinc-400 space-y-4">
                {children}
            </div>
        </main>
        <footer className="py-6 text-center text-zinc-500 text-xs border-t border-white/5">
            Made with <span className="text-red-500">❤️</span> by Stark Protocol S4
        </footer>
    </div>
);

export const PrivacyPolicy = () => (
    <Layout title="Privacy Policy">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
            At Saber (operated by Stark Protocol S4), we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information in compliance with Indian payment regulations and data protection laws.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">1. Information We Collect</h2>
        <p>
            We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, phone number, professional details, and other information you choose to provide.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">2. How We Use Your Information</h2>
        <p>
            We use the information we collect to provide, maintain, and improve our services, including facilitating connections between candidates and employers, processing payments via Razorpay, and communicating with you.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">3. Information Sharing</h2>
        <p>
            We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">4. Contact Us</h2>
        <p>
            If you have any questions about this Privacy Policy, please contact us at support@starkprotocol.com.
        </p>
    </Layout>
);

export const TermsAndConditions = () => (
    <Layout title="Terms and Conditions">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">1. Acceptance of Terms</h2>
        <p>
            By accessing and using Saber, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">2. Use of Service</h2>
        <p>
            You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">3. Payments and Refunds</h2>
        <p>
            Payments for premium plans are processed securely via Razorpay. Refund requests are subject to our Refund and Cancellation Policy.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">4. Limitation of Liability</h2>
        <p>
            Stark Protocol S4 shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">5. Governing Law</h2>
        <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, India.
        </p>
    </Layout>
);

export const RefundPolicy = () => (
    <Layout title="Refund and Cancellation Policy">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">No Refunds</h2>
        <p>
            All sales are final. We do not offer refunds on subscription payments or one-time purchases once the transaction is completed, except as explicitly required by applicable Indian consumer protection laws.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">Cancellations</h2>
        <p>
            You may cancel your subscription at any time through your account settings. Your access to premium features will continue until the end of the current billing period, after which it will expire. No partial refunds will be issued for unused time.
        </p>

        <h2 className="text-lg font-semibold text-white mt-8 mb-2">Contact Us</h2>
        <p>
            If you believe you have been charged in error or have any questions about our Refund and Cancellation Policy, please contact us at support@starkprotocol.com.
        </p>
    </Layout>
);

export const ShippingPolicy = () => (
    <Layout title="Shipping Policy">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p className="font-semibold text-white mt-4">
            Not Applicable.
        </p>
        <p>
            Saber is a digital platform providing software services. We do not sell or ship physical goods. Therefore, no shipping or delivery policy is applicable to our services. Access to purchased digital features is instantaneous upon successful payment.
        </p>
    </Layout>
);

export const Contact = () => (
    <Layout title="Contact Us">
        <p>
            We are here to help. If you have any questions, concerns, or feedback, please reach out to us using the details below.
        </p>

        <div className="mt-8 p-6 border border-white/10 rounded-lg bg-white/5">
            <h3 className="text-lg font-semibold text-white">Customer Support</h3>
            <div className="mt-4 space-y-2">
                <p>
                    <span className="text-zinc-500 block text-xs uppercase tracking-wider mb-1">Email</span>
                    <a href="mailto:support@starkprotocol.com" className="text-white hover:underline">support@starkprotocol.com</a>
                </p>
                <p className="mt-4">
                    <span className="text-zinc-500 block text-xs uppercase tracking-wider mb-1">Registered Address</span>
                    <span className="text-white">
                        Stark Protocol S4<br />
                        Bangalore<br />
                        India
                    </span>
                </p>
            </div>
        </div>
    </Layout>
);
