'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { CheckCircle2, Package, Headset, RefreshCcw, Palette, Megaphone, BarChart3, Truck } from "lucide-react";

function SubmissionBanner() {
  const searchParams = useSearchParams()
  const [showBanner, setShowBanner] = useState(false)
  useEffect(() => {
    if (searchParams.get('submitted') === '1') setShowBanner(true)
  }, [searchParams])
  if (!showBanner) return null
  return (
    <div className="bg-green-600/20 text-green-300 border border-green-600/40 px-4 py-3 text-sm">
      <div className="container flex items-center justify-between gap-4">
        <p>Thanks! Your request was sent. We’ll get back to you shortly.</p>
        <button onClick={() => setShowBanner(false)} className="btn-secondary">Close</button>
      </div>
    </div>
  )
}

export default function HomePage() {
  const values = [
    { title: 'Empowerment', desc: 'We amplify youth-driven brands with premium presentation.' },
    { title: 'Simplicity', desc: 'One partner for packaging, merch, logistics, and visibility.' },
    { title: 'Scalability', desc: 'Restocking systems and ops that grow with your demand.' },
  ] as const

  const services = [
    { title: 'Branded Packaging', desc: 'Custom bags, cups, containers, boxes' },
    { title: 'Merch', desc: 'Uniforms, accessories, drop-ready apparel' },
    { title: 'Smart Logistics', desc: 'Inventory tracking, delivery, auto-replenishment' },
    { title: 'Brand Visibility', desc: 'TikTok assets, Threads strategy, youth engagement' },
  ] as const

  const tiers = [
    { name: 'Basic', price: '$199/mo', features: ['Starter packaging set', 'Email support', 'Monthly restock plan'] },
    { name: 'Pro', price: '$499/mo', features: ['Custom packaging + merch', 'Priority support', 'Bi-weekly logistics'] },
    { name: 'Elite', price: '$999/mo', features: ['Advanced logistics', 'Campaign assets', 'Weekly restock + reporting'] },
  ] as const

  return (
    <main>
      <Suspense fallback={null}>
        <SubmissionBanner />
      </Suspense>

      <section className="relative section overflow-hidden min-h-[70vh] flex items-center">
        <img src="/images/collage-hero.svg" alt="Packaging and merch collage" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="container relative">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-heading font-bold tracking-tight"
            >
              Brand It. Live It. Scale It.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-lg text-white/80"
            >
              Your all-in-one branding and logistics partner for youth-led businesses.
            </motion.p>
            <div className="mt-8 flex gap-4">
              <Link href="#contact" className="btn-primary">Start Your Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About + Mission */}
      <section id="about-us" className="section">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-heading font-semibold">About PulseBrand Solutions</h2>
            <p className="mt-4 text-white/80">
              PulseBrand Solutions is a creative and logistics-focused partner dedicated to building powerful brand identities and scalable restocking systems for youth-driven businesses. We believe every brand has a unique story — and we’re here to make sure yours stands out.
            </p>
            <p className="mt-4 text-white/80">
              From curated packaging and apparel to smart logistics and brand visibility, we provide end-to-end solutions tailored to your goals.
            </p>
            <a href="#contact" className="btn-secondary mt-6 inline-flex">Work With Us</a>
          </div>
          <div>
            <img src="/images/about-illustration.svg" alt="Branding and logistics" className="rounded-xl border border-white/10 bg-white/5" />
          </div>
        </div>
        <div className="container">
          <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <h3 className="text-2xl font-heading font-semibold">Our Mission</h3>
            <p className="mt-3 text-white/80 max-w-3xl mx-auto">
              At PulseBrand Solutions, our mission is to empower youth-driven businesses with innovative branding and seamless logistics that amplify their presence and drive measurable growth.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold">Services</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-xl border border-white/10 p-6 bg-white/5">
                <h3 className="text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold">Pricing</h2>
          <p className="mt-2 text-white/70">Choose the plan that fits your brand’s vision. Start simple. Scale big.</p>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {/* Standard Plan */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-heading font-semibold">Standard</h3>
              <p className="text-white/70">Perfect for starting brands</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3"><Package className="size-5 text-neonBlue mt-0.5"/><span className="text-white/80">Custom Brand Packaging Design (Basic set)</span></div>
                <div className="flex items-start gap-3"><Headset className="size-5 text-neonGreen mt-0.5"/><span className="text-white/80">Email Support</span></div>
                <div className="flex items-start gap-3"><RefreshCcw className="size-5 text-neonPink mt-0.5"/><span className="text-white/80">Monthly Packaging Restock Coordination</span></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="size-5 text-neonBlue mt-0.5"/><span className="text-white/80">Dedicated Brand Strategy Consultation (Initial)</span></div>
                <div className="flex items-start gap-3"><Truck className="size-5 text-neonGreen mt-0.5"/><span className="text-white/80">Eco-Friendly Material Options</span></div>
              </div>
              <a href="#contact" className="btn-primary mt-6 inline-flex">Contact Us</a>
            </div>

            {/* Premium Plan */}
            <div className="relative rounded-2xl border border-neonBlue/40 bg-white/10 p-6 shadow-[0_0_24px_rgba(0,229,255,0.12)]">
              <span className="absolute -top-3 right-4 text-xs bg-neonBlue text-black px-2 py-1 rounded-full">Coming Soon</span>
              <h3 className="text-xl font-heading font-semibold">Premium</h3>
              <p className="text-white/70">For scaling brands that want it all</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3"><Package className="size-5 text-neonBlue mt-0.5"/><span className="text-white/80">Fully Customized Packaging & Merchandise Line</span></div>
                <div className="flex items-start gap-3"><Headset className="size-5 text-neonGreen mt-0.5"/><span className="text-white/80">Priority Support & Dedicated Account Manager</span></div>
                <div className="flex items-start gap-3"><RefreshCcw className="size-5 text-neonPink mt-0.5"/><span className="text-white/80">Bi-Weekly Logistics & Inventory Monitoring</span></div>
                <div className="flex items-start gap-3"><Palette className="size-5 text-neonBlue mt-0.5"/><span className="text-white/80">Advanced Branding Elements (logo optimization, color palette)</span></div>
                <div className="flex items-start gap-3"><Megaphone className="size-5 text-neonGreen mt-0.5"/><span className="text-white/80">Campaign Assets & Social Media Integration</span></div>
                <div className="flex items-start gap-3"><BarChart3 className="size-5 text-neonPink mt-0.5"/><span className="text-white/80">Monthly Performance Reporting & Optimization</span></div>
                <div className="flex items-start gap-3"><Truck className="size-5 text-neonBlue mt-0.5"/><span className="text-white/80">Global Sourcing & Exclusive Materials</span></div>
              </div>
              <a href="#contact" className="btn-secondary mt-6 inline-flex">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold">Partners</h2>
          <p className="mt-2 text-white/70">Coming soon — we work with local roasters, food collectives, and streetwear labels.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 opacity-80">
            <div className="h-16 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">Logo</div>
            <div className="h-16 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">Logo</div>
            <div className="h-16 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">Logo</div>
            <div className="h-16 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">Logo</div>
          </div>
        </div>
      </section>

      <section id="reviews" className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold">Reviews</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <blockquote className="rounded-xl border border-white/10 p-6 bg-white/5">
              <p>"PulseBrand helped us launch with packaging that got us 10K views in week one. Restocking is seamless."</p>
              <footer className="mt-3 text-white/70">— BrewHaus Coffee</footer>
            </blockquote>
            <blockquote className="rounded-xl border border-white/10 p-6 bg-white/5">
              <p>"They nailed our streetwear drop. Fast, stylish, scalable."</p>
              <footer className="mt-3 text-white/70">— ThreadTheory</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact: send to API so it emails your inbox */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold">Contact</h2>
          <form className="mt-6 grid gap-4 max-w-2xl" action="/api/quote" method="POST">
            <input type="text" name="company" placeholder="Company name" className="rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-neonBlue" required />
            <input type="email" name="email" placeholder="Email" className="rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-neonBlue" required />
            <select name="service" className="rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-neonBlue" required>
              <option value="Packaging">Branded Packaging</option>
              <option value="Merch">Merch</option>
              <option value="Logistics">Smart Logistics</option>
              <option value="Visibility">Brand Visibility</option>
            </select>
            <textarea name="details" placeholder="Tell us about your needs (quantities, materials, deadlines)" rows={5} className="rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-neonBlue" required />
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            <button type="submit" className="btn-primary w-fit">Send</button>
          </form>
          <p className="mt-3 text-sm text-white/60">Emails will go to QUOTE_INBOX (set in .env.local). Add RESEND_API_KEY to send via Resend.</p>
        </div>
      </section>

      <footer className="section pt-0">
        <div className="container border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-white/70">
          <div>
            <p>© 2025 PulseBrand Solutions</p>
          </div>
          <nav className="flex gap-4">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">TikTok</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </nav>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Services</a>
            <a href="#" className="hover:text-white">Pricing</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
