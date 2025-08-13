# RM Frontend

A comprehensive Vue 3 frontend application for Remedial Management System with multiple modules including Procurement, Inbound, Inventory, and Sales.

## 🚀 Features

- **Multi-Module Architecture**: Procurement, Inbound, Inventory, Sales, and Customer Success
- **Comprehensive API Mocking**: Complete mock system for frontend development
- **Modern Tech Stack**: Vue 3, TypeScript, Tailwind CSS, Vite
- **Responsive Design**: Mobile-first approach with modern UI components
- **Authentication System**: Login, password reset, and user management
- **Dashboard Analytics**: Charts, metrics, and data visualization
- **Data Tables**: Advanced filtering, sorting, and pagination
- **File Management**: Upload, download, and file handling

## 🛠️ Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide Vue Next + Custom SVG icons
- **Charts**: Chart.js integration
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Development**: TypeScript, ESLint, Prettier

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Ahamisi/rm-frontend.git
cd rm-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Available Modules

### 1. **Procurement** (`/dashboard`)
- Supplier management
- Purchase orders
- Payment tracking
- Procurement analytics

### 2. **Inbound** (`/inbound/dashboard`)
- Goods receiving
- GRN management
- Purchase order fulfillment
- Delivery tracking

### 3. **Inventory** (`/admin/products`)
- Product management
- Stock levels
- Categories and manufacturers
- Warehouse management

### 4. **Sales/Customer Success** (`/customer-success`)
- Customer management
- Order tracking
- Sales analytics
- User management

## 🔧 API Mocking

The application includes a comprehensive API mocking system that automatically intercepts all HTTP requests in development mode:

- **Automatic**: Enabled by default in development
- **Realistic Data**: Includes pagination, filtering, and search
- **Complete Coverage**: All endpoints mocked with realistic responses
- **Easy Testing**: Built-in test functions available in browser console

### Testing Mock APIs
```javascript
// In browser console
import('./src/api/test-mock.js').then(m => m.testMockAPIs())
```

## 🌐 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Environment Variables
```env
VITE_MOCK_API=true
VITE_API_URL=http://localhost:8000/api
VITE_API_V2_URL=http://localhost:8000/api/v2
```

## 📁 Project Structure

```
src/
├── api/                 # API configuration and mocking
├── assets/             # Static assets
├── components/         # Reusable Vue components
├── css/               # Global styles
├── router/            # Vue Router configuration
├── stores/            # Pinia stores
├── types/             # TypeScript type definitions
├── views/             # Page components and layouts
└── main.ts            # Application entry point
```

## 🎨 UI Components

The application includes a comprehensive set of reusable UI components:

- **Forms**: Input fields, select boxes, file uploaders
- **Tables**: Data tables with filtering and pagination
- **Modals**: Confirmation, success, error modals
- **Navigation**: Headers, breadcrumbs, tabs
- **Charts**: Donut charts, pie charts, metrics cards
- **Buttons**: Various button styles and states

## 🔐 Authentication

- Login with phone number and password
- Password reset functionality
- User profile management
- Department-based access control

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🚧 Development

```bash
# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm run test:unit
```

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Contributing

This is a private project. Please contact the maintainers for contribution guidelines.

---

**Built with ❤️ using Vue 3 and modern web technologies**
