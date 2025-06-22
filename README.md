# 🚚 Enterprise Logistics Management System on AWS


A production-grade, full-stack logistics management system built with **Flask + React** and powered by **AWS Cloud**.  
This project demonstrates end-to-end skills in **cloud infrastructure automation (Terraform)**, **secure DevOps**, **EKS container orchestration**, and **enterprise security engineering**.

---

## 📦 Features

- **End-to-End Logistics System**  
  - User registration/login, order creation, order search.
  - RESTful API backend (Flask) + Modern React SPA frontend.

- **Enterprise Cloud Infrastructure**  
  - Infrastructure as Code with **Terraform** (modular VPC, subnets, EKS, RDS, ECR, IAM, Security Groups).
  - Cloud-native database (PostgreSQL RDS), private subnets, cross-VPC peering, ALB.

- **CI/CD Pipeline**  
  - Automated build/test/deploy with **GitHub Actions**.
  - Container images pushed to ECR, deployed to EKS using Helm Charts.

- **Cloud Security & Resilience**  
  - Multi-layer security: VPC/subnet isolation, SG least privilege, RDS private access.
  - End-to-end S3 encryption, CloudTrail logging, CloudWatch + SNS alerting.
  - GuardDuty threat detection, Lambda auto-remediation (public S3, object recovery).
  - No hard-coded secrets, JWT authentication, env-based sensitive config.

- **Scalability & Observability**  
  - Horizontal scaling via EKS, stateless microservices architecture.
  - CloudWatch log/metric collection, event-driven alerts.

---

## 🗂️ Project Structure

```plaintext
logistics-order-system/
│
├── backend/            # Flask API server (containerized)
├── frontend/           # React SPA (containerized)
├── helm-chart/         # Helm chart for EKS deployment
├── infra/              # Terraform IAC (VPC, EKS, RDS, etc.)
├── .github/            # GitHub Actions CI/CD workflows
└── README.md
