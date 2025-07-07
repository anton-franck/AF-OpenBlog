# AF-OpenBlog 0.2

Ein modernes, vollständig dockerisiertes Blog-System mit Next.js Frontend und Strapi CMS Backend.

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#features)
- [Technologie-Stack](#technologie-stack)
- [Voraussetzungen](#voraussetzungen)
- [Installation](#installation)
- [Entwicklung](#entwicklung)
- [Produktion](#produktion)
- [Lizenz](#lizenz)

## Überblick

AF-OpenBlog ist eine moderne, skalierbare Blog-Plattform, die auf bewährten Technologien basiert. Das System kombiniert ein React-basiertes Frontend mit einem flexiblen Headless CMS und bietet eine vollständige Docker-Umgebung für einfache Entwicklung und Deployment.

## Features

- **Modernes Frontend**: Next.js 15 mit React 19 und Tailwind CSS
- **Headless CMS**: Strapi 5.14 für flexible Inhaltsadministration
- **Docker-Ready**: Vollständig containerisierte Umgebung
- **MariaDB**: Robuste Datenbankschicht
- **Responsive Design**: Optimiert für alle Geräte
- **Entwicklerfreundlich**: Hot-Reload und moderne Entwicklungstools
- **Sicherheit**: JWT-basierte Authentifizierung
- **Produktionsbereit**: Optimierte Build-Prozesse

## Technologie-Stack

### Frontend

- **Framework**: Next.js 15.3.5
- **UI**: React 19 + Tailwind CSS 4
- **Icons**: Lucide React
- **Komponenten**: Radix UI
- **Styling**: Class Variance Authority + clsx

### Backend

- **CMS**: Strapi 5.14.0
- **Runtime**: Node.js 18 (Alpine)
- **Datenbank**: MariaDB 11.3.2

### DevOps

- **Container**: Docker & Docker Compose
- **Build**: Turbopack (Next.js)
- **Automatisierung**: Makefile

## Voraussetzungen

**Minimale Anforderungen:**

- Docker & Docker Compose
- Git
- Make
- `openssl` (für Token-Generierung)

**Optional (für manuelle Entwicklung):**

- Node.js 18+

## Installation

### Einfache Installation (empfohlen)

```bash
# Installationsskript herunterladen
curl -O https://raw.githubusercontent.com/anton-franck/AF-OpenBlog/main/install.sh

# Ausführbar machen und starten
chmod +x install.sh
./install.sh
```

Das Skript führt Sie durch die Installation und fragt nach:

- **Blog-Name**: Wird als Projekt-Name verwendet
- **Datenbank Root-Passwort**: Für MariaDB
- **Datenbank Benutzer-Passwort**: Für Strapi-Datenbankzugriff

### API-Key Setup

Nach der Installation müssen Sie einen Strapi API-Key generieren:

1. **Strapi starten**:

   ```bash
   make up
   ```

2. **Strapi Admin öffnen**: http://localhost:1338/admin

3. **Admin-Account erstellen** (beim ersten Besuch)

4. **API-Key generieren**:

   - Settings → API Tokens → Create new API Token
   - Name: `Frontend`
   - Token duration: `Unlimited`
   - Token type: `Read-only` oder `Full access`
   - Kopieren Sie den generierten Token

5. **API-Key in .env eintragen**:

   ```bash
   # .env Datei öffnen und STRAPI_API_KEY setzen
   STRAPI_API_KEY="your-generated-api-key-here"
   ```

6. **Services neu starten**:
   ```bash
   make up
   ```

### Manuelle Installation

Falls Sie das Installationsskript nicht verwenden möchten:

```bash
# Repository klonen
git clone https://github.com/anton-franck/AF-OpenBlog.git
cd AF-OpenBlog

# Umgebungsvariablen manuell einrichten
cp .env.example .env
# Bearbeiten Sie die .env Datei mit Ihren Konfigurationen

# Alles installieren und aktualisieren
make update

# Services starten
make up
```

## Entwicklung

### Entwicklungsumgebung starten

```bash
# Mit Make
make up-develop

# Oder manuell
docker compose -f docker-compose.develop.yml up -d
```

### Frontend-Entwicklung

```bash
cd blog-frontend
npm run dev    # Startet mit Turbopack
```

### Strapi-Entwicklung

```bash
# Strapi Admin Interface: http://localhost:1337/admin
docker compose exec strapi npm run develop
```

### Verfügbare Services

- **Frontend**: http://localhost
- **Strapi Admin**: http://localhost:1338/admin
- **Strapi API**: http://localhost:1338/api

## ⚡ Schnellstart

Nach der Installation können Sie das System mit einem einzigen Befehl starten:

```bash
make up
```

Das war's! Ihr Blog ist jetzt unter http://localhost verfügbar.

## Produktion

### Produktionsumgebung starten

```bash
make up
# oder
docker compose up -d
```

## Lizenz

Dieses Projekt steht unter der [MIT Lizenz](LICENSE).

---

**Entwickelt mit ❤️ von Anton Franck**

Für Fragen oder Support öffnen Sie bitte ein [Issue](https://github.com/anton-franck/AF-OpenBlog/issues).
