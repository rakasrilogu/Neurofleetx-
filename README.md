# NeuroFleetX  

NeuroFleetX is a modern platform built to streamline **urban fleet intelligence and management**. By combining **secure JWT authentication**, **real-time WebSocket updates**, and **Google Maps visualization**, it provides a robust and scalable solution for vehicle tracking and operations. The platform is designed for **fleet operators, mobility startups, and smart city initiatives**, offering an intelligent ecosystem that balances usability, performance, and security.  

## ✅ Functional Requirements  

### User Management & Authentication  
- The system must allow users to **sign up, log in, and log out securely**.  
- JWT-based token authentication must secure API access with `Authorization: Bearer <token>`.  
- Protected routes in the frontend must only be accessible to authenticated users.  

### Vehicle & Fleet Management  
- Provide REST APIs for CRUD operations on vehicle data.  
- Display a **list of vehicles** in the dashboard with the ability to add new ones.  
- Show a **Google Maps view** with the current location of all tracked vehicles.  
- Push **real-time vehicle updates** to the frontend over WebSocket/STOMP via `/topic/vehicles`.  

### Dashboard & Visualization  
- Provide a **dashboard** for authenticated users showing summary metrics.  
- Display **KPIs** such as number of vehicles and activity trends.  
- Integrate charts and tables for clear data visualization.  

### Notifications (Planned)  
- Allow push-style real-time notifications for vehicle events (e.g., new vehicle added).  
- Extend WebSocket channel for alert broadcasting.  


## ⚡ Non-Functional Requirements  

- **Performance**: WebSocket updates must propagate within **<2 seconds** from server to client.  
- **Scalability**: Stateless JWT authentication and REST APIs ensure horizontal scalability.  
- **Security**:  
  - Use **Spring Security + JWT filter chain** for authentication.  
  - Store passwords securely with `BCryptPasswordEncoder`.  
  - Use strong Base64-encoded secret for JWT signing.  
- **Usability**: The React SPA must be **responsive, intuitive, and optimized** for desktop and tablet use.  

---

## 🧪 Positive Test Cases  

### Authentication Test  
- **Steps:**  
  1. Register a new user via `/api/auth/register`.  
  2. Login with the new user at `/api/auth/login`.  
  3. Call `/api/dashboard` with a valid token.  
- **Expected Result:** User is successfully authenticated and can access the protected dashboard endpoint.  

### Vehicle API Test  
- **Steps:**  
  1. Send `POST /api/vehicles` with valid vehicle data (e.g., name, type, location).  
  2. Call `GET /api/vehicles`.  
- **Expected Result:** Vehicle is created in the database and appears in the list of vehicles.  

### Real-Time Tracking Test  
- **Steps:**  
  1. Login and open the dashboard map.  
  2. Add or update a vehicle’s location from the backend.  
  3. Observe the frontend map.  
- **Expected Result:** Vehicle icon updates within 2 seconds, reflecting the new location in real time.  

### Dashboard Metrics Test  
- **Steps:**  
  1. Login with valid credentials.  
  2. Navigate to the dashboard.  
- **Expected Result:** Summary metrics (e.g., total vehicles) are displayed correctly.  

## 🔮 Planned Enhancements  
- Role-based access control (Admin, Manager, Driver).  
- Predictive maintenance alerts powered by AI/ML.  
- Advanced analytics and traffic-aware route optimization.  
- Real-time congestion prediction with data visualization.  


