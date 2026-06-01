# 🍽️ Naar & Noor

> A modern, full-stack restaurant management application built with Angular and .NET Core

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
[![GitHub](https://img.shields.io/badge/github-Naar--Noor-black?logo=github)](https://github.com/Mostafa-SAID7/Naar-Noor)
[![Deployment](https://img.shields.io/badge/deployment-Vercel%20%26%20Azure-success)](https://naar-noor.vercel.app)

## 🎯 Overview

Naar & Noor is a comprehensive restaurant management system that streamlines operations from menu management to customer reservations and orders. Built with modern technologies and clean architecture principles.

### ✨ Key Features

- 🎨 **Modern UI** - Responsive Angular frontend with Tailwind CSS
- 🔧 **Robust API** - RESTful backend with Swagger documentation
- 📊 **Database** - SQL Server with Entity Framework Core
- 🔐 **Clean Architecture** - CQRS pattern with MediatR
- 📱 **Mobile Ready** - Fully responsive design
- ⚡ **Performance** - Optimized builds and caching
- 🚀 **Deployment Ready** - Vercel & Azure configured

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **.NET 8.0 SDK** ([Download](https://dotnet.microsoft.com/download))
- **SQL Server** (Local or Remote)
- **Git** ([Download](https://git-scm.com/))

### Installation (5 Minutes)

#### 1. Clone Repository
```bash
git clone https://github.com/Mostafa-SAID7/Naar-Noor.git
cd Naar-Noor
```

#### 2. Backend Setup
```bash
cd api-server
dotnet restore
dotnet run --project src/NaarNoor.API/NaarNoor.API.csproj
```
✅ Backend: `http://localhost:5000`

#### 3. Frontend Setup (New Terminal)
```bash
cd naar-noor
npm install
npm run dev
```
✅ Frontend: `http://localhost:4200`

### Verify Installation

- **Backend API**: http://localhost:5000/swagger
- **Frontend**: http://localhost:4200
- **Health Check**: http://localhost:5000/health

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [Getting Started](docs/GETTING_STARTED.md) | Detailed setup instructions |
| [Project Structure](docs/PROJECT_STRUCTURE.md) | Codebase organization |
| [Architecture](docs/ARCHITECTURE.md) | System design & patterns |
| [API Reference](docs/API.md) | Complete API documentation |
| [Frontend Guide](docs/FRONTEND.md) | Angular development guide |
| [Backend Guide](docs/BACKEND.md) | .NET development guide |
| [Database](docs/DATABASE.md) | Schema & migrations |
| [Deployment](docs/DEPLOYMENT.md) | Production setup |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Common issues & solutions |

---

## 🏗️ Tech Stack

### Frontend
```
Angular 18 • TypeScript • Tailwind CSS • RxJS
```

### Backend
```
ASP.NET Core 8 • Entity Framework Core • SQL Server • MediatR
```

### Architecture
```
Clean Architecture • CQRS Pattern • Dependency Injection • Repository Pattern
```

---

## 📁 Project Structure

```
Naar-Noor/
├── api-server/                 # .NET Backend
│   ├── src/
│   │   ├── NaarNoor.API/       # Web API layer
│   │   ├── NaarNoor.Application/  # Business logic
│   │   ├── NaarNoor.Infrastructure/ # Data access
│   │   └── NaarNoor.Domain/    # Domain entities
│   └── NaarNoor.sln
│
├── naar-noor/                  # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── app.config.ts
│   │   ├── environments/
│   │   └── styles.css
│   └── package.json
│
├── docs/                       # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── BACKEND.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT.md
│   ├── FRONTEND.md
│   ├── GETTING_STARTED.md
│   ├── PROJECT_STRUCTURE.md
│   └── TROUBLESHOOTING.md
│
└── README.md                   # This file
```

---

## 🔌 API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/chefs` | Get all chefs |
| `GET` | `/api/menu` | Get menu items |
| `GET` | `/api/reviews` | Get approved reviews |
| `POST` | `/api/reservations` | Create reservation |
| `POST` | `/api/orders` | Create order |
| `POST` | `/api/contact` | Submit inquiry |
| `GET` | `/health` | Health check |

📖 **Full API Documentation**: [API.md](docs/API.md)

---

## 🛠️ Development

### Build Frontend
```bash
cd naar-noor
npm run build
```

### Build Backend
```bash
cd api-server
dotnet build
```

### Run Tests
```bash
# Frontend
cd naar-noor
npm test

# Backend
cd api-server
dotnet test
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Automatic deployment on push to main
# https://naar-noor.vercel.app
```

### Backend (Azure/Custom)
```bash
# See docs/DEPLOYMENT.md for detailed instructions
```

---

## 🤝 Contributing

We welcome contributions from the community! Please read our guidelines before getting started.

### 📋 Quick Contributing Guide

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📚 Contributing Resources

- 📖 [Contributing Guidelines](docs/CONTRIBUTING.md) - Detailed contribution process
- 📜 [Code of Conduct](CODE_OF_CONDUCT.md) - Community standards
- 🔒 [Security Policy](SECURITY.md) - Reporting vulnerabilities
- 📝 [Changelog](CHANGELOG.md) - Project history

---

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE.md](LICENSE.md) for details.

---

## 📞 Support & Community

### 🆘 Getting Help

- 📖 **Documentation**: Browse our comprehensive [docs/](docs/) folder
- 🐛 **Bug Reports**: [Create an issue](https://github.com/Mostafa-SAID7/Naar-Noor/issues/new?template=bug_report.md)
- ✨ **Feature Requests**: [Request a feature](https://github.com/Mostafa-SAID7/Naar-Noor/issues/new?template=feature_request.md)
- 📚 **Documentation Issues**: [Report docs issues](https://github.com/Mostafa-SAID7/Naar-Noor/issues/new?template=documentation.md)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Mostafa-SAID7/Naar-Noor/discussions)

### 🔒 Security

Found a security vulnerability? Please read our [Security Policy](SECURITY.md) and report it responsibly.

---

## 🎉 Acknowledgments

- Built with ❤️ by the Naar & Noor team
- Inspired by modern restaurant management practices
- Thanks to all contributors and supporters

---

<div align="center">

**[⬆ Back to Top](#-naar--noor)**

Made with ❤️ | [GitHub](https://github.com/Mostafa-SAID7/Naar-Noor) | [Live Demo](https://naar-noor.vercel.app)

</div>
