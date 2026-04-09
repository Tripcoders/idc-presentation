"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Lock, Eye, AlertTriangle, CheckCircle2, XCircle,
  ExternalLink, Server, Globe, Database, Cpu, Cloud, Zap,
  Users, Target, TrendingUp, DollarSign, BarChart3, Layers,
  Code, Palette, Smartphone, Menu, X, ShieldCheck,
  ArrowUpRight, Briefcase, Scale, Settings, FileText,
  Activity, Clock, CalendarDays, ChevronRight,
  LayoutDashboard, Bug, Network, HardDrive, MonitorSmartphone,
  FileSearch, ShieldAlert, TriangleAlert, CircleDot,
  FolderKanban, Receipt, ArrowDownRight, Info, Link2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import Image from "next/image";

/* ============================================================
   CONSTANTS
   ============================================================ */
const DASHBOARD_URL = "https://my-app-iota-ruby-95.vercel.app/";

/* ============================================================
   PASSWORD GATE
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md w-full"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-6">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-2">
          IDC Board Dashboard
        </h1>
        <p className="text-[#8d969e] text-sm mb-8">
          Digital Transformation & Infrastructure Modernization
        </p>
        <form onSubmit={handleSubmit}>
          <motion.div animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
            <div className="relative mb-4">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d969e]" />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Enter access code"
                className="w-full pl-11 pr-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-[#8d969e] text-center text-base tracking-widest focus:outline-none focus:border-white/30 transition-colors"
                autoFocus
              />
            </div>
          </motion.div>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#e23b4a] text-xs mb-4">
              Invalid access code. Please try again.
            </motion.p>
          )}
          <button type="submit" className="w-full py-3 bg-white text-[#191c1f] font-medium text-sm rounded-full hover:opacity-90 transition-opacity">
            Unlock Dashboard
          </button>
        </form>
        <p className="text-[#505a63] text-[11px] mt-8">
          Confidential — For IDC Board Members Only<br />
          HexStrike AI Cybersecurity · April 2026
        </p>
      </motion.div>
    </div>
  );
}

/* ============================================================
   SIDEBAR NAVIGATION
   ============================================================ */
type PanelKey = "overview" | "security" | "modernization" | "project-plan" | "ux-flow" | "investment";

interface NavItem {
  id: PanelKey;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
  { id: "security", label: "Security Assessment", icon: <ShieldAlert className="w-[18px] h-[18px]" />, badge: "6 risks", badgeColor: "#ec7e00" },
  { id: "modernization", label: "Modernization Plan", icon: <Network className="w-[18px] h-[18px]" /> },
  { id: "project-plan", label: "Project Plan", icon: <FolderKanban className="w-[18px] h-[18px]" />, badge: "28 wks", badgeColor: "#494fdf" },
  { id: "ux-flow", label: "New Portal UX", icon: <MonitorSmartphone className="w-[18px] h-[18px]" /> },
  { id: "investment", label: "Investment & ROI", icon: <Receipt className="w-[18px] h-[18px]" />, badge: "320% ROI", badgeColor: "#00a87e" },
];

function Sidebar({ active, setActive, collapsed, setCollapsed }: {
  active: PanelKey; setActive: (id: PanelKey) => void;
  collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  return (
    <>
      {/* Mobile overlay — non-interactive; only drawer button toggles sidebar */}
      {!collapsed && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" />
      )}

      <aside className={`fixed top-0 left-0 z-40 h-screen bg-[#191c1f] flex flex-col transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[260px]"} lg:translate-x-0 ${collapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}`}>
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
          {!collapsed && (
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-white text-sm font-medium truncate">Presentation</span>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white/80 hover:text-white ml-auto shrink-0">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav items */}
        <ScrollArea className="flex-1 py-3 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active === item.id
                    ? "bg-white/10 text-white"
                    : "text-[#8d969e] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md" style={{ backgroundColor: (item.badgeColor || "#494fdf") + "20", color: item.badgeColor }}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Live dashboard link */}
        <div className="p-3 border-t border-white/10">
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm bg-[#00a87e]/10 text-[#00a87e] hover:bg-[#00a87e]/20 transition-colors ${collapsed ? "justify-center" : ""}`}
          >
            <ExternalLink className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span className="font-medium">Live IDC Portal</span>}
          </a>
        </div>
      </aside>
    </>
  );
}

/* ============================================================
   HEADER
   ============================================================ */
