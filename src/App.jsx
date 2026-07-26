import AppProviders from "./app/AppProviders.jsx";
import AppRoutes from "./app/routes.jsx";

/**
 * ============================================================================
 * HEMAP-RMS Frontend
 * ============================================================================
 * Root Application Component
 * ============================================================================
 */

export default function App() {
    return (
        <AppProviders>
            <AppRoutes />
        </AppProviders>
    );
}