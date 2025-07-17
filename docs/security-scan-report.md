#  Container Vulnerability Report  
## Logistics-Order-System - Dual Security Scanning Summary

---

##  Purpose

This report documents the results of two container image vulnerability scans performed during the CI pipeline and after deployment, to ensure enterprise-level security compliance.

-  Detect known vulnerabilities (CVEs) in OS layers and application packages
-  Block insecure builds early in the CI/CD process
-  Enable visibility into image risks before production deployment

---

##  Tools Used

| Stage            | Tool                         | Description |
|------------------|------------------------------|-------------|
| CI Pipeline      | [Trivy](https://github.com/aquasecurity/trivy) | Open-source scanner integrated in GitHub Actions |
| AWS Deployment   | Amazon ECR + Inspector       | Native AWS scanner triggered post-push to ECR |

---

##  Trivy CI Scan Results

- Docker Image: `backend-app`
- Base Image: `python:3.11-slim (debian 12.11)`
- Total Vulnerabilities: **12**
  - OS-level: 9 (8 HIGH, 1 CRITICAL)
  - Python packages: 3 (all HIGH)

###  Notable Vulnerabilities

| Component       | CVE ID            | Severity | Description |
|-----------------|-------------------|----------|-------------|
| `zlib1g`        | CVE-2023-45853    | CRITICAL | Integer overflow → heap-based buffer overflow |
| `glibc`         | CVE-2025-4802     | HIGH     | LD_LIBRARY_PATH hijacking in setuid binaries |
| `pam` family    | CVE-2025-6020     | HIGH     | Directory traversal via Linux-PAM |

 **Python Dependency Risks**

| Package        | CVE ID            | Severity | Fix Available |
|----------------|-------------------|----------|----------------|
| Flask-Cors     | CVE-2024-6221     | HIGH     | ✅ `4.0.2` |
| setuptools     | CVE-2024-6345     | HIGH     | ✅ `70.0.0` |
| setuptools     | CVE-2025-47273    | HIGH     | ✅ `78.1.1` |

> Full output available in `trivy-report.txt` (attached to GitHub Actions artifacts)

---

## ECR Inspector Scan Results (Post-deployment)

- Image: `209479264082.dkr.ecr.ap-southeast-1.amazonaws.com/backend:latest`
- Auto scan: Enabled
- Source: Amazon Inspector (built into ECR)

### Findings Summary

- HIGH: 2  
- MEDIUM: 6  
- CRITICAL: 0  
- Tool did not scan Python application packages

> ECR Inspector focuses on vulnerabilities in OS libraries (glibc, pam, tar, gnutls, etc.), not Python packages.

---

##  Comparison: Trivy vs ECR Inspector

| Feature              | Trivy (CI)           | ECR Inspector (AWS) |
|----------------------|----------------------|----------------------|
| Scan Timing          | On Docker image build | After push to ECR    |
| Scope                | OS + Application Layer (Python) | OS layer only     |
| Customizability      | ✅ Flexible output, JSON support | ❌ Limited        |
| Output               | Uploadable artifacts | Console only         |
| Use Case             | Early prevention in CI | Cloud-native protection |

---

## Recommendations

- **Fix HIGH/CRITICAL issues** using the suggested `Fixed Version`
- **Upgrade base images** regularly
- **Pin Python package versions** in `requirements.txt`
- Consider using **distroless** or Alpine-based images for better security

---

## Suggested Interview Narrative

> “I implemented a dual-layered image security strategy. Trivy is used in the CI pipeline to catch OS and application vulnerabilities during development, while Amazon Inspector handles post-deployment scans on ECR. This ensures early detection and ongoing protection in production environments.”

---

## Report Status

- CI scan results: `trivy-report.txt`
- ECR Inspector screenshots: [see repository or documentation]
- Scan date: July 2025