function Header({ activeLabel, onMenuClick }: { activeLabel: string; onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-20 h-14 bg-white border-b border-[#e0e0e0] flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden w-8 h-8 rounded-lg hover:bg-[#f4f4f4] flex items-center justify-center">
          <Menu className="w-4 h-4" />
        </button>
        <h1 className="text-sm font-medium text-[#191c1f]">{activeLabel}</h1>
        <Badge variant="secondary" className="text-[10px] hidden sm:inline-flex">April 2026</Badge>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f4f4f4]">
          <Lock className="w-3 h-3 text-[#8d969e]" />
          <span className="text-[10px] font-mono text-[#8d969e]">IDC2026!</span>
        </div>
        <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#00a87e] hover:underline">
          <ExternalLink className="w-3 h-3" />
          Live IDC Portal
        </a>
        <div className="w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center">
          <Users className="w-3.5 h-3.5 text-[#8d969e]" />
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   STAT CARD COMPONENT
   ============================================================ */
function StatCard({ label, value, sub, icon, trend, color = "#191c1f" }: {
  label: string; value: string; sub?: string;
  icon: React.ReactNode; trend?: { value: string; up: boolean }; color?: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs text-[#8d969e] font-medium">{label}</span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: color + "10", color }}>
            {icon}
          </div>
        </div>
        <div className="text-2xl font-semibold tracking-tight" style={{ color }}>{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span className={`flex items-center gap-0.5 text-[11px] font-medium ${trend.up ? "text-[#00a87e]" : "text-[#e23b4a]"}`}>
              {trend.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {trend.value}
            </span>
          )}
          {sub && <span className="text-[11px] text-[#8d969e]">{sub}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   OVERVIEW PANEL
   ============================================================ */
function OverviewPanel({ onNavigate }: { onNavigate: (id: PanelKey) => void }) {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Security Score" value="7.2/10" sub="Current — Medium Risk" icon={<Shield className="w-4 h-4" />} color="#ec7e00" />
        <StatCard label="Target Score" value="9.5/10" sub="Post-modernization" icon={<ShieldCheck className="w-4 h-4" />} color="#00a87e" trend={{ value: "+32%", up: true }} />
        <StatCard label="5-Year ROI" value="320%" sub="18-month payback" icon={<TrendingUp className="w-4 h-4" />} color="#494fdf" />
        <StatCard label="Total Investment" value="R 1.58M" sub="Development costs" icon={<DollarSign className="w-4 h-4" />} color="#191c1f" />
      </div>

      {/* Summary cards row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Current vs Target */}
        <Card className="py-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm">Current State vs. Target State</CardTitle>
            <CardDescription>Platform transformation at a glance</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {[
                { label: "Platform", before: "WordPress 6.5+ LAMP", after: "Strapi + Next.js + PostgreSQL" },
                { label: "Security", before: "7.2/10 (Medium)", after: "9.5/10 (High)" },
                { label: "Page Load", before: "2-3 seconds", after: "<500ms" },
                { label: "DB Queries", before: "50+ / page", after: "2-3 / page" },
                { label: "Scalability", before: "Vertical only", after: "K8s auto-scale" },
                { label: "DMARC", before: "Quarantine, no subs", after: "Reject, all domains" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="w-20 text-[#8d969e] shrink-0">{item.label}</span>
                  <span className="flex-1 text-[#e23b4a] truncate">{item.before}</span>
                  <ChevronRight className="w-3 h-3 text-[#c9c9cd] shrink-0" />
                  <span className="flex-1 text-[#00a87e] truncate font-medium">{item.after}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Risk Items */}
        <Card className="py-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Critical Risk Items</CardTitle>
                <CardDescription>Requiring immediate attention</CardDescription>
              </div>
              <button onClick={() => onNavigate("security")} className="text-xs text-[#494fdf] font-medium hover:underline">View all →</button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {[
                { title: "MySQL Exposed to Internet", severity: "High", color: "#e23b4a", timeline: "7 days" },
                { title: "WordPress Author Disclosure", severity: "Medium", color: "#ec7e00", timeline: "14 days" },
                { title: "Outdated nginx (1.20.1)", severity: "Medium", color: "#ec7e00", timeline: "30 days" },
                { title: "DMARC Subdomain Gap", severity: "Medium", color: "#ec7e00", timeline: "14 days" },
                { title: "Outdated OpenSSH (7.4)", severity: "Medium", color: "#ec7e00", timeline: "30 days" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="flex-1 text-[#191c1f] truncate">{item.title}</span>
                  <Badge className="text-[10px] border-0 px-1.5 py-0" style={{ backgroundColor: item.color + "15", color: item.color }}>{item.severity}</Badge>
                  <span className="text-[#8d969e] w-14 text-right">{item.timeline}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project progress + ROI */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Project timeline */}
        <Card className="py-0 md:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Project Timeline</CardTitle>
                <CardDescription>6 phases across 28 weeks</CardDescription>
              </div>
              <button onClick={() => onNavigate("project-plan")} className="text-xs text-[#494fdf] font-medium hover:underline">Details →</button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {[
                { name: "Foundation & Security", weeks: "Wk 1-4", progress: 0, color: "#e23b4a" },
                { name: "Backend Development", weeks: "Wk 5-10", progress: 0, color: "#ec7e00" },
                { name: "Frontend Development", weeks: "Wk 11-18", progress: 0, color: "#494fdf" },
                { name: "Testing & Migration", weeks: "Wk 19-22", progress: 0, color: "#00a87e" },
                { name: "Go-Live & Handover", weeks: "Wk 23-28", progress: 0, color: "#191c1f" },
              ].map((phase, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: phase.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#191c1f]">{phase.name}</span>
                      <span className="text-[10px] text-[#8d969e]">{phase.weeks}</span>
                    </div>
                    <Progress value={phase.progress} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick ROI */}
        <Card className="py-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm">ROI Highlights</CardTitle>
            <CardDescription>Return on investment</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {[
                { label: "Security Risk", value: "-80%", color: "#00a87e" },
                { label: "Page Speed", value: "4x faster", color: "#00a87e" },
                { label: "Dev Efficiency", value: "+60%", color: "#00a87e" },
                { label: "Op. Costs", value: "-25%", color: "#00a87e" },
                { label: "Payback", value: "18 months", color: "#494fdf" },
                { label: "5-Year ROI", value: "320%", color: "#494fdf" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-[#8d969e]">{item.label}</span>
                  <span className="text-xs font-semibold" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live dashboard CTA */}
      <Card className="bg-[#191c1f] border-[#191c1f]">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-white mb-1">New IDC Application Portal — Live Preview</h3>
              <p className="text-xs text-[#8d969e]">Experience the modernized application process with the live working prototype.</p>
            </div>
            <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00a87e] text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity shrink-0">
              Open Live Dashboard
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ============================================================
   SECURITY ASSESSMENT PANEL
   ============================================================ */
function SecurityPanel() {
  return (
    <div className="space-y-6">
      {/* Score banner */}
      <Card className="bg-[#191c1f] border-[#191c1f] py-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[#8d969e] text-xs font-medium mb-1">Overall Security Rating</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold text-white">7.2<span className="text-lg text-[#8d969e]">/10</span></span>
                <Badge className="bg-[#ec7e00] text-white border-0 text-[10px]">AMBER — Medium Risk</Badge>
              </div>
            </div>
            <div className="flex gap-6">
              {[
                { value: "9", label: "Open Ports" },
                { value: "6", label: "Risk Items" },
                { value: "0", label: "Critical CVEs" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-semibold text-white">{s.value}</div>
                  <div className="text-[10px] text-[#8d969e]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="vulnerabilities">
        <TabsList className="bg-[#f4f4f4] w-full overflow-x-auto">
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="ports">Port Analysis</TabsTrigger>
          <TabsTrigger value="positive">Positive Controls</TabsTrigger>
          <TabsTrigger value="visuals">Visual Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities">
          <Card className="py-0 mt-4">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e0e0e0]">
                      <th className="text-left py-3 px-4 text-[11px] font-medium text-[#8d969e] uppercase tracking-wider">Vulnerability</th>
                      <th className="text-left py-3 px-4 text-[11px] font-medium text-[#8d969e] uppercase tracking-wider">Severity</th>
                      <th className="text-left py-3 px-4 text-[11px] font-medium text-[#8d969e] uppercase tracking-wider hidden md:table-cell">Impact</th>
                      <th className="text-left py-3 px-4 text-[11px] font-medium text-[#8d969e] uppercase tracking-wider">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { vuln: "MySQL Database Exposed to Internet", severity: "High", color: "#e23b4a", impact: "Data breach, regulatory fines", timeline: "7 days" },
                      { vuln: "WordPress Author Info Disclosure", severity: "Medium", color: "#ec7e00", impact: "Phishing, social engineering", timeline: "14 days" },
                      { vuln: "Outdated nginx (1.20.1)", severity: "Medium", color: "#ec7e00", impact: "Known CVE exploitation", timeline: "30 days" },
                      { vuln: "DMARC Subdomain Gap", severity: "Medium", color: "#ec7e00", impact: "Email spoofing risk", timeline: "14 days" },
                      { vuln: "Outdated OpenSSH (7.4)", severity: "Medium", color: "#ec7e00", impact: "Known vulnerabilities", timeline: "30 days" },
                      { vuln: "FTP Service Exposure", severity: "Low", color: "#494fdf", impact: "Limited attack surface", timeline: "90 days" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[#f4f4f4] last:border-0 hover:bg-[#fafafa] transition-colors">
                        <td className="py-3 px-4 text-xs font-medium text-[#191c1f]">{row.vuln}</td>
                        <td className="py-3 px-4">
                          <Badge className="text-[10px] border-0" style={{ backgroundColor: row.color + "15", color: row.color }}>{row.severity}</Badge>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#8d969e] hidden md:table-cell">{row.impact}</td>
                        <td className="py-3 px-4 text-xs text-[#8d969e]">{row.timeline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ports">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {[
              { port: "21", service: "FTP", version: "vsftpd 3.0.3", risk: "Medium", color: "#ec7e00" },
              { port: "22", service: "SSH", version: "OpenSSH 7.4", risk: "Medium", color: "#ec7e00" },
              { port: "25", service: "SMTP", version: "Postfix", risk: "Low", color: "#00a87e" },
              { port: "53", service: "DNS", version: "BIND 9.11.4", risk: "Medium", color: "#ec7e00" },
              { port: "80", service: "HTTP", version: "nginx 1.20.1", risk: "Low", color: "#00a87e" },
              { port: "443", service: "HTTPS", version: "nginx 1.20.1", risk: "Low", color: "#00a87e" },
              { port: "110", service: "POP3", version: "Dovecot", risk: "Low", color: "#00a87e" },
              { port: "143", service: "IMAP", version: "Dovecot", risk: "Low", color: "#00a87e" },
              { port: "3306", service: "MySQL", version: "10.3.38", risk: "High", color: "#e23b4a" },
            ].map((item, i) => (
              <Card key={i} className="py-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Server className="w-3.5 h-3.5 text-[#8d969e]" />
                      <span className="font-mono text-sm font-semibold text-[#191c1f]">{item.port}</span>
                    </div>
                    <Badge className="text-[10px] border-0" style={{ backgroundColor: item.color + "15", color: item.color }}>{item.risk}</Badge>
                  </div>
                  <div className="text-xs font-medium text-[#191c1f]">{item.service}</div>
                  <div className="text-[10px] text-[#8d969e] mt-0.5">{item.version}</div>
                  {item.port === "3306" && (
                    <div className="mt-2 flex items-center gap-1.5 text-[#e23b4a] text-[10px] font-medium">
                      <AlertTriangle className="w-3 h-3" /> Database exposed to internet
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="positive">
          <Card className="py-0 mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Positive Security Controls</CardTitle>
              <CardDescription>Existing controls performing well</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "Strong Security Headers", desc: "Properly configured with modern standards" },
                  { label: "TLS/SSL Configuration", desc: "A+ rating with strong encryption" },
                  { label: "Authentication Security", desc: "CSRF protection, rate limiting implemented" },
                  { label: "Cloudflare Protection", desc: "DDoS mitigation and WAF capabilities" },
                  { label: "Error Handling", desc: "No sensitive information disclosure" },
                  { label: "No Critical OWASP Top 10", desc: "Zero critical vulnerabilities found" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#f4f4f4]">
                    <CheckCircle2 className="w-4 h-4 text-[#00a87e] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-[#191c1f]">{item.label}</div>
                      <div className="text-[11px] text-[#8d969e]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visuals">
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Card className="py-0">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Security Radar</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <div className="relative aspect-square max-w-xs mx-auto">
                  <Image src="/idc_security_radar.png" alt="Security Radar" fill className="object-contain" />
                </div>
              </CardContent>
            </Card>
            <Card className="py-0">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Risk Matrix</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <div className="relative aspect-square max-w-xs mx-auto">
                  <Image src="/idc_risk_matrix.png" alt="Risk Matrix" fill className="object-contain" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Remediation Roadmap */}
      <Card className="py-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Remediation Roadmap</CardTitle>
          <CardDescription>Phased approach to security improvements</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Accordion type="single" collapsible className="w-full">
            {[
              { phase: "Phase 1: Critical Fixes", days: "Days 1-7", color: "#e23b4a", items: ["Move MySQL port 3306 behind firewall", "Implement IP whitelisting for database access", "Restrict WordPress REST API author information", "Review and tighten file permissions"] },
              { phase: "Phase 2: High Priority", days: "Days 8-30", color: "#ec7e00", items: ["Upgrade nginx to latest stable (1.24+)", "Apply OpenSSH security patches", "Update PHP to supported version", "Implement database activity monitoring"] },
              { phase: "Phase 3: Medium Priority", days: "Days 31-90", color: "#494fdf", items: ["Implement network segmentation", "Review and tighten service permissions", "Update security policies and procedures", "Conduct security awareness training"] },
              { phase: "Phase 4: Continuous", days: "Ongoing", color: "#00a87e", items: ["Quarterly penetration testing", "Monthly vulnerability scanning", "Annual security awareness training", "Continuous monitoring and improvement"] },
            ].map((phase, i) => (
              <AccordionItem key={i} value={`remediation-${i}`} className="border-[#f4f4f4]">
                <AccordionTrigger className="text-xs py-3 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: phase.color }} />
                    <span className="font-medium text-[#191c1f]">{phase.phase}</span>
                    <Badge className="text-[10px] border-0" style={{ backgroundColor: phase.color + "15", color: phase.color }}>{phase.days}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-5">
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-[#505a63]">
                        <CheckCircle2 className="w-3 h-3 text-[#00a87e] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

/* ============================================================
   MODERNIZATION PANEL
   ============================================================ */
function ModernizationPanel() {
  return (
    <div className="space-y-6">
      {/* Architecture grid */}
      <Card className="py-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Proposed Architecture</CardTitle>
          <CardDescription>Headless CMS + Microservices + Container Orchestration</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { icon: <Globe className="w-5 h-5" />, name: "Next.js", desc: "SSR/SSG Frontend", color: "#494fdf" },
              { icon: <Layers className="w-5 h-5" />, name: "API Gateway", desc: "GraphQL / REST", color: "#00a87e" },
              { icon: <FileText className="w-5 h-5" />, name: "Strapi CMS", desc: "Headless Content", color: "#ec7e00" },
              { icon: <Cpu className="w-5 h-5" />, name: "Microservices", desc: "Node.js Backend", color: "#e61e49" },
              { icon: <Shield className="w-5 h-5" />, name: "Auth Service", desc: "Clerk / Auth0", color: "#494fdf" },
              { icon: <Database className="w-5 h-5" />, name: "PostgreSQL", desc: "Row Level Security", color: "#00a87e" },
              { icon: <Cloud className="w-5 h-5" />, name: "Cloudflare", desc: "CDN Edge Caching", color: "#ec7e00" },
              { icon: <HardDrive className="w-5 h-5" />, name: "Docker + K8s", desc: "Containers", color: "#e61e49" },
              { icon: <ShieldCheck className="w-5 h-5" />, name: "WAF + DDoS", desc: "Enterprise", color: "#494fdf" },
              { icon: <Activity className="w-5 h-5" />, name: "Monitoring", desc: "Prometheus", color: "#00a87e" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#f4f4f4] text-center">
                <div className="w-9 h-9 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: item.color + "15", color: item.color }}>
                  {item.icon}
                </div>
                <div className="text-xs font-medium text-[#191c1f]">{item.name}</div>
                <div className="text-[10px] text-[#8d969e] mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology rationale - Accordion */}
      <Card className="py-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Technology Selection Rationale</CardTitle>
          <CardDescription>Why each technology was chosen</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Accordion type="single" collapsible defaultValue="tech-0">
            {[
              { title: "Why Headless CMS (Strapi)?", color: "#494fdf", points: ["API-first design eliminates admin interface exposure", "Fine-grained role-based access control (RBAC)", "Self-hosted for data sovereignty compliance", "No plugin vulnerability inheritance from WordPress", "Built-in GraphQL and REST APIs with rate limiting"] },
              { title: "Why Next.js Frontend?", color: "#00a87e", points: ["Server-side rendering for SEO and performance", "Static generation — no server-side execution for public pages", "Built-in TypeScript support for type safety", "Automatic code splitting and optimization", "Built-in API routes for custom functionality"] },
              { title: "Why PostgreSQL over MySQL?", color: "#ec7e00", points: ["Row Level Security for data isolation at DB level", "Native JSON support for flexible data models", "Better concurrent connection performance", "Full encryption at rest and in transit", "Built-in replication and failover"] },
              { title: "Why Clerk/Auth0 for Authentication?", color: "#e61e49", points: ["Enterprise-grade MFA and threat detection", "SOC2 compliant with passwordless login options", "AI-powered anomaly detection built-in", "Social login integration (Microsoft, Google)", "Short-lived JWT tokens with secure session management"] },
              { title: "Why Docker + Kubernetes?", color: "#191c1f", points: ["Immutable infrastructure for security", "Easy horizontal scaling and deployment", "Environment consistency across dev/staging/prod", "Blue-green deployment strategy", "Simplified disaster recovery"] },
            ].map((item, i) => (
              <AccordionItem key={i} value={`tech-${i}`} className="border-[#f4f4f4]">
                <AccordionTrigger className="text-xs py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-[#191c1f]">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-5">
                  <ul className="space-y-1.5">
                    {item.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-[#505a63]">
                        <CheckCircle2 className="w-3 h-3 text-[#00a87e] mt-0.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Performance comparison */}
      <Card className="py-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Performance Comparison</CardTitle>
          <CardDescription>Before vs. after modernization</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { metric: "Page Load", before: "2-3s", after: "<500ms", improvement: "4x faster" },
              { metric: "DB Queries", before: "50+/page", after: "2-3/page", improvement: "94% less" },
              { metric: "Security Score", before: "7.2/10", after: "9.5/10", improvement: "+32%" },
              { metric: "Annual Cost", before: "R 1,733K", after: "R 1,300K", improvement: "-25%" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#f4f4f4] text-center">
                <div className="text-[10px] text-[#8d969e] mb-3 font-medium">{item.metric}</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div>
                    <div className="text-[10px] text-[#e23b4a] mb-0.5">Before</div>
                    <div className="text-sm font-semibold text-[#e23b4a]">{item.before}</div>
                  </div>
                  <ChevronRight className="w-3 h-3 text-[#c9c9cd]" />
                  <div>
                    <div className="text-[10px] text-[#00a87e] mb-0.5">After</div>
                    <div className="text-sm font-semibold text-[#00a87e]">{item.after}</div>
                  </div>
                </div>
                <div className="text-[10px] text-[#00a87e] font-semibold">{item.improvement}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="py-0">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Project Scope</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="relative aspect-[4/3]">
              <Image src="/idc_scope_breakdown.png" alt="Scope" fill className="object-contain" />
            </div>
          </CardContent>
        </Card>
        <Card className="py-0">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Sector Coverage</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="relative aspect-[4/3]">
              <Image src="/idc_sectors.png" alt="Sectors" fill className="object-contain" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   PROJECT PLAN PANEL
   ============================================================ */
function ProjectPlanPanel() {
  return (
    <div className="space-y-6">
      {/* Phase cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { phase: "Phase 1", name: "Foundation & Security", weeks: "Wk 1-4", color: "#e23b4a", tasks: ["DMARC/SPF/DKIM implementation", "Docker + Kubernetes setup", "Database migration planning", "Firewall & WAF hardening"] },
          { phase: "Phase 2", name: "Backend Development", weeks: "Wk 5-10", color: "#ec7e00", tasks: ["Strapi CMS setup", "Auth service integration", "API gateway & microservices", "Content modeling & migration"] },
          { phase: "Phase 3", name: "Frontend Development", weeks: "Wk 11-18", color: "#494fdf", tasks: ["Next.js + component library", "Core pages development", "Application portal", "Optimization & accessibility"] },
          { phase: "Phase 4", name: "Testing & Migration", weeks: "Wk 19-22", color: "#00a87e", tasks: ["Security & pen testing", "Performance testing", "Content migration", "UAT & bug fixes"] },
          { phase: "Phase 5", name: "Go-Live", weeks: "Wk 23-24", color: "#191c1f", tasks: ["Blue-green deployment", "Production go-live", "Smoke testing", "Stakeholder comms"] },
          { phase: "Phase 6", name: "Handover", weeks: "Wk 25-28", color: "#505a63", tasks: ["Intensive monitoring", "Documentation", "Training sessions", "Project closure"] },
        ].map((p, i) => (
          <Card key={i} className="py-0">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ backgroundColor: p.color }}>
                  {i + 1}
                </div>
                <div>
                  <div className="text-xs font-medium text-[#191c1f]">{p.name}</div>
                  <div className="text-[10px] text-[#8d969e]">{p.phase} · {p.weeks}</div>
                </div>
              </div>
              <ul className="space-y-1.5">
                {p.tasks.map((task, j) => (
                  <li key={j} className="flex items-start gap-2 text-[11px] text-[#505a63]">
                    <CircleDot className="w-2.5 h-2.5 mt-0.5 shrink-0 text-[#c9c9cd]" />
                    {task}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Milestones */}
      <Card className="py-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Critical Milestones</CardTitle>
          <CardDescription>Key delivery checkpoints</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: "DMARC Upgrade", week: "Wk 1" },
              { name: "Infrastructure", week: "Wk 4" },
              { name: "DB Migration", week: "Wk 8" },
              { name: "CMS Ready", week: "Wk 10" },
              { name: "Frontend MVP", week: "Wk 16" },
              { name: "Security Tests", week: "Wk 19" },
              { name: "Content Migrate", week: "Wk 21" },
              { name: "UAT Sign-off", week: "Wk 22" },
              { name: "Go-Live", week: "Wk 24" },
              { name: "Closure", week: "Wk 28" },
            ].map((m, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#f4f4f4] text-center">
                <div className="text-[10px] text-[#8d969e]">{m.week}</div>
                <div className="text-xs font-medium text-[#191c1f] mt-0.5">{m.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost breakdown */}
      <Card className="py-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Development Cost Breakdown</CardTitle>
          <CardDescription>Total: R 1,580,900</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
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
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#f4f4f4] last:border-0">
                <span className="text-xs text-[#505a63]">{item.label}</span>
                <span className="text-xs font-medium text-[#191c1f]">{item.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ============================================================
   UX FLOW PANEL
   ============================================================ */
function UXFlowPanel() {
  return (
    <div className="space-y-6">
      {/* Design principles */}
      <Card className="py-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Design Principles</CardTitle>
          <CardDescription>Guiding principles for the new portal</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: <ShieldCheck className="w-4 h-4" />, title: "Trust & Authority", desc: "Clean typography, institutional gravitas" },
              { icon: <Smartphone className="w-4 h-4" />, title: "Mobile-First", desc: "Starts at 320px, fully responsive" },
              { icon: <Eye className="w-4 h-4" />, title: "Accessibility First", desc: "WCAG 2.1 AA from day one" },
              { icon: <Zap className="w-4 h-4" />, title: "Performance", desc: "Optimized for 2G/3G regions" },
              { icon: <Users className="w-4 h-4" />, title: "Inclusive Design", desc: "All 11 official SA languages" },
              { icon: <Palette className="w-4 h-4" />, title: "IDC Design System", desc: "shadcn/ui + Tailwind CSS" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#f4f4f4]">
                <div className="w-8 h-8 rounded-lg bg-[#191c1f] flex items-center justify-center mb-2 text-white">
                  {item.icon}
                </div>
                <div className="text-xs font-medium text-[#191c1f]">{item.title}</div>
                <div className="text-[11px] text-[#8d969e]">{item.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User flows */}
      <Tabs defaultValue="registration">
        <TabsList className="bg-[#f4f4f4] w-full overflow-x-auto">
          <TabsTrigger value="registration">Registration (8 Steps)</TabsTrigger>
          <TabsTrigger value="funding">Funding Application (7 Steps)</TabsTrigger>
          <TabsTrigger value="navigation">Navigation Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="registration">
          <Card className="py-0 mt-4">
            <CardContent className="p-5">
              <div className="space-y-2.5">
                {[
                  { step: 1, title: "Account Type Selection", desc: "Applicant / Student / Vendor" },
                  { step: 2, title: "Personal Details", desc: "Name, ID, Email, Mobile" },
                  { step: 3, title: "Email Verification", desc: "OTP code sent to email" },
                  { step: 4, title: "Phone Verification", desc: "SMS OTP verification" },
                  { step: 5, title: "Password Creation", desc: "Strength meter & requirements" },
                  { step: 6, title: "MFA Setup", desc: "Authenticator app QR code" },
                  { step: 7, title: "Profile Completion", desc: "Industry, Sector, Province" },
                  { step: 8, title: "Terms Acceptance", desc: "T&Cs, POPIA consent" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#f4f4f4]">
                    <div className="w-7 h-7 rounded-full bg-[#191c1f] text-white text-[11px] flex items-center justify-center shrink-0 font-semibold">{item.step}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-[#191c1f]">{item.title}</div>
                      <div className="text-[10px] text-[#8d969e]">{item.desc}</div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-[#c9c9cd] shrink-0" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funding">
          <Card className="py-0 mt-4">
            <CardContent className="p-5">
              <div className="space-y-2.5">
                {[
                  { step: 1, title: "Eligibility Check", desc: "Funding amount, industry, B-BBEE" },
                  { step: 2, title: "Organisation Details", desc: "CIPC lookup, tax verification" },
                  { step: 3, title: "Funding Request", desc: "Amount, product, purpose" },
                  { step: 4, title: "Financial Information", desc: "Turnover, projections" },
                  { step: 5, title: "Business Plan Upload", desc: "Documents, financial statements" },
                  { step: 6, title: "Document Submission", desc: "Supporting files, certifications" },
                  { step: 7, title: "Review & Submit", desc: "Summary, declaration, confirmation" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#f4f4f4]">
                    <div className="w-7 h-7 rounded-full bg-[#00838F] text-white text-[11px] flex items-center justify-center shrink-0 font-semibold">{item.step}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-[#191c1f]">{item.title}</div>
                      <div className="text-[10px] text-[#8d969e]">{item.desc}</div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-[#c9c9cd] shrink-0" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation">
          <Card className="py-0 mt-4">
            <CardContent className="p-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { title: "Funding", items: ["Apply", "My Applications", "Find a Fund", "Checklist"] },
                  { title: "Portfolio", items: ["My Loans", "Repayments", "Statements", "Collateral"] },
                  { title: "Bursaries", items: ["Programmes", "My Applications", "Reports", "Disbursements"] },
                  { title: "Tenders", items: ["Active Tenders", "My Bids", "Vendor Reg", "Archive"] },
                  { title: "Documents", items: ["My Documents", "Shared With Me", "Upload"] },
                  { title: "Messages", items: ["Inbox", "Sent", "Compose"] },
                  { title: "Profile", items: ["Personal", "Organisation", "Security", "Notifications"] },
                  { title: "Help", items: ["FAQ", "Contact Us", "Submit Ticket"] },
                ].map((section, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#f4f4f4]">
                    <div className="text-xs font-medium text-[#191c1f] mb-2">{section.title}</div>
                    <div className="space-y-1">
                      {section.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-1.5 text-[11px] text-[#8d969e]">
                          <ChevronRight className="w-2.5 h-2.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ============================================================
   INVESTMENT PANEL
   ============================================================ */
function InvestmentPanel() {
  return (
    <div className="space-y-6">
      {/* ROI KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Investment" value="R 1.58M" sub="Development costs" icon={<DollarSign className="w-4 h-4" />} color="#191c1f" />
        <StatCard label="Payback Period" value="18 mo" sub="Full cost recovery" icon={<Clock className="w-4 h-4" />} color="#494fdf" />
        <StatCard label="5-Year ROI" value="320%" sub="Return on investment" icon={<TrendingUp className="w-4 h-4" />} color="#00a87e" />
        <StatCard label="Annual Savings" value="R 433K" sub="25% cost reduction" icon={<BarChart3 className="w-4 h-4" />} color="#ec7e00" trend={{ value: "-25%", up: true }} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Cost breakdown */}
        <Card className="py-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Development Cost Breakdown</CardTitle>
            <CardDescription>Total: R 1,580,900</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {[
                { label: "DMARC & Email Security", amount: "R 72,000", pct: 5 },
                { label: "Infrastructure Setup", amount: "R 180,000", pct: 11 },
                { label: "Backend Development", amount: "R 234,000", pct: 15 },
                { label: "Frontend Development", amount: "R 342,000", pct: 22 },
                { label: "Content Migration", amount: "R 123,900", pct: 8 },
                { label: "Security Implementation", amount: "R 145,400", pct: 9 },
                { label: "Testing & QA", amount: "R 142,500", pct: 9 },
                { label: "Deployment", amount: "R 101,100", pct: 6 },
                { label: "Documentation & Training", amount: "R 114,000", pct: 7 },
                { label: "Project Management", amount: "R 126,000", pct: 8 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#505a63]">{item.label}</span>
                    <span className="text-[11px] font-medium text-[#191c1f]">{item.amount}</span>
                  </div>
                  <div className="h-1.5 bg-[#f4f4f4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#191c1f] rounded-full transition-all" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ongoing costs */}
        <Card className="py-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Ongoing Annual Costs</CardTitle>
            <CardDescription>Total: R 774,000/year</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {[
                { label: "Security Maintenance", amount: "R 216,000/yr" },
                { label: "DMARC Monitoring", amount: "R 78,000/yr" },
                { label: "Performance Optimization", amount: "R 144,000/yr" },
                { label: "Content Support", amount: "R 180,000/yr" },
                { label: "Backup Management", amount: "R 36,000/yr" },
                { label: "Support Tiers", amount: "R 120,000/yr" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#f4f4f4] last:border-0">
                  <span className="text-xs text-[#505a63]">{item.label}</span>
                  <span className="text-xs font-medium text-[#191c1f]">{item.amount}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              {[
                { label: "Security Risk Reduction", value: "80% fewer vulns" },
                { label: "Page Speed", value: "4x faster" },
                { label: "Dev Efficiency", value: "60% faster" },
                { label: "Op. Cost Savings", value: "25% reduction" },
                { label: "User Satisfaction", value: "90% target" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-[#8d969e]">{item.label}</span>
                  <span className="text-xs font-medium text-[#00a87e]">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live dashboard CTA */}
      <Card className="bg-[#191c1f] border-[#191c1f] py-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-white mb-1">View the Live Application Portal</h3>
              <p className="text-xs text-[#8d969e]">The working prototype demonstrates the modern UX and streamlined application flow.</p>
            </div>
            <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00a87e] text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity shrink-0">
              Open Live Dashboard
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
const panelConfig: Record<PanelKey, { label: string }> = {
  "overview": { label: "Dashboard Overview" },
  "security": { label: "Security Assessment" },
  "modernization": { label: "Technical Modernization" },
  "project-plan": { label: "Project Plan" },
  "ux-flow": { label: "New Portal UX" },
  "investment": { label: "Investment & ROI" },
};

export default function IDCPage() {
  const getInitialLocked = useCallback(() => {
    if (typeof window !== "undefined") return sessionStorage.getItem("idc-unlocked") === "true";
    return false;
  }, []);

  const [isUnlocked, setIsUnlocked] = useState(getInitialLocked);
  const [active, setActive] = useState<PanelKey>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 1024;
      setMobileView(isMobile);
      if (isMobile) setSidebarCollapsed(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isUnlocked) {
    return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;
  }

  const activeLabel = panelConfig[active].label;
  const effectiveCollapsed = mobileView ? true : sidebarCollapsed;

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <Sidebar active={active} setActive={setActive} collapsed={effectiveCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className={`transition-all duration-300 flex flex-col min-h-screen ${effectiveCollapsed ? "lg:ml-[68px]" : "lg:ml-[260px]"}`}>
        <Header activeLabel={activeLabel} onMenuClick={() => setSidebarCollapsed(false)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 mx-auto w-full max-w-[1600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {active === "overview" && <OverviewPanel onNavigate={setActive} />}
              {active === "security" && <SecurityPanel />}
              {active === "modernization" && <ModernizationPanel />}
              {active === "project-plan" && <ProjectPlanPanel />}
              {active === "ux-flow" && <UXFlowPanel />}
              {active === "investment" && <InvestmentPanel />}
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="mt-auto border-t border-[#e0e0e0] bg-white px-4 md:px-6 py-3">
          <div className="flex items-center justify-between text-[10px] text-[#8d969e]">
            <span>Confidential — IDC Board Members Only</span>
            <span>HexStrike AI Cybersecurity · April 2026</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
