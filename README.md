# Fetch Dogs

A modern React application for finding and adopting shelter dogs.

## Running the App Locally

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and go to: [http://localhost:5173](http://localhost:5173)

## Accessing the App Online

You can also access the app online at:
[https://fetch-one-theta.vercel.app](https://fetch-one-theta.vercel.app)

### Technologies Used

- **React & React Hooks:** The frontend is implemented entirely in React with TypeScript. Hooks such as `useState`, `useEffect`, and `useContext` are used to manage state and side effects.
- **Context API:** Global state management for authentication and favorites is handled by React Context, simplifying data flow across components
- **React Router:** Client-side routing is managed by React Router, which enables smooth transitions between pages and protects certain routes
- **REST API Integration:** The app consumes the provided backend API to fetch dog data, available breeds, search results, and handle user authentication
- **Tailwind:** Styling is done with Tailwind, offering a utility-first approach that makes the UI responsive and easily customizable

### Application Functionality

- **Search & Filtering:** Users can filter dogs by breed, age range, and ZIP code. The search results update automatically as filters are adjusted.
- **Sorting & Pagination:** Results are sortable in either ascending or descending order by breed, name, age. Pagination controls are available for easy navigation when the search returns a large number of dogs.
- **Favorites & Matching:** Users can add dogs to their favorites in the Search page that will then be available in the Favorites page. In the Favorites page the user can generate a match from their selected favorites to suggest an ideal companion for adoption.
- **Adoption Process:** A dedicated Adoption page outlines the steps needed to adopt a dog, ensuring a smooth process for interested users. This page is purely for decoration right now.
- **User Authentication:** A simple login flow ensures that only authenticated users have access to the Search and Adoption pages. Right now any name / email will work and your session will be valid for an hour unless you log out.

## Technical Decisions

**useContext vs Local State:**  
I chose to use the Context API for global state management of authentication and favorites because it allows for seamless sharing of state across the app without prop drilling. This approach is more scalable and maintainable than relying solely on local component state should the app need to grow in the future.

**Tailwind vs MUI:**  
Tailwind was selected for its utility-first approach, which provides high flexibility and rapid styling customization. Although MUI offers comprehensive pre-built components, in this case I felt Tailwind was more appropriate since it gave me more control to create a custom look.

**API Abstraction:**  
The API abstraction is implemented in the file `client/src/api/index.ts`. The goal of centralizing all API calls in one modul was to ensure a consistent approach to data fetching, simplify error handling, and making it easier to update endpoints across the app as it scales.

**Types Abstraction:**  
The dedicated `client/src/types/index.ts` file stores common types used throughout the application. This approach promotes consistency, improves type safety with TypeScript, and simplifies long term maintenance by providing a single source of truth for shared type definitions. For a project of this size maybe not strictly necessary but I thought it could help down the line.
