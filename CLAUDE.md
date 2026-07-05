This is my full stack job board application. It is built with a spring boot java backend, a react frontend, and data persistency is implemented with PostGreSQL.

The frontend allows users to learn about the platform. then they can register either as a student or a researcher. researchers get on to their dashboard and it shows them analytics on what students applied to what positions they posted. they also can make postings. students can apply to the positions posted by researchers. 


### 📋 SYSTEM CONTEXT & DEPLOYMENT OVERVIEW: VRMM PROJECT

**To the AI Assistant:** Please read the following comprehensive context regarding the deployment of a university enterprise web application. Use this context to assist the developer with the remaining DevOps, database configuration, Nginx setup, and Spring Security (OIDC) code.

#### 1. Project Background
*   **Project Name:** Virtual Research Match Maker (VRMM)
*   **Purpose:** An internal, campus-wide job board connecting Western University researchers (faculty) with students looking for project experience.
*   **Stakeholders:** Mouiz (Lead Developer), Dr. Joshua Pearce (Principal Investigator), David Lee (Engineering IT - Infrastructure Provider), WTS / Central IT (SSO Provider).
*   **Compliance:** Cleared by the Technology Risk Assessment Committee (TRAC) and Privacy Impact Assessment (PIA). Fully compliant with FIPPA laws (Hosted on-premise, no passwords stored locally, minimal PII collected).

#### 2. Architecture & Tech Stack (The "All-in-One" Monolith)
The entire application will be hosted on a single Ubuntu Virtual Machine.
*   **Frontend:** React.js (Compiled to static files via `npm run build`).
*   **Backend:** Java / Spring Boot REST API (Running locally on Port 8080).
*   **Database:** PostgreSQL (Running locally on Port 5432).
*   **Web Server / Proxy:** Nginx (Running on Ports 80 & 443). 
    *   *Role 1:* Serve the compiled React static files at the root directory (`/`).
    *   *Role 2:* Act as a reverse proxy, forwarding all `/api/*` requests to the Spring Boot backend on Port 8080.
    *   *Role 3:* Handle SSL termination at the edge.

#### 3. Infrastructure & Networking Status
*   **Host:** Western Engineering IT.
*   **Server Specs:** Ubuntu LTS, 8GB RAM, 2-4 Cores, 60-100GB Storage.
*   **Access:** The developer has successfully connected to the VM via SSH (`ed25519` keypair). 
*   **Domain Name:** `vrmm.eng.uwo.ca` (DNS routing is scheduled to be completed by Monday, July 6, 2026).
*   **SSL Certificates:** Engineering IT is providing a wildcard certificate (`*.eng.uwo.ca`). The `.crt` and `.key` files will be placed directly on the server by IT, and file paths will be provided. (No need for Certbot).

#### 4. Authentication (OIDC / SSO)
The application *strictly* uses Western University’s Single Sign-On. Local email/password registration has been scrapped.
*   **Protocol:** OpenID Connect (OIDC) / OAuth2 via Spring Security (`spring-boot-starter-oauth2-client`). 
*   **Requested Claims from IdP:** Western Email (used as the unique database identifier), First Name, Last Name, and Affiliation (multi-value return, e.g., `["student", "faculty"]` for Role-Based Access Control).
*   **Current SSO Status:** Waiting for the domain to go live so the developer can provide the exact Callback URL (`https://vrmm.eng.uwo.ca/login/oauth2/code/western`) to WTS IT. Once provided, IT will generate the Client ID and Client Secret.
*   **Session Management:** The frontend React app will rely on stateless JWTs. If a token expires, Spring Boot throws a 401 Unauthorized, and a React Axios Interceptor catches it, deletes the token, and routes the user back to the SSO login page.

#### 5. Current Progress (Where we left off)
*   The developer has SSH access to the blank Ubuntu production server.
*   The system packages are being installed via `apt` (Java 17, Node/NPM, Postgres, Nginx, Git).
*   The Git repository has been cloned to the server.

#### 6. Immediate Next Steps Required from the AI
The developer needs step-by-step assistance with the following DevOps tasks:
1.  **PostgreSQL Setup:** Command-line instructions to create a production database, a dedicated database user, and a secure password inside the VM.
2.  **Spring Boot Production Profile:** Creating an `application-prod.properties` file with the correct Postgres local database URI and placeholder OIDC properties.
3.  **Daemonization:** Setting up a `systemd` service file so the Spring Boot `.jar` runs continuously in the background and restarts automatically if the server reboots.
4.  **Nginx Configuration:** Writing the exact `nginx.conf` (or sites-available config) to handle the SSL certificates, serve the React build folder (including fallback for React Router), and reverse proxy `/api/` traffic to `127.0.0.1:8080`.
5.  **Spring Security Code:** Assisting with the Java configuration to ingest the OIDC tokens from Western SSO and map the claims (Email, Affiliation) to the local database roles. 
