"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Lock, Eye, AlertTriangle, CheckCircle2, XCircle,
  ArrowRight, ChevronDown, ChevronRight, ExternalLink,
  Server, Globe, Database, Cpu, Cloud, Zap, Users, Target,
  TrendingUp, Calendar, Clock, DollarSign, BarChart3,
  Layers, FileCheck, Code, Palette, Smartphone,
  Menu, X, Mail, Phone, Building2, ShieldCheck,
  ArrowUpRight, Briefcase, Scale, Settings, FileText
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

/* ============================================================
   PASSWORD GATE COMPONENT
   ============================================================ */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "IDC2026!") {
      sessionStorage.setItem("idc-unlocked", "true");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#191c1f] flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-3">
              IDC Board Presentation
            </h1>
            <p className="text-[#8d969e] text-base leading-relaxed">
              Digital Transformation & Infrastructure Modernization<br />
              Industrial Development Corporation of South Africa
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <motion.div
              animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="relative mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Enter access code"
                  className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder:text-[#8d969e] text-center text-lg tracking-widest focus:outline-none focus:border-white/30 transition-colors"
                  autoFocus
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d969e]" />
              </div>
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#e23b4a] text-sm mb-4"
              >
                Invalid access code. Please try again.
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-white text-[#191c1f] font-medium text-base rounded-full hover:opacity-90 transition-opacity"
            >
              Unlock Presentation
            </button>
          </form>

          <p className="text-[#505a63] text-xs mt-8">
            Confidential — For IDC Board Members Only<br />
            Prepared by HexStrike AI Cybersecurity · April 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   NAVIGATION COMPONENT
   ============================================================ */
function Navigation({ activeSection }: { activeSection: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "executive-summary", label: "Executive Summary" },
    { id: "security", label: "Security Assessment" },
    { id: "modernization", label: "Modernization" },
    { id: "project-plan", label: "Project Plan" },
    { id: "ux-flow", label: "New Portal UX" },
    { id: "investment", label: "Investment & ROI" },
    { id: "dashboard", label: "Live Dashboard" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#e0e0e0]/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#191c1f] flex items-center justify-center">
              <span className="text-white font-bold text-sm">IDC</span>
            </div>
            <span className="font-medium text-[#191c1f] text-sm hidden sm:block">
              Digital Transformation
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-[#191c1f] text-white"
                    : "text-[#505a63] hover:text-[#191c1f] hover:bg-[#f4f4f4]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("dashboard")}
            className="hidden md:flex btn-pill btn-pill-dark text-sm !py-2.5 !px-6"
          >
            View Live Dashboard
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-[#f4f4f4] transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-3 rounded-xl text-base font-medium text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-[#191c1f] text-white"
                      : "text-[#505a63] hover:bg-[#f4f4f4]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("dashboard")}
                className="mt-4 btn-pill btn-pill-dark text-base"
              >
                View Live Dashboard
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   SECTION FADE IN HOOK
   ============================================================ */
function useSectionObserver(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("overview");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          setVisibleSections((prev) => new Set(prev).add(entry.target.id));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-20% 0px -70% 0px",
    });

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        fadeObserver.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      fadeObserver.disconnect();
    };
  }, [sectionIds]);

  return { activeSection, visibleSections };
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroSection() {
  return (
    <section id="overview" className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #191c1f 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="mb-6 text-xs font-medium tracking-wider uppercase px-4 py-1.5 border-[#c9c9cd] text-[#505a63]">
            Board Presentation · April 2026
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-medium text-[#191c1f] leading-[1.05] tracking-tight mb-6">
            Reimagining IDC&apos;s
            <br />
            <span className="text-[#505a63]">Digital Infrastructure</span>
          </h1>

          <p className="text-lg md:text-xl text-[#8d969e] max-w-2xl mx-auto leading-relaxed mb-10">
            A comprehensive strategy to modernize the Industrial Development Corporation&apos;s
            technology platform — from security hardening to a complete architectural transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#executive-summary" className="btn-pill btn-pill-dark">
              Explore the Vision
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#dashboard" className="btn-pill btn-pill-outline">
              View Live Dashboard
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Key stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "7.2/10", label: "Current Security Score", color: "#ec7e00" },
            { value: "9.5/10", label: "Target Security Score", color: "#00a87e" },
            { value: "320%", label: "5-Year ROI", color: "#494fdf" },
            { value: "80%", label: "Vulnerability Reduction", color: "#00a87e" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-medium tracking-tight" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm text-[#8d969e] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   EXECUTIVE SUMMARY SECTION
   ============================================================ */
function ExecutiveSummarySection({ visible }: { visible: boolean }) {
  return (
    <section id="executive-summary" className="bg-[#f4f4f4] py-24 md:py-32">
      <div className={`max-w-[1440px] mx-auto px-6 md:px-8 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Badge variant="outline" className="mb-4 text-xs font-medium tracking-wider uppercase px-4 py-1.5 border-[#c9c9cd] text-[#505a63]">
          01 — Executive Summary
        </Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#191c1f] tracking-tight leading-tight mb-6 max-w-3xl">
          Why IDC Needs Digital Transformation Now
        </h2>
        <p className="text-lg text-[#505a63] max-w-2xl leading-relaxed mb-16">
          As South Africa&apos;s primary development finance institution, the IDC handles sensitive applicant data and financial transactions. The current platform presents unacceptable risks for a government entity of this scale.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Public Trust at Stake",
              description: "The IDC website is the primary interface for citizens and businesses seeking funding. Security incidents would directly impact investor confidence and international partnerships.",
              color: "#e23b4a",
            },
            {
              icon: <Database className="w-6 h-6" />,
              title: "Data Sensitivity Critical",
              description: "The platform processes personal identification information, financial records, and business plans subject to POPIA, National Cybersecurity Policy, and financial regulations.",
              color: "#ec7e00",
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: "Regulatory Compliance",
              description: "Subject to POPIA, National Cybersecurity Policy, E-Government Framework, Basel III operational risk requirements, and FSCA guidelines.",
              color: "#494fdf",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 card-hover border border-transparent"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: item.color + '10', color: item.color }}>
                {item.icon}
              </div>
              <h3 className="text-xl font-medium text-[#191c1f] mb-3">{item.title}</h3>
              <p className="text-[#505a63] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Current vs Target State */}
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#e0e0e0]">
          <h3 className="text-xl md:text-2xl font-medium text-[#191c1f] mb-8">Current State vs. Target State</h3>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-5 h-5 text-[#e23b4a]" />
                <h4 className="font-medium text-[#191c1f]">Current State</h4>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Platform", value: "WordPress 6.5+ with LAMP stack" },
                  { label: "Security Rating", value: "7.2/10 (Medium Risk)" },
                  { label: "Performance", value: "2-3 second page loads, 50+ queries/page" },
                  { label: "Scalability", value: "Vertical scaling only" },
                  { label: "DMARC", value: "Quarantine policy, no subdomain coverage" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start gap-4 pb-4 border-b border-[#f4f4f4] last:border-0">
                    <span className="text-sm text-[#8d969e] whitespace-nowrap">{item.label}</span>
                    <span className="text-sm font-medium text-[#191c1f] text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-[#00a87e]" />
                <h4 className="font-medium text-[#191c1f]">Target State</h4>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Platform", value: "Strapi + Next.js + PostgreSQL" },
                  { label: "Security Rating", value: "9.5/10 (High Security)" },
                  { label: "Performance", value: "<500ms page loads, 2-3 queries/page" },
                  { label: "Scalability", value: "Horizontal auto-scaling (K8s)" },
                  { label: "DMARC", value: "Reject policy on all domains" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start gap-4 pb-4 border-b border-[#f4f4f4] last:border-0">
                    <span className="text-sm text-[#8d969e] whitespace-nowrap">{item.label}</span>
                    <span className="text-sm font-medium text-[#00a87e] text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECURITY ASSESSMENT SECTION
   ============================================================ */
function SecuritySection({ visible }: { visible: boolean }) {
  const [activeTab, setActiveTab] = useState("vulnerabilities");

  return (
    <section id="security" className="bg-white py-24 md:py-32">
      <div className={`max-w-[1440px] mx-auto px-6 md:px-8 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Badge variant="outline" className="mb-4 text-xs font-medium tracking-wider uppercase px-4 py-1.5 border-[#c9c9cd] text-[#505a63]">
          02 — Security Assessment
        </Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#191c1f] tracking-tight leading-tight mb-6 max-w-3xl">
          Comprehensive Security Audit Results
        </h2>
        <p className="text-lg text-[#505a63] max-w-2xl leading-relaxed mb-16">
          A full security assessment conducted using HexStrike AI Cybersecurity Platform v6.0, including network reconnaissance, web application vulnerability scanning, and performance evaluation.
        </p>

        {/* Security Score Banner */}
        <div className="bg-[#191c1f] rounded-2xl p-8 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-[#8d969e] text-sm font-medium mb-2">Overall Security Rating</p>
              <div className="flex items-center gap-4">
                <span className="text-5xl md:text-6xl font-medium text-white">7.2<span className="text-2xl text-[#8d969e]">/10</span></span>
                <Badge className="bg-[#ec7e00] text-white border-0 px-3 py-1 text-sm">AMBER — Medium Risk</Badge>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-medium text-white">9</div>
                <div className="text-xs text-[#8d969e]">Open Ports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-white">6</div>
                <div className="text-xs text-[#8d969e]">Risk Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-white">0</div>
                <div className="text-xs text-[#8d969e]">Critical CVEs</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Security Headers", status: "Pass", color: "#00a87e" },
              { label: "TLS/SSL", status: "A+ Rating", color: "#00a87e" },
              { label: "CSRF Protection", status: "Pass", color: "#00a87e" },
              { label: "Cloudflare WAF", status: "Active", color: "#00a87e" },
              { label: "MySQL Exposure", status: "At Risk", color: "#e23b4a" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }} />
                <div className="text-white text-sm font-medium">{item.status}</div>
                <div className="text-[#8d969e] text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="bg-[#f4f4f4] p-1 rounded-full h-auto">
            <TabsTrigger value="vulnerabilities" className="rounded-full px-5 py-2.5 text-sm data-[state=active]:bg-[#191c1f] data-[state=active]:text-white">
              Vulnerabilities
            </TabsTrigger>
            <TabsTrigger value="ports" className="rounded-full px-5 py-2.5 text-sm data-[state=active]:bg-[#191c1f] data-[state=active]:text-white">
              Port Analysis
            </TabsTrigger>
            <TabsTrigger value="visuals" className="rounded-full px-5 py-2.5 text-sm data-[state=active]:bg-[#191c1f] data-[state=active]:text-white">
              Visual Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vulnerabilities" className="mt-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#e0e0e0]">
                    <th className="text-left py-4 px-4 text-sm font-medium text-[#8d969e]">Vulnerability</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-[#8d969e]">Severity</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-[#8d969e]">Likelihood</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-[#8d969e] hidden md:table-cell">Impact</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-[#8d969e] hidden lg:table-cell">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { vuln: "MySQL Database Exposed to Internet", severity: "High", sevColor: "#e23b4a", likelihood: "Medium", impact: "Data breach, regulatory fines", timeline: "7 days" },
                    { vuln: "WordPress Author Info Disclosure", severity: "Medium", sevColor: "#ec7e00", likelihood: "High", impact: "Phishing, social engineering", timeline: "14 days" },
                    { vuln: "Outdated nginx (1.20.1)", severity: "Medium", sevColor: "#ec7e00", likelihood: "Medium", impact: "Known CVE exploitation", timeline: "30 days" },
                    { vuln: "Outdated OpenSSH (7.4)", severity: "Medium", sevColor: "#ec7e00", likelihood: "Low", impact: "Known vulnerabilities", timeline: "30 days" },
                    { vuln: "FTP Service Exposure", severity: "Low", sevColor: "#494fdf", likelihood: "Medium", impact: "Limited attack surface", timeline: "90 days" },
                    { vuln: "DMARC Subdomain Gap", severity: "Medium", sevColor: "#ec7e00", likelihood: "High", impact: "Email spoofing risk", timeline: "14 days" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[#f4f4f4] hover:bg-[#f4f4f4]/50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-[#191c1f]">{row.vuln}</td>
                      <td className="py-4 px-4">
                        <Badge className="text-white border-0 text-xs" style={{ backgroundColor: row.sevColor }}>{row.severity}</Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-[#505a63]">{row.likelihood}</td>
                      <td className="py-4 px-4 text-sm text-[#505a63] hidden md:table-cell">{row.impact}</td>
                      <td className="py-4 px-4 text-sm text-[#505a63] hidden lg:table-cell">{row.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="ports" className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { port: "21", service: "FTP", version: "vsftpd 3.0.3", state: "open", risk: "Medium" },
                { port: "22", service: "SSH", version: "OpenSSH 7.4", state: "open", risk: "Medium" },
                { port: "25", service: "SMTP", version: "Postfix", state: "open", risk: "Low" },
                { port: "53", service: "DNS", version: "BIND 9.11.4", state: "open", risk: "Medium" },
                { port: "80", service: "HTTP", version: "nginx 1.20.1", state: "open", risk: "Low" },
                { port: "443", service: "HTTPS", version: "nginx 1.20.1", state: "open", risk: "Low" },
                { port: "110", service: "POP3", version: "Dovecot", state: "open", risk: "Low" },
                { port: "143", service: "IMAP", version: "Dovecot", state: "open", risk: "Low" },
                { port: "3306", service: "MySQL", version: "10.3.38", state: "open", risk: "High" },
              ].map((item, i) => (
                <div key={i} className="border border-[#e0e0e0] rounded-xl p-5 card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-[#8d969e]" />
                      <span className="font-mono text-lg font-medium text-[#191c1f]">{item.port}</span>
                    </div>
                    <Badge
                      className="text-white border-0 text-xs"
                      style={{
                        backgroundColor: item.risk === "High" ? "#e23b4a" : item.risk === "Medium" ? "#ec7e00" : "#00a87e"
                      }}
                    >
                      {item.risk}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium text-[#191c1f]">{item.service}</div>
                  <div className="text-xs text-[#8d969e] mt-1">{item.version}</div>
                  {item.port === "3306" && (
                    <div className="mt-3 flex items-center gap-2 text-[#e23b4a] text-xs font-medium">
                      <AlertTriangle className="w-3 h-3" />
                      Database exposed to internet
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="visuals" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#f4f4f4] rounded-2xl p-6">
                <h4 className="font-medium text-[#191c1f] mb-4">Security Radar Assessment</h4>
                <div className="relative aspect-square max-w-sm mx-auto">
                  <Image
                    src="/idc_security_radar.png"
                    alt="IDC Security Radar Assessment"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="bg-[#f4f4f4] rounded-2xl p-6">
                <h4 className="font-medium text-[#191c1f] mb-4">Risk Matrix Analysis</h4>
                <div className="relative aspect-square max-w-sm mx-auto">
                  <Image
                    src="/idc_risk_matrix.png"
                    alt="IDC Risk Matrix"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Positive findings */}
        <div className="bg-[#f4f4f4] rounded-2xl p-8">
          <h3 className="text-xl font-medium text-[#191c1f] mb-6">Positive Security Controls Identified</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Strong Security Headers — Properly configured with modern standards",
              "TLS/SSL Configuration — A+ rating with strong encryption",
              "Authentication Security — CSRF protection, rate limiting",
              "Cloudflare Protection — DDoS mitigation and WAF capabilities",
              "Error Handling — No sensitive information disclosure",
              "No Critical OWASP Top 10 vulnerabilities found",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00a87e] mt-0.5 shrink-0" />
                <span className="text-sm text-[#505a63]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TECHNICAL MODERNIZATION SECTION
   ============================================================ */
function ModernizationSection({ visible }: { visible: boolean }) {
  return (
    <section id="modernization" className="bg-[#191c1f] py-24 md:py-32">
      <div className={`max-w-[1440px] mx-auto px-6 md:px-8 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Badge variant="outline" className="mb-4 text-xs font-medium tracking-wider uppercase px-4 py-1.5 border-[#505a63] text-[#8d969e]">
          03 — Technical Modernization
        </Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight mb-6 max-w-3xl">
          From Monolithic WordPress to Modern Architecture
        </h2>
        <p className="text-lg text-[#8d969e] max-w-2xl leading-relaxed mb-16">
          A complete architectural redesign moving from the current WordPress monolith to a secure, scalable, headless CMS-based system with microservices.
        </p>

        {/* Architecture Diagram */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 mb-12">
          <h3 className="text-lg font-medium text-white mb-8">Proposed Architecture</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: <Globe className="w-6 h-6" />, name: "Next.js Frontend", desc: "SSR/SSG + CDN", color: "#494fdf" },
              { icon: <Layers className="w-6 h-6" />, name: "API Gateway", desc: "GraphQL / REST", color: "#00a87e" },
              { icon: <FileText className="w-6 h-6" />, name: "Strapi CMS", desc: "Headless Content", color: "#ec7e00" },
              { icon: <Cpu className="w-6 h-6" />, name: "Microservices", desc: "Node.js Backend", color: "#e61e49" },
              { icon: <Shield className="w-6 h-6" />, name: "Auth Service", desc: "Clerk / Auth0", color: "#494fdf" },
              { icon: <Database className="w-6 h-6" />, name: "PostgreSQL", desc: "Row Level Security", color: "#00a87e" },
              { icon: <Cloud className="w-6 h-6" />, name: "Cloudflare CDN", desc: "Edge Caching", color: "#ec7e00" },
              { icon: <Settings className="w-6 h-6" />, name: "Docker + K8s", desc: "Container Orchestration", color: "#e61e49" },
              { icon: <ShieldCheck className="w-6 h-6" />, name: "WAF + DDoS", desc: "Cloudflare Enterprise", color: "#494fdf" },
              { icon: <Zap className="w-6 h-6" />, name: "Monitoring", desc: "Prometheus + Grafana", color: "#00a87e" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: item.color + '20', color: item.color }}>
                  {item.icon}
                </div>
                <div className="text-sm font-medium text-white">{item.name}</div>
                <div className="text-xs text-[#8d969e] mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why these technologies */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: "Why Headless CMS (Strapi)?",
              points: [
                "API-first design eliminates admin interface exposure",
                "Fine-grained role-based access control (RBAC)",
                "Self-hosted for data sovereignty compliance",
                "No plugin vulnerability inheritance from WordPress",
              ],
            },
            {
              title: "Why Next.js Frontend?",
              points: [
                "Server-side rendering for SEO and performance",
                "Static generation for security (no server execution)",
                "Built-in TypeScript support for type safety",
                "Automatic code splitting and optimization",
              ],
            },
            {
              title: "Why PostgreSQL over MySQL?",
              points: [
                "Row Level Security for data isolation at DB level",
                "Better concurrent connection performance",
                "Full encryption — data at rest and in transit",
                "Built-in replication and failover",
              ],
            },
            {
              title: "Why Clerk/Auth0 for Authentication?",
              points: [
                "Enterprise-grade MFA and threat detection",
                "SOC2 compliant, passwordless login options",
                "AI-powered anomaly detection built-in",
                "Short-lived JWT tokens with secure session management",
              ],
            },
          ].map((card, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-medium text-white mb-5">{card.title}</h3>
              <div className="space-y-3">
                {card.points.map((point, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00a87e] mt-1 shrink-0" />
                    <span className="text-sm text-[#8d969e] leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Performance comparison */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { metric: "Page Load", before: "2-3s", after: "<500ms", improvement: "4x faster" },
            { metric: "DB Queries", before: "50+/page", after: "2-3/page", improvement: "94% reduction" },
            { metric: "Security Score", before: "7.2/10", after: "9.5/10", improvement: "+32%" },
            { metric: "Annual Cost", before: "R 1,733K", after: "R 1,300K", improvement: "25% savings" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-sm text-[#8d969e] mb-4">{item.metric}</div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div>
                  <div className="text-xs text-[#e23b4a] mb-1">Before</div>
                  <div className="text-lg font-medium text-[#e23b4a]">{item.before}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8d969e]" />
                <div>
                  <div className="text-xs text-[#00a87e] mb-1">After</div>
                  <div className="text-lg font-medium text-[#00a87e]">{item.after}</div>
                </div>
              </div>
              <div className="text-xs text-[#00a87e] font-medium">{item.improvement}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROJECT PLAN SECTION
   ============================================================ */
function ProjectPlanSection({ visible }: { visible: boolean }) {
  const phases = [
    {
      phase: "Phase 1",
      name: "Foundation & Security",
      weeks: "Weeks 1–4",
      tasks: [
        "DMARC/SPF/DKIM implementation",
        "Infrastructure setup (Docker, Kubernetes)",
        "Database migration planning",
        "Security hardening (firewall, WAF)",
      ],
      color: "#e23b4a",
    },
    {
      phase: "Phase 2",
      name: "Backend Development",
      weeks: "Weeks 5–10",
      tasks: [
        "Strapi CMS setup and configuration",
        "Authentication service integration",
        "API gateway and microservices",
        "Content modeling and migration scripts",
      ],
      color: "#ec7e00",
    },
    {
      phase: "Phase 3",
      name: "Frontend Development",
      weeks: "Weeks 11–18",
      tasks: [
        "Next.js setup and component library",
        "Core pages development",
        "Application portal development",
        "Polish, optimization, accessibility",
      ],
      color: "#494fdf",
    },
    {
      phase: "Phase 4",
      name: "Testing & Migration",
      weeks: "Weeks 19–22",
      tasks: [
        "Security testing and pen testing",
        "Performance testing and optimization",
        "Content migration and validation",
        "UAT and bug fixes",
      ],
      color: "#00a87e",
    },
    {
      phase: "Phase 5",
      name: "Go-Live & Handover",
      weeks: "Weeks 23–28",
      tasks: [
        "Staging deployment and final testing",
        "Blue-green production deployment",
        "Intensive monitoring (2 weeks)",
        "Documentation, training, and handover",
      ],
      color: "#191c1f",
    },
  ];

  const milestones = [
    { name: "DMARC Policy Upgrade", week: "Week 1", done: false },
    { name: "Infrastructure Ready", week: "Week 4", done: false },
    { name: "Database Migration", week: "Week 8", done: false },
    { name: "CMS Configuration", week: "Week 10", done: false },
    { name: "Frontend MVP", week: "Week 16", done: false },
    { name: "Security Testing", week: "Week 19", done: false },
    { name: "Content Migration", week: "Week 21", done: false },
    { name: "UAT Sign-off", week: "Week 22", done: false },
    { name: "Go-Live", week: "Week 24", done: false },
    { name: "Project Closure", week: "Week 28", done: false },
  ];

  return (
    <section id="project-plan" className="bg-[#f4f4f4] py-24 md:py-32">
      <div className={`max-w-[1440px] mx-auto px-6 md:px-8 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Badge variant="outline" className="mb-4 text-xs font-medium tracking-wider uppercase px-4 py-1.5 border-[#c9c9cd] text-[#505a63]">
          04 — Project Plan
        </Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#191c1f] tracking-tight leading-tight mb-6 max-w-3xl">
          Full Cycle Development Plan
        </h2>
        <p className="text-lg text-[#505a63] max-w-2xl leading-relaxed mb-16">
          A 28-week comprehensive plan covering every aspect of the rebuild — from foundation infrastructure to go-live and post-launch monitoring.
        </p>

        {/* Timeline */}
        <div className="grid gap-6 mb-16">
          {phases.map((phase, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-[#e0e0e0] card-hover">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: phase.color }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#191c1f]">{phase.name}</h3>
                    <p className="text-sm text-[#8d969e]">{phase.phase} · {phase.weeks}</p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {phase.tasks.map((task, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <ChevronRight className="w-4 h-4 text-[#8d969e] shrink-0" />
                    <span className="text-sm text-[#505a63]">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Scope images */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 border border-[#e0e0e0]">
            <h4 className="font-medium text-[#191c1f] mb-4">Project Scope Breakdown</h4>
            <div className="relative aspect-[4/3]">
              <Image
                src="/idc_scope_breakdown.png"
                alt="IDC Project Scope Breakdown"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e0e0e0]">
            <h4 className="font-medium text-[#191c1f] mb-4">Sector Coverage</h4>
            <div className="relative aspect-[4/3]">
              <Image
                src="/idc_sectors.png"
                alt="IDC Sectors Coverage"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl p-8 border border-[#e0e0e0]">
          <h3 className="text-xl font-medium text-[#191c1f] mb-8">Critical Milestones</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {milestones.map((milestone, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-[#f4f4f4]">
                <div className="text-xs text-[#8d969e] mb-2">{milestone.week}</div>
                <div className="text-sm font-medium text-[#191c1f]">{milestone.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   UX FLOW SECTION
   ============================================================ */
function UXFlowSection({ visible }: { visible: boolean }) {
  return (
    <section id="ux-flow" className="bg-white py-24 md:py-32">
      <div className={`max-w-[1440px] mx-auto px-6 md:px-8 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Badge variant="outline" className="mb-4 text-xs font-medium tracking-wider uppercase px-4 py-1.5 border-[#c9c9cd] text-[#505a63]">
          05 — New Portal UX
        </Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#191c1f] tracking-tight leading-tight mb-6 max-w-3xl">
          Redesigned Client Portal Experience
        </h2>
        <p className="text-lg text-[#505a63] max-w-2xl leading-relaxed mb-16">
          A complete UX overhaul built on modern design principles — mobile-first, accessible (WCAG 2.1 AA), and optimized for users across all 11 South African official languages.
        </p>

        {/* Design principles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <ShieldCheck className="w-6 h-6" />, title: "Trust & Authority", desc: "Clean typography, institutional gravitas, and the IDC brand identity reinforce credibility at every touchpoint." },
            { icon: <Smartphone className="w-6 h-6" />, title: "Mobile-First Responsive", desc: "Layouts start at 320px and progressively enhance. Critical flows fully functional on mobile devices." },
            { icon: <Eye className="w-6 h-6" />, title: "Accessibility First", desc: "WCAG 2.1 AA compliance from day one. Keyboard navigable, screen reader compatible." },
            { icon: <Zap className="w-6 h-6" />, title: "Performance Optimized", desc: "Lazy loading, code splitting, compressed assets for 2G/3G connectivity regions." },
            { icon: <Users className="w-6 h-6" />, title: "Inclusive Design", desc: "Support for all 11 official SA languages. Grade 10 reading level. Plain language throughout." },
            { icon: <Palette className="w-6 h-6" />, title: "IDC Design System", desc: "Built on shadcn/ui primitives with Tailwind CSS, customised to IDC design tokens." },
          ].map((item, i) => (
            <div key={i} className="border border-[#e0e0e0] rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 rounded-xl bg-[#f4f4f4] flex items-center justify-center mb-5 text-[#191c1f]">
                {item.icon}
              </div>
              <h3 className="text-base font-medium text-[#191c1f] mb-2">{item.title}</h3>
              <p className="text-sm text-[#505a63] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Key user flows */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#f4f4f4] rounded-2xl p-8">
            <h3 className="text-lg font-medium text-[#191c1f] mb-6">Registration Flow (8 Steps)</h3>
            <div className="space-y-3">
              {[
                "Account Type Selection (Applicant/Student/Vendor)",
                "Personal Details (Name, ID, Email, Mobile)",
                "Email Verification (OTP Code)",
                "Phone Verification (SMS OTP)",
                "Password Creation (Strength Meter)",
                "MFA Setup (Authenticator App QR)",
                "Profile Completion (Industry, Sector, Province)",
                "Terms Acceptance (T&Cs, POPIA Consent)",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#191c1f] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-sm text-[#505a63]">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f4f4f4] rounded-2xl p-8">
            <h3 className="text-lg font-medium text-[#191c1f] mb-6">Funding Application Wizard (7 Steps)</h3>
            <div className="space-y-3">
              {[
                "Eligibility Check (Funding amount, industry, B-BBEE)",
                "Organisation Details (CIPC lookup, tax verification)",
                "Funding Request (Amount, product, purpose)",
                "Financial Information (Turnover, projections, funding history)",
                "Business Plan Upload (Documents, financial statements)",
                "Document Submission (Supporting files, certifications)",
                "Review & Submit (Summary, declaration, confirmation)",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00838F] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-sm text-[#505a63]">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation structure */}
        <div className="bg-[#191c1f] rounded-2xl p-8">
          <h3 className="text-lg font-medium text-white mb-6">Portal Navigation Structure</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Funding", items: ["Apply for Funding", "My Applications", "Find a Fund", "Funding Checklist"] },
              { title: "Portfolio", items: ["My Loans", "Repayments", "Statements", "Collateral & Covenants"] },
              { title: "Bursaries", items: ["Available Programmes", "My Applications", "Progress Reports", "Disbursements"] },
              { title: "Tenders", items: ["Active Tenders", "My Bids", "Vendor Registration", "Tender Archive"] },
              { title: "Documents", items: ["My Documents", "Shared With Me", "Upload Document"] },
              { title: "Messages", items: ["Inbox", "Sent", "Compose"] },
              { title: "Profile", items: ["Personal Details", "Organisation", "Security Settings", "Notifications"] },
              { title: "Help", items: ["FAQ", "Contact Us", "Submit a Ticket"] },
            ].map((section, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm font-medium text-white mb-3">{section.title}</div>
                <div className="space-y-2">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-[#8d969e]" />
                      <span className="text-xs text-[#8d969e]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INVESTMENT & ROI SECTION
   ============================================================ */
function InvestmentSection({ visible }: { visible: boolean }) {
  return (
    <section id="investment" className="bg-[#f4f4f4] py-24 md:py-32">
      <div className={`max-w-[1440px] mx-auto px-6 md:px-8 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Badge variant="outline" className="mb-4 text-xs font-medium tracking-wider uppercase px-4 py-1.5 border-[#c9c9cd] text-[#505a63]">
          06 — Investment & ROI
        </Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#191c1f] tracking-tight leading-tight mb-6 max-w-3xl">
          The Business Case for Transformation
        </h2>
        <p className="text-lg text-[#505a63] max-w-2xl leading-relaxed mb-16">
          A detailed financial breakdown demonstrating the clear return on investment and long-term value of the modernization initiative.
        </p>

        {/* Key ROI metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { metric: "Total Investment", value: "R 1.58M", sub: "Development costs", color: "#191c1f" },
            { metric: "Payback Period", value: "18 mo", sub: "Full cost recovery", color: "#494fdf" },
            { metric: "5-Year ROI", value: "320%", sub: "Return on investment", color: "#00a87e" },
            { metric: "Annual Savings", value: "R 433K", sub: "25% cost reduction", color: "#ec7e00" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#e0e0e0]">
              <div className="text-3xl md:text-4xl font-medium tracking-tight" style={{ color: item.color }}>{item.value}</div>
              <div className="text-sm font-medium text-[#191c1f] mt-2">{item.metric}</div>
              <div className="text-xs text-[#8d969e] mt-1">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cost breakdown */}
          <div className="bg-white rounded-2xl p-8 border border-[#e0e0e0]">
            <h3 className="text-xl font-medium text-[#191c1f] mb-6">Development Cost Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: "DMARC & Email Security", amount: "R 72,000" },
                { label: "Infrastructure Setup", amount: "R 180,000" },
                { label: "Backend Development", amount: "R 234,000" },
                { label: "Frontend Development", amount: "R 342,000" },
                { label: "Content Migration", amount: "R 123,900" },
                { label: "Security Implementation", amount: "R 145,400" },
                { label: "Testing & QA", amount: "R 142,500" },
                { label: "Deployment", amount: "R 101,100" },
                { label: "Documentation & Training", amount: "R 114,000" },
                { label: "Project Management", amount: "R 126,000" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b border-[#f4f4f4] last:border-0">
                  <span className="text-sm text-[#505a63]">{item.label}</span>
                  <span className="text-sm font-medium text-[#191c1f]">{item.amount}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t-2 border-[#191c1f]">
                <span className="text-base font-medium text-[#191c1f]">Total Development</span>
                <span className="text-base font-medium text-[#191c1f]">R 1,580,900</span>
              </div>
            </div>
          </div>

          {/* Ongoing + ROI */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-[#e0e0e0]">
              <h3 className="text-xl font-medium text-[#191c1f] mb-6">Ongoing Annual Costs</h3>
              <div className="space-y-4">
                {[
                  { label: "Security Maintenance", amount: "R 216,000/yr" },
                  { label: "DMARC Monitoring", amount: "R 78,000/yr" },
                  { label: "Performance Optimization", amount: "R 144,000/yr" },
                  { label: "Content Support", amount: "R 180,000/yr" },
                  { label: "Backup Management", amount: "R 36,000/yr" },
                  { label: "Support Tiers", amount: "R 120,000/yr" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between pb-3 border-b border-[#f4f4f4] last:border-0">
                    <span className="text-sm text-[#505a63]">{item.label}</span>
                    <span className="text-sm font-medium text-[#191c1f]">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#191c1f] rounded-2xl p-8">
              <h3 className="text-lg font-medium text-white mb-6">Return on Investment Highlights</h3>
              <div className="space-y-4">
                {[
                  { label: "Security Risk Reduction", value: "80% fewer vulnerabilities" },
                  { label: "Performance", value: "4x faster page loads" },
                  { label: "Development Efficiency", value: "60% faster feature delivery" },
                  { label: "Operational Cost", value: "25% lower ongoing costs" },
                  { label: "User Satisfaction", value: "90% positive feedback target" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-[#8d969e]">{item.label}</span>
                    <span className="text-sm font-medium text-[#00a87e]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LIVE DASHBOARD SECTION
   ============================================================ */
function DashboardSection({ visible }: { visible: boolean }) {
  return (
    <section id="dashboard" className="bg-white py-24 md:py-32">
      <div className={`max-w-[1440px] mx-auto px-6 md:px-8 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 text-xs font-medium tracking-wider uppercase px-4 py-1.5 border-[#c9c9cd] text-[#505a63]">
            07 — Live Preview
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#191c1f] tracking-tight leading-tight mb-6">
            Experience the New IDC Application Portal
          </h2>
          <p className="text-lg text-[#505a63] leading-relaxed mb-12">
            The new IDC application process is live and ready for review. This working prototype demonstrates the modern UX, streamlined application flow, and security-first architecture outlined in this presentation.
          </p>

          {/* Dashboard features */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12 text-left">
            {[
              { icon: <Code className="w-5 h-5" />, title: "Modern Tech Stack", desc: "Built with Next.js, TypeScript, and a headless CMS architecture as proposed in the modernization plan." },
              { icon: <ShieldCheck className="w-5 h-5" />, title: "Security First", desc: "Enterprise-grade authentication, input validation, and secure data handling throughout the portal." },
              { icon: <Smartphone className="w-5 h-5" />, title: "Mobile Optimized", desc: "Fully responsive design ensuring accessibility across all devices and connection speeds." },
            ].map((item, i) => (
              <div key={i} className="border border-[#e0e0e0] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[#f4f4f4] flex items-center justify-center mb-4 text-[#191c1f]">
                  {item.icon}
                </div>
                <h3 className="text-sm font-medium text-[#191c1f] mb-2">{item.title}</h3>
                <p className="text-sm text-[#505a63] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#191c1f] rounded-2xl p-10 md:p-14">
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">
              Ready to Explore?
            </h3>
            <p className="text-[#8d969e] mb-8 max-w-lg mx-auto">
              Click below to access the live IDC Application Portal prototype and experience the new platform firsthand.
            </p>
            <a
              href="https://my-app-iota-ruby-95.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-pill-white inline-flex"
            >
              Open Live Dashboard
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER COMPONENT
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-[#191c1f] py-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-xs">IDC</span>
              </div>
              <span className="text-white font-medium text-sm">Industrial Development Corporation of South Africa</span>
            </div>
            <p className="text-[#505a63] text-sm">
              Digital Transformation & Infrastructure Modernization
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#8d969e] text-sm">
              Prepared by HexStrike AI Cybersecurity
            </p>
            <p className="text-[#505a63] text-xs mt-1">
              Confidential — For IDC Board Members Only · April 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function IDCPage() {
  const getInitialLocked = useCallback(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("idc-unlocked") === "true";
    }
    return false;
  }, []);

  const [isUnlocked, setIsUnlocked] = useState(getInitialLocked);
  const sectionIds = [
    "overview", "executive-summary", "security", "modernization",
    "project-plan", "ux-flow", "investment", "dashboard"
  ];
  const { activeSection, visibleSections } = useSectionObserver(sectionIds);

  if (!isUnlocked) {
    return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation activeSection={activeSection} />
      <main className="pt-16">
        <HeroSection />
        <ExecutiveSummarySection visible={visibleSections.has("executive-summary")} />
        <SecuritySection visible={visibleSections.has("security")} />
        <ModernizationSection visible={visibleSections.has("modernization")} />
        <ProjectPlanSection visible={visibleSections.has("project-plan")} />
        <UXFlowSection visible={visibleSections.has("ux-flow")} />
        <InvestmentSection visible={visibleSections.has("investment")} />
        <DashboardSection visible={visibleSections.has("dashboard")} />
      </main>
      <Footer />
    </div>
  );
}
