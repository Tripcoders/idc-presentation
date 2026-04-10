# IDC Website Full Cycle Development & Maintenance Project Plan

## Industrial Development Corporation of South Africa (IDC)
### Comprehensive Website Rebuild, Security Enhancement & Ongoing Maintenance
### Project Duration: 6-8 Months | Total Investment: R 850,000 - R 1,200,000
### Prepared: April 3, 2026

---

## Executive Summary

This document provides a comprehensive breakdown of all components that need to be built, developed, and implemented for the complete modernization of the IDC website (https://www.idc.co.za). The project encompasses a full rebuild from the current WordPress monolithic architecture to a modern, secure, headless CMS-based system, along with ongoing maintenance and support.

### Current State Assessment
- **Platform**: WordPress 6.5+ with LAMP stack
- **Security Posture**: Medium risk (7.2/10) with critical vulnerabilities
- **DMARC Status**: Configured on primary domain (idc.co.za) with `quarantine` policy, but NOT configured on subdomains
- **Performance**: 2-3 second page loads, 50+ database queries per page
- **Scalability**: Vertical scaling only, no horizontal capability

### Target State
- **Platform**: Headless CMS (Strapi) + Next.js frontend + PostgreSQL
- **Security Posture**: High (9.5/10) with zero critical vulnerabilities
- **DMARC Status**: `reject` policy on all domains and subdomains
- **Performance**: <500ms page loads, 2-3 queries per page
- **Scalability**: Horizontal auto-scaling with Kubernetes

---

## 1. DMARC & Email Security Implementation

### 1.1 Current DMARC Status Assessment

| Domain/Subdomain | DMARC Configured | Current Policy | Target Policy | Status |
|------------------|------------------|----------------|---------------|--------|
| `idc.co.za` (primary) | YES | `quarantine` | `reject` | Needs Upgrade |
| `www.idc.co.za` | NO | N/A | `reject` | **URGENT** |
| `mail.idc.co.za` | NO | N/A | `reject` | **URGENT** |
| `my-idc.idc.co.za` | NO | N/A | `reject` | **URGENT** |
| `api.idc.co.za` | NO | N/A | `reject` | **URGENT** |

**Current DMARC Record (Primary Domain):**
```
v=DMARC1; p=quarantine; rua=mailto:38efeca55193942@rep.dmarcanalyzer.com; ruf=mailto:38efeca55193942@for.dmarcanalyzer.com; fo=1;
```

### 1.2 DMARC Implementation Tasks

#### Task 1.2.1: Upgrade Primary Domain DMARC Policy
- **Priority**: HIGH
- **Current State**: `p=quarantine` (emails sent to spam)
- **Target State**: `p=reject` (emails outright rejected)
- **Implementation Steps**:
  1. Monitor DMARC reports for 2 weeks to identify legitimate senders
  2. Create SPF record if not properly configured
  3. Implement DKIM signing for all outbound emails
  4. Update DMARC policy from `quarantine` to `reject`
  5. Add subdomain policy `sp=reject`
  6. Enable strict alignment modes (`adkim=s`, `aspf=s`)

**Target DMARC Record:**
```
v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; rua=mailto:dmarc-reports@idc.co.za; ruf=mailto:dmarc-forensics@idc.co.za; fo=1;
```

- **Estimated Time**: 4-6 hours (including monitoring period)
- **Dependencies**: SPF/DKIM configuration, email server access

#### Task 1.2.2: Implement DMARC on Subdomains
- **Priority**: HIGH
- **Subdomains Requiring DMARC**:
  - `www.idc.co.za`
  - `mail.idc.co.za`
  - `my-idc.idc.co.za`
  - `api.idc.co.za`
  - Any additional subdomains discovered during DNS audit

- **Implementation Steps**:
  1. Perform comprehensive DNS audit to identify all subdomains
  2. Create DMARC TXT records for each subdomain
  3. Configure aggregate and forensic reporting
  4. Monitor and adjust policies based on reports
  5. Document all email-sending services for each subdomain

- **Estimated Time**: 8-12 hours (depending on number of subdomains)
- **Dependencies**: DNS access, subdomain inventory

#### Task 1.2.3: SPF Record Configuration
- **Priority**: HIGH
- **Current State**: Unknown (needs verification)
- **Target State**: Properly configured SPF record including all legitimate senders

**Target SPF Record:**
```
v=spf1 include:_spf.google.com include:spf.protection.outlook.com include:mailgun.org ip4:196.22.132.0/24 -all
```

- **Implementation Steps**:
  1. Inventory all email-sending services (Google Workspace, Microsoft 365, transactional email services)
  2. Create comprehensive SPF record
  3. Test SPF validation
  4. Monitor for failures

- **Estimated Time**: 4-6 hours
- **Dependencies**: Email service inventory

#### Task 1.2.4: DKIM Implementation
- **Priority**: HIGH
- **Current State**: Unknown (needs verification)
- **Target State**: DKIM signing enabled for all outbound email

- **Implementation Steps**:
  1. Generate DKIM key pairs for each domain/subdomain
  2. Publish DKIM public keys in DNS
  3. Configure email servers to sign outbound messages
  4. Test DKIM validation
  5. Implement key rotation procedure

- **Estimated Time**: 6-8 hours
- **Dependencies**: Email server access, DNS management

#### Task 1.2.5: DMARC Monitoring & Reporting Infrastructure
- **Priority**: MEDIUM
- **Current State**: Using third-party Dmarc Analyzer
- **Target State**: Internal monitoring dashboard with automated alerts

- **Implementation Steps**:
  1. Set up DMARC report parsing system
  2. Create monitoring dashboard (Grafana/Prometheus)
  3. Configure automated alerts for policy violations
  4. Implement weekly/monthly reporting
  5. Create incident response procedures for DMARC failures

- **Estimated Time**: 12-16 hours
- **Dependencies**: Monitoring infrastructure

### 1.3 Email Security Implementation Summary

| Component | Priority | Estimated Time | Cost (ZAR) | Urgency |
|-----------|----------|----------------|------------|---------|
| DMARC Policy Upgrade | HIGH | 4-6 hours | R 8,000 | Immediate (Week 1) |
| Subdomain DMARC | HIGH | 8-12 hours | R 15,000 | Immediate (Week 1-2) |
| SPF Configuration | HIGH | 4-6 hours | R 6,000 | Immediate (Week 1) |
| DKIM Implementation | HIGH | 6-8 hours | R 10,000 | Immediate (Week 1-2) |
| Monitoring Infrastructure | MEDIUM | 12-16 hours | R 20,000 | Week 3-4 |
| **Subtotal** | | **34-48 hours** | **R 59,000** | |

---

## 2. Website Architecture Rebuild

### 2.1 Current Architecture Limitations

| Issue | Risk Level | Impact | Remediation |
|-------|------------|--------|-------------|
| WordPress monolithic design | HIGH | Large attack surface, plugin vulnerabilities | Migrate to headless CMS |
| MySQL exposed to internet | CRITICAL | Direct database compromise risk | Move behind firewall, migrate to PostgreSQL |
| Outdated nginx (1.20.1) | MEDIUM | Known CVEs (CVE-2021-3618) | Upgrade to nginx 1.24+ |
| Outdated OpenSSH (7.4) | MEDIUM | Known CVEs (CVE-2019-16905) | Upgrade to OpenSSH 9.6+ |
| WordPress REST API information disclosure | MEDIUM | Author details exposed | Restrict API or migrate |
| No horizontal scaling | HIGH | Performance bottleneck | Implement Kubernetes |
| Limited audit trail | MEDIUM | Compliance gaps | Implement comprehensive logging |

### 2.2 Proposed Technology Stack

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Next.js 14        │    │   API Gateway       │    │   Strapi CMS        │
│   Frontend          │◄──►│   (GraphQL/REST)    │◄──►│   (Headless)        │
│   (Static/SSR)      │    │                     │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
         │                          │                          │
         │                          │                          │
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Cloudflare CDN    │    │   Node.js           │    │   Auth0/Clerk       │
│   (Edge Caching)    │    │   Microservices     │    │   Authentication    │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
                                    │
                          ┌─────────────────────┐
                          │   PostgreSQL        │
                          │   (with RLS)        │
                          └─────────────────────┘
```

### 2.3 Infrastructure Components to Build

#### Task 2.3.1: Container Infrastructure (Docker + Kubernetes)
- **Priority**: HIGH
- **Description**: Create containerized infrastructure for all application components

**Deliverables**:
1. Docker images for:
   - Next.js frontend
   - Strapi CMS backend
   - Node.js API services
   - PostgreSQL database
   - Redis cache
   - Nginx reverse proxy

2. Kubernetes manifests for:
   - Deployment configurations
   - Service definitions
   - Ingress rules
   - ConfigMaps and Secrets
   - Persistent volume claims
   - Horizontal Pod Autoscalers

3. Helm charts for easy deployment

4. CI/CD pipeline (GitHub Actions)

- **Estimated Time**: 40-50 hours
- **Dependencies**: Infrastructure provider selection

#### Task 2.3.2: Database Migration (MySQL to PostgreSQL)
- **Priority**: HIGH
- **Description**: Migrate from exposed MySQL to secure PostgreSQL with Row Level Security

**Deliverables**:
1. PostgreSQL database setup with encryption
2. Row Level Security policies
3. Data migration scripts from MySQL
4. Backup and recovery procedures
5. Connection pooling (PgBouncer)
6. Read replicas for performance
7. Database monitoring and alerting

**Migration Steps**:
1. Schema design and optimization
2. Data export from MySQL
3. Data transformation and validation
4. Import to PostgreSQL
5. Testing and verification
6. Cutover planning and execution

- **Estimated Time**: 30-40 hours
- **Dependencies**: Database access, data inventory

#### Task 2.3.3: Headless CMS Implementation (Strapi)
- **Priority**: HIGH
- **Description**: Implement Strapi as the content management system

**Deliverables**:
1. Strapi installation and configuration
2. Content type definitions:
   - Pages
   - Blog posts
   - News articles
   - Documents/publications
   - Team members
   - Contact forms
   - Funding programs
   - Application portals
3. Role-based access control (RBAC)
4. API endpoint configuration (GraphQL + REST)
5. Media library with optimization
6. Version control and audit logging
7. Webhook integrations
8. Custom plugins as needed

**Content Types to Model**:
```javascript
// Example: Funding Program content type
{
  "program_name": "string",
  "program_code": "string (unique)",
  "description": "richtext",
  "eligibility_criteria": "json",
  "funding_amount_range": "json",
  "application_deadline": "date",
  "status": "enum (open, closed, upcoming)",
  "documents": "media (multiple)",
  "contact_person": "relation (team_members)"
}
```

- **Estimated Time**: 50-60 hours
- **Dependencies**: Content inventory, stakeholder input

#### Task 2.3.4: Authentication Service Integration
- **Priority**: HIGH
- **Description**: Implement enterprise-grade authentication with Auth0 or Clerk

**Deliverables**:
1. Auth0/Clerk account setup and configuration
2. User migration from WordPress
3. Single Sign-On (SSO) integration:
   - Microsoft Azure AD (existing)
   - Google Workspace
4. Multi-Factor Authentication (MFA) enforcement
5. Passwordless login options
6. Session management
7. Role-based access control
8. Audit logging for authentication events
9. Brute force protection
10. Password policy enforcement

**Authentication Flows**:
- Public users: Email/password + optional MFA
- Staff: Azure AD SSO + MFA (required)
- Admins: Azure AD SSO + MFA + IP restriction

- **Estimated Time**: 25-30 hours
- **Dependencies**: Azure AD access, user data

#### Task 2.3.5: Next.js Frontend Development
- **Priority**: HIGH
- **Description**: Build modern, responsive frontend with Next.js 14

**Deliverables**:
1. Project setup with TypeScript
2. Component library:
   - Header/Navigation
   - Footer
   - Hero sections
   - Content cards
   - Forms (contact, application, search)
   - Data tables
   - Image galleries
   - Accordions
   - Modals
   - Alerts/Notifications
   - Breadcrumbs
   - Pagination
3. Page templates:
   - Homepage
   - About pages
   - Funding programs listing
   - Individual program pages
   - Application portal
   - News/Blog listing
   - Individual articles
   - Contact page
   - Search results
   - 404/Error pages
4. API integration with Strapi
5. Authentication integration
6. Form handling and validation
7. SEO optimization:
   - Meta tags
   - Open Graph tags
   - Structured data (JSON-LD)
   - Sitemap generation
   - Robots.txt
8. Accessibility (WCAG 2.1 AA compliance)
9. Performance optimization:
   - Image optimization
   - Code splitting
   - Lazy loading
   - Caching strategies
10. Responsive design (mobile, tablet, desktop)

**Key Pages to Build**:
| Page | Complexity | Estimated Time |
|------|------------|----------------|
| Homepage | High | 12-16 hours |
| About IDC | Medium | 8-10 hours |
| Leadership Team | Medium | 8-10 hours |
| Funding Programs (listing) | High | 12-16 hours |
| Program Detail | High | 12-16 hours |
| Application Portal | Very High | 20-25 hours |
| News/Blog (listing) | Medium | 8-10 hours |
| Article Detail | Medium | 8-10 hours |
| Contact Page | Medium | 6-8 hours |
| Search Results | Medium | 8-10 hours |
| FAQ/Knowledge Base | Medium | 8-10 hours |
| Documents/Publications | Medium | 8-10 hours |
| Careers | Low | 4-6 hours |
| 404/Error Pages | Low | 4-6 hours |

- **Estimated Time**: 120-150 hours
- **Dependencies**: Design approval, content migration

#### Task 2.3.6: API Gateway & Microservices
- **Priority**: MEDIUM
- **Description**: Build API gateway and custom microservices

**Deliverables**:
1. API Gateway setup (Kong/Traefik)
2. Rate limiting configuration
3. Request/response transformation
4. Custom microservices:
   - Application processing service
   - Document management service
   - Notification service
   - Reporting service
   - Search service
5. API documentation (Swagger/OpenAPI)
6. API versioning strategy
7. Monitoring and logging

- **Estimated Time**: 35-45 hours
- **Dependencies**: Service requirements

#### Task 2.3.7: CDN & Edge Caching (Cloudflare)
- **Priority**: HIGH
- **Description**: Configure Cloudflare for CDN, DDoS protection, and security

**Deliverables**:
1. Cloudflare Enterprise setup
2. DNS configuration
3. SSL/TLS configuration (Full Strict mode)
4. Page rules for caching
5. Web Application Firewall (WAF) rules
6. DDoS protection configuration
7. Bot management
8. Image optimization (Polish)
9. Minification (HTML, CSS, JS)
10. HTTP/2 and HTTP/3 enablement
11. Geo-restriction rules (if needed)
12. Custom error pages

- **Estimated Time**: 10-12 hours
- **Dependencies**: Cloudflare account

---

## 3. Security Implementation

### 3.1 Network Security

#### Task 3.1.1: Firewall Configuration
- **Priority**: CRITICAL
- **Description**: Implement comprehensive firewall rules

**Current Exposed Ports**:
| Port | Service | Action |
|------|---------|--------|
| 21 | FTP | **CLOSE** or migrate to SFTP |
| 22 | SSH | Restrict to VPN/IP whitelist |
| 25 | SMTP | Route through email gateway |
| 53 | DNS | Restrict to internal DNS |
| 80 | HTTP | Keep (redirect to HTTPS) |
| 110 | POP3 | **CLOSE** (use IMAPS) |
| 143 | IMAP | **CLOSE** (use IMAPS) |
| 443 | HTTPS | Keep |
| 465 | SMTPS | Route through email gateway |
| 587 | Submission | Route through email gateway |
| 993 | IMAPS | Keep if needed |
| 995 | POP3S | **CLOSE** (use IMAPS) |
| 3306 | MySQL | **CLOSE IMMEDIATELY** |

**Deliverables**:
1. Firewall rules implementation
2. Port closure for unnecessary services
3. IP whitelisting for administrative access
4. VPN setup for remote administration
5. Network segmentation
6. Intrusion Detection/Prevention System (IDS/IPS)

- **Estimated Time**: 15-20 hours
- **Dependencies**: Network access

#### Task 3.1.2: Web Application Firewall (WAF)
- **Priority**: HIGH
- **Description**: Configure WAF rules for application-layer protection

**Deliverables**:
1. OWASP Top 10 protection rules
2. WordPress-specific attack prevention (during migration)
3. SQL injection prevention
4. XSS prevention
5. CSRF protection
6. Rate limiting rules
7. Bot protection
8. Custom rules for IDC-specific threats
9. WAF monitoring and alerting

- **Estimated Time**: 12-15 hours
- **Dependencies**: WAF provider (Cloudflare)

### 3.2 Application Security

#### Task 3.2.1: Security Headers Implementation
- **Priority**: HIGH
- **Current State**: Good (most headers present)
- **Target State**: Enhanced security headers

**Deliverables**:
```nginx
# Security Headers Configuration
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.idc.co.za; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=()" always;
add_header Cross-Origin-Embedder-Policy "require-corp" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Cross-Origin-Resource-Policy "same-origin" always;
```

- **Estimated Time**: 4-6 hours

#### Task 3.2.2: Input Validation & Sanitization
- **Priority**: HIGH
- **Description**: Implement comprehensive input validation

**Deliverables**:
1. Server-side validation for all forms
2. Client-side validation (React Hook Form + Zod)
3. SQL injection prevention (parameterized queries)
4. XSS prevention (output encoding)
5. CSRF token implementation
6. File upload validation
7. API input sanitization

- **Estimated Time**: 15-20 hours

#### Task 3.2.3: Encryption Implementation
- **Priority**: HIGH
- **Description**: Ensure all data is encrypted in transit and at rest

**Deliverables**:
1. TLS 1.3 configuration
2. HSTS implementation
3. Database encryption at rest (TDE)
4. File storage encryption
5. Backup encryption
6. Key management system
7. Certificate rotation automation

- **Estimated Time**: 10-12 hours

### 3.3 Monitoring & Logging

#### Task 3.3.1: Security Information and Event Management (SIEM)
- **Priority**: MEDIUM
- **Description**: Implement centralized logging and security monitoring

**Deliverables**:
1. Log aggregation setup (ELK Stack or Splunk)
2. Security event correlation
3. Real-time alerting
4. Incident response automation
5. Compliance reporting
6. Dashboard creation

**Events to Monitor**:
- Failed login attempts
- Privilege escalation
- Database access
- File modifications
- API rate limit violations
- WAF blocks
- SSL certificate expiry
- DMARC failures

- **Estimated Time**: 20-25 hours

#### Task 3.3.2: Application Performance Monitoring (APM)
- **Priority**: MEDIUM
- **Description**: Implement APM for proactive issue detection

**Deliverables**:
1. APM tool setup (Datadog/New Relic)
2. Transaction tracing
3. Error tracking
4. Performance dashboards
5. Alert configuration
6. User experience monitoring

- **Estimated Time**: 12-15 hours

---

## 4. Content Migration

### 4.1 Migration Scope

#### Task 4.1.1: Content Inventory & Audit
- **Priority**: HIGH
- **Description**: Catalog all existing content for migration

**Deliverables**:
1. Complete content inventory:
   - Pages (~50-100 pages estimated)
   - Blog posts/articles
   - Documents/publications
   - Images/media files
   - Forms
   - User accounts
2. Content quality assessment
3. Duplicate content identification
4. Outdated content flagging
5. SEO value assessment

- **Estimated Time**: 15-20 hours
- **Dependencies**: Access to current CMS

#### Task 4.1.2: Automated Migration Scripts
- **Priority**: HIGH
- **Description**: Build scripts for automated content migration

**Deliverables**:
1. WordPress data extraction scripts
2. Data transformation scripts
3. Strapi import scripts
4. Media file migration
5. URL redirect mapping
6. User account migration
7. Testing and validation

**Migration Script Example**:
```python
# Example: WordPress to Strapi migration script
import wordpress_xmlrpc
import requests

def migrate_posts():
    wp = wordpress_xmlrpc.Client('https://www.idc.co.za/xmlrpc.php', 'user', 'password')
    posts = wp.call(wordpress_xmlrpc.methods.posts.GetPosts({'number': 100}))
    
    for post in posts:
        strapi_data = {
            "title": post.title,
            "slug": post.slug,
            "content": post.content,
            "excerpt": post.excerpt,
            "published_at": post.date.isoformat(),
            "author": map_author(post.author),
            "featured_image": migrate_media(post.thumbnail)
        }
        response = requests.post('http://strapi/api/posts', json=strapi_data)
```

- **Estimated Time**: 20-25 hours

#### Task 4.1.3: Manual Content Review & Cleanup
- **Priority**: MEDIUM
- **Description**: Review and update content during migration

**Deliverables**:
1. Content updates for accuracy
2. Image optimization
3. Link verification
4. SEO metadata updates
5. Accessibility improvements

- **Estimated Time**: 30-40 hours
- **Dependencies**: Content owners availability

### 4.2 URL Redirect Strategy

#### Task 4.2.1: Redirect Mapping
- **Priority**: HIGH
- **Description**: Create comprehensive 301 redirect map to preserve SEO

**Deliverables**:
1. URL inventory from current site
2. New URL structure mapping
3. Redirect rules implementation (Cloudflare/Next.js)
4. Redirect testing
5. 404 monitoring

**Example Redirect Map**:
```
/wp-content/uploads/* -> /media/* (301)
/category/funding/* -> /funding-programs/* (301)
/tag/* -> /tags/* (301)
/author/* -> REMOVE (no author pages)
```

- **Estimated Time**: 10-12 hours

---

## 5. Testing & Quality Assurance

### 5.1 Security Testing

#### Task 5.1.1: Penetration Testing
- **Priority**: HIGH
- **Description**: Comprehensive security assessment

**Deliverables**:
1. Network penetration testing
2. Web application penetration testing
3. API security testing
4. Authentication testing
5. Authorization testing
6. Session management testing
7. Input validation testing
8. Business logic testing
9. Detailed vulnerability report
10. Remediation recommendations

- **Estimated Time**: 20-25 hours
- **Dependencies**: Application completion

#### Task 5.1.2: Vulnerability Scanning
- **Priority**: HIGH
- **Description**: Automated vulnerability scanning

**Deliverables**:
1. Dependency vulnerability scanning (Snyk/Dependabot)
2. Container image scanning
3. Infrastructure scanning
4. Continuous scanning setup
5. Remediation tracking

- **Estimated Time**: 8-10 hours

### 5.2 Performance Testing

#### Task 5.2.1: Load Testing
- **Priority**: MEDIUM
- **Description**: Test application under various load conditions

**Deliverables**:
1. Load test scenarios:
   - Normal load (100 concurrent users)
   - Peak load (500 concurrent users)
   - Stress test (1000+ concurrent users)
2. Performance metrics collection
3. Bottleneck identification
4. Optimization recommendations
5. Retesting after optimizations

- **Estimated Time**: 12-15 hours

#### Task 5.2.2: Core Web Vitals Optimization
- **Priority**: HIGH
- **Description**: Ensure all Core Web Vitals meet "Good" thresholds

**Targets**:
- Largest Contentful Paint (LCP): <2.5s
- First Input Delay (FID): <100ms
- Cumulative Layout Shift (CLS): <0.1
- Time to First Byte (TTFB): <200ms

**Deliverables**:
1. Performance audit
2. Optimization implementation
3. Continuous monitoring setup
4. Performance budget enforcement

- **Estimated Time**: 15-20 hours

### 5.3 Functional Testing

#### Task 5.3.1: Automated Testing Suite
- **Priority**: MEDIUM
- **Description**: Build comprehensive automated test suite

**Deliverables**:
1. Unit tests (Jest): 80%+ coverage
2. Integration tests
3. End-to-end tests (Playwright/Cypress)
4. API tests
5. Accessibility tests
6. Visual regression tests
7. CI/CD integration

- **Estimated Time**: 30-40 hours

#### Task 5.3.2: User Acceptance Testing (UAT)
- **Priority**: HIGH
- **Description**: Facilitate UAT with stakeholders

**Deliverables**:
1. UAT test scenarios
2. Test environment setup
3. Stakeholder training
4. Issue tracking and resolution
5. UAT sign-off

- **Estimated Time**: 15-20 hours

### 5.4 Accessibility Testing

#### Task 5.4.1: WCAG 2.1 AA Compliance
- **Priority**: HIGH
- **Description**: Ensure website meets accessibility standards

**Deliverables**:
1. Automated accessibility scanning (axe-core)
2. Manual accessibility testing
3. Screen reader testing
4. Keyboard navigation testing
5. Color contrast verification
6. Remediation of issues
7. Accessibility statement

- **Estimated Time**: 15-20 hours

---

## 6. Deployment & Go-Live

### 6.1 Deployment Strategy

#### Task 6.1.1: Blue-Green Deployment Setup
- **Priority**: HIGH
- **Description**: Implement zero-downtime deployment strategy

**Deliverables**:
1. Blue environment (current production)
2. Green environment (new version)
3. Traffic switching mechanism
4. Rollback procedures
5. Health check implementation
6. Monitoring during cutover

- **Estimated Time**: 10-12 hours

#### Task 6.1.2: Staging Environment
- **Priority**: HIGH
- **Description**: Set up production-like staging environment

**Deliverables**:
1. Staging infrastructure
2. Data synchronization from production
3. Access control
4. Testing procedures
5. Approval workflow

- **Estimated Time**: 8-10 hours

### 6.2 Go-Live Activities

#### Task 6.2.1: Pre-Launch Checklist
- **Priority**: HIGH
- **Description**: Comprehensive pre-launch verification

**Checklist Items**:
- [ ] All security tests passed
- [ ] Performance benchmarks met
- [ ] Content migration complete
- [ ] Redirects configured and tested
- [ ] DNS changes prepared
- [ ] SSL certificates installed
- [ ] Monitoring dashboards active
- [ ] Backup procedures verified
- [ ] Rollback plan documented
- [ ] Support team trained
- [ ] Stakeholder sign-off obtained

- **Estimated Time**: 8-10 hours

#### Task 6.2.2: Launch Day Execution
- **Priority**: CRITICAL
- **Description**: Execute go-live plan

**Activities**:
1. Final database sync
2. DNS switchover
3. SSL certificate verification
4. Smoke testing
5. Monitoring activation
6. Issue resolution
7. Stakeholder communication

- **Estimated Time**: 8-12 hours (launch day)

#### Task 6.2.3: Post-Launch Monitoring
- **Priority**: HIGH
- **Description**: Intensive monitoring for 2 weeks post-launch

**Activities**:
1. 24/7 monitoring for first 48 hours
2. Daily performance reviews
3. Error tracking and resolution
4. User feedback collection
5. Security monitoring
6. Traffic analysis
7. Optimization adjustments

- **Estimated Time**: 20-25 hours (over 2 weeks)

---

## 7. Documentation & Training

### 7.1 Technical Documentation

#### Task 7.1.1: System Architecture Documentation
- **Priority**: MEDIUM
- **Description**: Comprehensive technical documentation

**Deliverables**:
1. Architecture diagrams
2. Component specifications
3. API documentation
4. Database schema
5. Security architecture
6. Deployment procedures
7. Disaster recovery plan
8. Runbooks for common operations

- **Estimated Time**: 15-20 hours

#### Task 7.1.2: Developer Documentation
- **Priority**: MEDIUM
- **Description**: Documentation for development team

**Deliverables**:
1. Setup guide
2. Coding standards
3. Git workflow
4. Testing procedures
5. Deployment process
6. Troubleshooting guide
7. FAQ

- **Estimated Time**: 10-12 hours

### 7.2 User Documentation

#### Task 7.2.1: Content Editor Guide
- **Priority**: HIGH
- **Description**: Training materials for content editors

**Deliverables**:
1. Strapi CMS user guide
2. Content creation tutorials
3. Media management guide
4. Workflow documentation
5. Video tutorials
6. Quick reference cards

- **Estimated Time**: 12-15 hours

#### Task 7.2.2: Administrator Guide
- **Priority**: HIGH
- **Description**: Documentation for system administrators

**Deliverables**:
1. System administration guide
2. User management procedures
3. Security procedures
4. Backup and recovery
5. Monitoring and alerting
6. Troubleshooting guide

- **Estimated Time**: 10-12 hours

### 7.3 Training Sessions

#### Task 7.3.1: Content Editor Training
- **Priority**: HIGH
- **Description**: Hands-on training for content editors

**Deliverables**:
1. Training sessions (2-3 sessions)
2. Hands-on workshops
3. Q&A sessions
4. Training recordings
5. Assessment of understanding

- **Estimated Time**: 8-10 hours

#### Task 7.3.2: Administrator Training
- **Priority**: HIGH
- **Description**: Technical training for IT staff

**Deliverables**:
1. System administration training
2. Security procedures training
3. Incident response training
4. Monitoring and troubleshooting
5. Hands-on labs

- **Estimated Time**: 10-12 hours

---

## 8. Ongoing Maintenance & Support

### 8.1 Regular Maintenance Activities

#### Task 8.1.1: Security Updates & Patching
- **Priority**: CRITICAL
- **Frequency**: Weekly
- **Description**: Keep all components up to date

**Activities**:
1. Monitor security advisories
2. Apply security patches within 48 hours
3. Update dependencies
4. Container image updates
5. Test updates in staging
6. Deploy to production
7. Verify functionality

**Estimated Monthly Time**: 8-10 hours

#### Task 8.1.2: Performance Monitoring & Optimization
- **Priority**: HIGH
- **Frequency**: Continuous
- **Description**: Proactive performance management

**Activities**:
1. Monitor Core Web Vitals
2. Analyze performance trends
3. Identify bottlenecks
4. Implement optimizations
5. Database query optimization
6. Cache optimization
7. CDN configuration updates

**Estimated Monthly Time**: 6-8 hours

#### Task 8.1.3: Content Updates & Support
- **Priority**: MEDIUM
- **Frequency**: As needed
- **Description**: Support content team with updates

**Activities**:
1. Content publishing assistance
2. Template updates
3. New feature implementation
4. Bug fixes
5. User support

**Estimated Monthly Time**: 10-15 hours

#### Task 8.1.4: Backup Management
- **Priority**: HIGH
- **Frequency**: Daily
- **Description**: Ensure data protection

**Activities**:
1. Verify automated backups
2. Test backup restoration quarterly
3. Backup retention management
4. Offsite backup verification
5. Disaster recovery testing (annually)

**Estimated Monthly Time**: 2-4 hours

#### Task 8.1.5: DMARC & Email Security Monitoring
- **Priority**: HIGH
- **Frequency**: Weekly
- **Description**: Monitor email authentication

**Activities**:
1. Review DMARC reports
2. Investigate failures
3. Update SPF/DKIM as needed
4. Monitor email deliverability
5. Quarterly DMARC policy review

**Estimated Monthly Time**: 3-4 hours

### 8.2 Proactive Improvements

#### Task 8.2.1: Feature Enhancements
- **Priority**: MEDIUM
- **Frequency**: Quarterly
- **Description**: Implement new features based on user feedback

**Activities**:
1. Gather requirements
2. Prioritize feature backlog
3. Design and development
4. Testing
5. Deployment

**Estimated Quarterly Time**: 20-30 hours

#### Task 8.2.2: Security Assessments
- **Priority**: HIGH
- **Frequency**: Quarterly
- **Description**: Regular security reviews

**Activities**:
1. Vulnerability scanning
2. Penetration testing (annually)
3. Security configuration review
4. Access review
5. Incident response plan testing

**Estimated Quarterly Time**: 10-15 hours

#### Task 8.2.3: Compliance Audits
- **Priority**: HIGH
- **Frequency**: Annually
- **Description**: Ensure ongoing compliance

**Activities**:
1. POPIA compliance review
2. Accessibility audit
3. Security policy review
4. Documentation updates
5. Staff training updates

**Estimated Annual Time**: 20-25 hours

### 8.3 Support Structure

#### Task 8.3.1: Support Tiers

**Tier 1 - Immediate Response (Critical Issues)**
- Response Time: 1 hour
- Issues: Site down, security breach, data loss
- Resolution Target: 4 hours

**Tier 2 - High Priority**
- Response Time: 4 hours
- Issues: Major functionality broken, performance degradation
- Resolution Target: 24 hours

**Tier 3 - Medium Priority**
- Response Time: 24 hours
- Issues: Minor bugs, content updates
- Resolution Target: 3-5 business days

**Tier 4 - Low Priority**
- Response Time: 3-5 business days
- Issues: Feature requests, enhancements
- Resolution Target: Next release cycle

#### Task 8.3.2: Support Channels
1. Email support: support@hexstrike.ai
2. Phone support: Dedicated hotline for critical issues
3. Ticketing system: Jira/ServiceNow
4. Slack/Teams: For quick questions
5. Monthly status meetings

---

## 9. Project Timeline & Milestones

### 9.1 Phase Breakdown

```
Phase 1: Foundation & Security (Weeks 1-4)
├── Week 1: DMARC/SPF/DKIM implementation
├── Week 2: Infrastructure setup (Docker, Kubernetes)
├── Week 3: Database migration planning
└── Week 4: Security hardening (firewall, WAF)

Phase 2: Backend Development (Weeks 5-10)
├── Week 5-6: Strapi CMS setup and configuration
├── Week 7-8: Authentication service integration
├── Week 9: API development
└── Week 10: Content modeling and migration scripts

Phase 3: Frontend Development (Weeks 11-18)
├── Week 11-12: Next.js setup and component library
├── Week 13-14: Core pages development
├── Week 15-16: Application portal development
└── Week 17-18: Polish, optimization, accessibility

Phase 4: Testing & Migration (Weeks 19-22)
├── Week 19: Security testing
├── Week 20: Performance testing
├── Week 21: Content migration
└── Week 22: UAT and bug fixes

Phase 5: Deployment & Handover (Weeks 23-24)
├── Week 23: Staging deployment and final testing
└── Week 24: Production deployment and go-live

Phase 6: Post-Launch (Weeks 25-28)
├── Week 25-26: Intensive monitoring
├── Week 27: Documentation completion
└── Week 28: Training and handover
```

### 9.2 Critical Milestones

| Milestone | Target Date | Dependencies |
|-----------|-------------|--------------|
| DMARC Policy Upgrade | Week 1 | DNS access |
| Infrastructure Ready | Week 4 | Cloud provider selection |
| Database Migration Complete | Week 8 | Data inventory |
| CMS Configuration Complete | Week 10 | Content model approval |
| Frontend MVP Complete | Week 16 | Design approval |
| Security Testing Complete | Week 19 | Application completion |
| Content Migration Complete | Week 21 | Content inventory |
| UAT Sign-off | Week 22 | Stakeholder availability |
| Go-Live | Week 24 | All previous milestones |
| Project Closure | Week 28 | Successful launch |

---

## 10. Cost Breakdown

### 10.1 One-Time Development Costs

| Component | Hours | Rate (ZAR/hour) | Cost (ZAR) |
|-----------|-------|-----------------|------------|
| **DMARC & Email Security** | | | |
| DMARC Policy Upgrade | 6 | R 1,500 | R 9,000 |
| Subdomain DMARC | 12 | R 1,500 | R 18,000 |
| SPF Configuration | 6 | R 1,500 | R 9,000 |
| DKIM Implementation | 8 | R 1,500 | R 12,000 |
| Monitoring Infrastructure | 16 | R 1,500 | R 24,000 |
| **Subtotal** | **48** | | **R 72,000** |
| | | | |
| **Infrastructure Setup** | | | |
| Docker + Kubernetes | 50 | R 1,800 | R 90,000 |
| Database Migration | 40 | R 1,800 | R 72,000 |
| Cloudflare Configuration | 12 | R 1,500 | R 18,000 |
| **Subtotal** | **102** | | **R 180,000** |
| | | | |
| **Backend Development** | | | |
| Strapi CMS Implementation | 60 | R 1,800 | R 108,000 |
| Authentication Integration | 30 | R 1,800 | R 54,000 |
| API Gateway & Microservices | 40 | R 1,800 | R 72,000 |
| **Subtotal** | **130** | | **R 234,000** |
| | | | |
| **Frontend Development** | | | |
| Next.js Application | 150 | R 1,800 | R 270,000 |
| Component Library | 40 | R 1,800 | R 72,000 |
| **Subtotal** | **190** | | **R 342,000** |
| | | | |
| **Content Migration** | | | |
| Content Inventory | 20 | R 1,200 | R 24,000 |
| Migration Scripts | 25 | R 1,500 | R 37,500 |
| Manual Review & Cleanup | 40 | R 1,200 | R 48,000 |
| Redirect Mapping | 12 | R 1,200 | R 14,400 |
| **Subtotal** | **97** | | **R 123,900** |
| | | | |
| **Security Implementation** | | | |
| Firewall Configuration | 20 | R 1,800 | R 36,000 |
| WAF Configuration | 15 | R 1,800 | R 27,000 |
| Security Headers & Encryption | 18 | R 1,800 | R 32,400 |
| Penetration Testing | 25 | R 2,000 | R 50,000 |
| **Subtotal** | **78** | | **R 145,400** |
| | | | |
| **Testing & QA** | | | |
| Load Testing | 15 | R 1,500 | R 22,500 |
| Automated Test Suite | 40 | R 1,500 | R 60,000 |
| Accessibility Testing | 20 | R 1,500 | R 30,000 |
| UAT Support | 20 | R 1,500 | R 30,000 |
| **Subtotal** | **95** | | **R 142,500** |
| | | | |
| **Deployment** | | | |
| Blue-Green Deployment | 12 | R 1,800 | R 21,600 |
| Staging Environment | 10 | R 1,800 | R 18,000 |
| Launch Execution | 12 | R 2,000 | R 24,000 |
| Post-Launch Monitoring | 25 | R 1,500 | R 37,500 |
| **Subtotal** | **59** | | **R 101,100** |
| | | | |
| **Documentation & Training** | | | |
| Technical Documentation | 27 | R 1,500 | R 40,500 |
| User Documentation | 27 | R 1,500 | R 40,500 |
| Training Sessions | 22 | R 1,500 | R 33,000 |
| **Subtotal** | **76** | | **R 114,000** |
| | | | |
| **Project Management** | | | |
| Planning & Coordination | 40 | R 1,800 | R 72,000 |
| Stakeholder Communication | 20 | R 1,800 | R 36,000 |
| Risk Management | 10 | R 1,800 | R 18,000 |
| **Subtotal** | **70** | | **R 126,000** |
| | | | |
| **GRAND TOTAL (Development)** | **945** | | **R 1,580,900** |

### 10.2 Ongoing Monthly Maintenance Costs

| Service | Hours/Month | Rate (ZAR/hour) | Monthly Cost (ZAR) | Annual Cost (ZAR) |
|---------|-------------|-----------------|-------------------|------------------|
| **Security Maintenance** | | | | |
| Security Updates & Patching | 10 | R 1,800 | R 18,000 | R 216,000 |
| DMARC Monitoring | 4 | R 1,500 | R 6,000 | R 72,000 |
| Vulnerability Scanning | 4 | R 1,800 | R 7,200 | R 86,400 |
| **Subtotal** | **18** | | **R 31,200** | **R 374,400** |
| | | | | |
| **Performance & Optimization** | | | | |
| Performance Monitoring | 8 | R 1,500 | R 12,000 | R 144,000 |
| Database Optimization | 4 | R 1,800 | R 7,200 | R 86,400 |
| **Subtotal** | **12** | | **R 19,200** | **R 230,400** |
| | | | | |
| **Content & Support** | | | | |
| Content Updates Support | 15 | R 1,500 | R 22,500 | R 270,000 |
| Bug Fixes | 10 | R 1,500 | R 15,000 | R 180,000 |
| User Support | 5 | R 1,200 | R 6,000 | R 72,000 |
| **Subtotal** | **30** | | **R 43,500** | **R 522,000** |
| | | | | |
| **Infrastructure Management** | | | | |
| Backup Management | 4 | R 1,500 | R 6,000 | R 72,000 |
| Infrastructure Monitoring | 4 | R 1,500 | R 6,000 | R 72,000 |
| **Subtotal** | **8** | | **R 12,000** | **R 144,000** |
| | | | | |
| **Proactive Improvements** | | | | |
| Feature Enhancements | 25 | R 1,800 | R 45,000 | R 540,000 |
| Security Assessments | 12 | R 1,800 | R 21,600 | R 259,200 |
| **Subtotal** | **37** | | **R 66,600** | **R 799,200** |
| | | | | |
| **TOTAL MONTHLY** | **105** | | **R 172,500** | |
| **TOTAL ANNUAL** | **1,260** | | | **R 2,070,000** |

### 10.3 Third-Party Service Costs

| Service | Tier | Monthly Cost (ZAR) | Annual Cost (ZAR) |
|---------|------|-------------------|------------------|
| Cloudflare Enterprise | Custom | R 15,000 | R 180,000 |
| Auth0/Clerk | Professional | R 5,000 | R 60,000 |
| Hosting (AWS/GCP/Azure) | Production | R 20,000 | R 240,000 |
| Monitoring (Datadog/New Relic) | Pro | R 8,000 | R 96,000 |
| Backup Storage | 1TB | R 2,000 | R 24,000 |
| Email Service (SendGrid/Mailgun) | Business | R 3,000 | R 36,000 |
| **TOTAL** | | **R 53,000** | **R 636,000** |

### 10.4 Total Cost Summary

| Cost Category | One-Time | Annual |
|---------------|----------|--------|
| Development | R 1,580,900 | - |
| Monthly Maintenance | - | R 2,070,000 |
| Third-Party Services | - | R 636,000 |
| **TOTAL** | **R 1,580,900** | **R 2,706,000** |

### 10.5 Discounted Package Options

#### Option 1: Full Service (Recommended)
- **Development**: R 1,580,900 (as above)
- **Annual Maintenance**: R 2,706,000
- **Total First Year**: R 4,286,900
- **Subsequent Years**: R 2,706,000/year

#### Option 2: Development Only
- **Development**: R 1,580,900
- **Handover with documentation**
- **No ongoing maintenance included**
- **Optional maintenance contract available**

#### Option 3: Phased Approach
- **Phase 1-2 (Foundation + Backend)**: R 600,000
- **Phase 3-4 (Frontend + Testing)**: R 600,000
- **Phase 5-6 (Deployment + Training)**: R 380,900
- **Annual Maintenance**: R 2,706,000
- **Allows budget distribution over multiple fiscal years**

#### Option 4: Essential Services Only (Cost-Optimized)
- **DMARC/Email Security**: R 72,000
- **Security Hardening**: R 145,400
- **Basic Migration (no rebuild)**: R 200,000
- **Total One-Time**: R 417,400
- **Annual Maintenance**: R 500,000
- **Note**: Does not include full rebuild, addresses critical security only

---

## 11. Risk Management

### 11.1 Project Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| **Scope Creep** | High | Medium | Strict change control, MVP approach |
| **Timeline Delays** | Medium | Medium | Agile methodology, buffer time |
| **Budget Overrun** | Medium | High | Fixed-price phases, contingency fund |
| **Technical Complexity** | Medium | High | Experienced team, proof of concepts |
| **Stakeholder Availability** | High | Medium | Early scheduling, clear communication |
| **Data Migration Issues** | Medium | High | Extensive testing, rollback plan |
| **Third-Party Dependencies** | Low | Medium | Vendor contracts, alternatives identified |

### 11.2 Operational Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| **Security Breach** | Low | High | Regular audits, monitoring, incident response plan |
| **Service Downtime** | Low | High | High availability setup, disaster recovery |
| **Data Loss** | Low | High | Automated backups, offsite storage, testing |
| **Performance Degradation** | Medium | Medium | Proactive monitoring, capacity planning |
| **Staff Turnover** | Medium | Medium | Documentation, knowledge transfer, cross-training |

---

## 12. Success Criteria & KPIs

### 12.1 Project Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Security Score** | 9.5/10 | Security assessment |
| **Page Load Time** | <500ms | Core Web Vitals |
| **Uptime** | 99.99% | Monitoring tools |
| **Zero Critical Vulnerabilities** | 100% | Penetration testing |
| **WCAG 2.1 AA Compliance** | 100% | Accessibility audit |
| **On-Time Delivery** | Within 28 weeks | Project tracking |
| **On-Budget Delivery** | Within 10% of estimate | Financial tracking |
| **Stakeholder Satisfaction** | >90% | Survey |

### 12.2 Ongoing Maintenance KPIs

| Metric | Target | Reporting Frequency |
|--------|--------|---------------------|
| **Security Patches Applied** | Within 48 hours | Monthly |
| **Mean Time to Resolution (MTTR)** | <4 hours | Monthly |
| **Uptime** | 99.99% | Monthly |
| **Performance Score** | >90 (Lighthouse) | Weekly |
| **DMARC Compliance** | >99% | Weekly |
| **Backup Success Rate** | 100% | Daily |
| **User Satisfaction** | >85% | Quarterly |

---

## 13. Conclusion & Recommendations

### 13.1 Immediate Actions (Week 1)

1. **Approve Project Plan**: Executive sign-off on scope and budget
2. **DMARC Policy Upgrade**: Begin with email security improvements
3. **Close MySQL Port 3306**: Critical security fix
4. **Assemble Project Team**: Assign roles and responsibilities
5. **Kick-off Meeting**: Align all stakeholders

### 13.2 Strategic Recommendations

1. **Prioritize Security**: The current security vulnerabilities, especially the exposed MySQL database and incomplete DMARC implementation, require immediate attention regardless of the full rebuild timeline.

2. **Phased Approach**: Consider the phased implementation to distribute costs and reduce risk. Start with critical security fixes, then proceed with the rebuild.

3. **Invest in Training**: Ensure internal staff are trained on the new system to reduce long-term dependency on external support.

4. **Establish Governance**: Create a website governance committee to oversee ongoing development, content strategy, and security.

5. **Plan for Growth**: The new architecture should support future digital transformation initiatives, including mobile apps, AI-powered services, and enhanced analytics.

### 13.3 Long-Term Vision

By implementing this comprehensive plan, the IDC will achieve:

- **Industry-Leading Security**: Zero critical vulnerabilities, full DMARC implementation, compliance with all relevant regulations
- **Superior User Experience**: Fast, accessible, mobile-friendly website that serves all stakeholders effectively
- **Operational Efficiency**: Reduced maintenance burden, faster content updates, streamlined workflows
- **Scalable Platform**: Architecture that supports growth and future innovation
- **Enhanced Reputation**: Modern, professional online presence that reflects IDC's role as a leading development finance institution

---

## 14. Appendices

### 14.1 Glossary

- **DMARC**: Domain-based Message Authentication, Reporting & Conformance
- **SPF**: Sender Policy Framework
- **DKIM**: DomainKeys Identified Mail
- **CMS**: Content Management System
- **SSO**: Single Sign-On
- **MFA**: Multi-Factor Authentication
- **WAF**: Web Application Firewall
- **CDN**: Content Delivery Network
- **POPIA**: Protection of Personal Information Act (South Africa)
- **WCAG**: Web Content Accessibility Guidelines

### 14.2 References

- IDC Security Assessment Report (IDC_SECURITY_ASSESSMENT_REPORT.md)
- IDC Executive Summary (IDC_EXECUTIVE_SUMMARY.md)
- IDC Technical Modernization Plan (IDC_TECHNICAL_MODERNIZATION_PLAN.md)
- OWASP Top 10
- NIST Cybersecurity Framework
- South African POPIA Regulations

### 14.3 Contact Information

**Prepared by**: HexStrike AI Cybersecurity  
**Date**: April 3, 2026  
**Version**: 1.0  
**Confidentiality**: RESTRICTED - Internal Use Only

**For inquiries**:  
- Email: info@hexstrike.ai
- Phone: [To be provided]
- Website: https://hexstrike.ai

---

*This document provides a comprehensive roadmap for the complete modernization of the IDC website. All recommendations are based on industry best practices, security standards, and the specific requirements identified during the security assessment. The proposed timeline and budget are estimates and may be adjusted based on detailed requirements gathering and stakeholder feedback.*
