import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/auth/AuthContext"; 

// Importar las páginas
import HomePage from "./pages/Home/HomePage";
import HomePageAdmin from "./services/admin/HomePageAdmin"; 
import ProductsPage from "./pages/Products/ProductsPage";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import CartPage from "./pages/Cart/CartPage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import ProfilePage from "./pages/Profile/ProfilePage"; 
import { CartProvider } from './components/Cart/CartContext'; // Importa el CartProvider

// Importar componentes comunes
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Sidebar from "./components/Layout/Sidebar";

// Importar componentes de admin
import AdminNavbar from "./services/LayoutAdmin/AdminNavbar";
import AdminFooter from "./services/LayoutAdmin/AdminFooter";
import AdminSidebar from "./services/LayoutAdmin/AdminSidebar";

// Importar paginas de admin
import EditProfileAdmin from "./services/admin/EditProfileAdmin"; // Importa la nueva página
import AddCategoryPage from "./services/Pages/Categorias"; // Página de agregar categoría
import AddCollaboratorPage from "./services/Pages/colaboradores/CollaboratorManagementPage"; // Página de agregar colaborador
import Productos from "./services/Pages/Productos"; // Página de agregar Productos
import EditHomePage from "./services/Pages/EditHomePage";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

const MainLayout = () => {
  const location = useLocation(); 
  const { user, userRole, loading } = useAuth(); // Ahora obtienes el rol del usuario desde el contexto

  
  // Si los datos aún están cargando, puedes mostrar un loading spinner o pantalla de carga
  if (loading) {
    return <div>Loading...</div>;
  }


  const routesWithoutSidebar = ["/contact", "/profile", "/about", "/"];

  const renderAdminLayout = () => (
    <>
      <AdminNavbar />
      <main className="flex min-h-screen bg-gray-100 pt-16">
        <aside className="w-64 bg-gray-200">
          <AdminSidebar />
        </aside>
        <section className="flex-grow p-4">
          <Routes>
            <Route path="/admin" element={<HomePageAdmin />} />
            <Route path="/admin/edit-profile" element={<EditProfileAdmin />} />
            <Route path="/admin/add-category" element={<AddCategoryPage />} />
            <Route path="/admin/add-collaborator" element={<AddCollaboratorPage />} />
            <Route path="/admin/add-Products" element={<Productos />} />
            <Route path="/admin/edit-home" element={<EditHomePage />} />
            {/* Otras rutas de administración */}
          </Routes>
        </section>
      </main>
      <AdminFooter />
    </>
  );

  const renderUserLayout = () => (
    <>
      <Navbar />
      <main className="flex flex-col md:flex-row min-h-screen bg-gray-100 pt-16">
        {!routesWithoutSidebar.includes(location.pathname) && (
          <aside className="w-full md:w-1/4 bg-gray-200">
            <Sidebar />
          </aside>
        )}

        <section className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </>
  );

  // Si el usuario es admin, renderizar el layout de admin, sino el layout de usuario
  return userRole === "admin" ? renderAdminLayout() : renderUserLayout();
};

export default App;
