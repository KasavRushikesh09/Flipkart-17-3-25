// src/data/chatbotLogic.ts
import { dummyProducts } from './products';
import { CartItem } from '../context/CartContext';

// Helper function to get unique categories
const getCategories = (): string[] => {
  return Array.from(new Set(dummyProducts.map(product => product.category)));
};

// Helper function to search products by name or category
const searchProducts = (query: string): string => {
  const lowerQuery = query.toLowerCase().trim();
  const filteredProducts = dummyProducts.filter(
    product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );

  if (filteredProducts.length === 0) {
    return 'Sorry, I couldn’t find any products matching your query. Try something like "smartphone x" or "jeans".';
  }

  const productList = filteredProducts
    .slice(0, 3) // Limit to 3 results for brevity
    .map(product => `- ${product.name} (₹${product.price}, ${product.category})`)
    .join('\n');
  return `I found these products:\n${productList}\nAsk for more details about a specific product, like "Tell me about Smartphone X".`;
};

// Helper function to get detailed product information
const getProductDetails = (query: string): string => {
  const lowerQuery = query.toLowerCase().trim();
  const product = dummyProducts.find(
    product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );

  if (!product) {
    return 'Sorry, I couldn’t find that product. Try something like "Smartphone X" or "Jeans".';
  }

  return `Here are the details for ${product.name}:\n- Price: ₹${product.price}\n- Original Price: ₹${product.originalPrice}\n- Discount: ${product.discount}% off\n- Rating: ${product.rating} ★ (${product.reviewCount} reviews)\n- Category: ${product.category}\n- Brand: ${product.brand}\n- Description: ${product.description}\n\nYou can view this product on the Product Details page by clicking on it from the Products page.`;
};

// Helper function to list all project features
const getProjectFeatures = (): string => {
  return `This Flipkart Clone project includes the following features:\n- **Product Listing Page**: Browse all products with a search bar (filters products by name or description), category filters, sorting options (Price Low to High, Price High to Low, Newest First), and pagination (8 products per page).\n- **Product Details Page**: View detailed product info (image, price, original price, discount, rating, reviews, category, brand, description) with "Add to Cart" and "Buy Now" buttons.\n- **Cart System**: Add products to your cart, update quantities, remove items, and view the total price. The cart persists in local storage.\n- **Profile Section**: Edit your personal details (name, email, phone, address) and upload a profile picture, which is displayed in the navbar.\n- **Navbar**: Includes a search bar (desktop and mobile), cart icon with item count, profile picture with a dropdown (My Profile, Logout), and more options.\n- **Floating Cart**: A floating cart icon appears when scrolling down, showing the cart item count and linking to the cart page.\n- **Responsive Design**: The app is fully responsive, with optimized layouts for mobile and desktop screens.\n- **Performance Optimization**: Uses React.memo, useMemo, and lazy loading for images to prevent unnecessary re-renders.\n- **Chatbot**: That’s me! I can help with greetings, project info, product details, categories, cart, profile, and more.\n\nWhat would you like to explore?`;
};

// Main function to process user input and generate response
export const processUserInput = (input: string, cart: CartItem[]): string => {
  const lowerInput = input.toLowerCase().trim();

  // Greeting
  if (['hi', 'hello', 'hey'].some(greeting => lowerInput.includes(greeting))) {
    return 'Hello! I’m the Flipkart Clone assistant. I can help with products, categories, your cart, profile, project features, and more. What would you like to know?';
  }

  // Project information
  if (lowerInput.includes('project') || lowerInput.includes('about')) {
    return 'This is a Flipkart Clone project built with React and TypeScript. It’s an e-commerce platform where you can browse products, add them to your cart, view product details, manage your profile, and more. Ask "What features are available?" for a detailed list of features.';
  }

  // Project features
  if (lowerInput.includes('feature') || lowerInput.includes('what can i do')) {
    return getProjectFeatures();
  }

  // Categories
  if (lowerInput.includes('categories') || lowerInput.includes('category')) {
    const categories = getCategories();
    return `We have the following categories available:\n- ${categories.join('\n- ')}\nYou can browse them on the Products page. What would you like to explore?`;
  }

  // Detailed product information
  if (
    lowerInput.includes('tell me about') ||
    lowerInput.includes('details') ||
    lowerInput.includes('product info')
  ) {
    const query = lowerInput
      .replace('tell me about', '')
      .replace('details', '')
      .replace('product info', '')
      .trim();
    if (query) {
      return getProductDetails(query);
    }
    return 'Please specify a product to get details for, like "Tell me about Smartphone X".';
  }

  // Product search
  if (
    lowerInput.includes('product') ||
    lowerInput.includes('show') ||
    lowerInput.includes('find')
  ) {
    const query = lowerInput
      .replace('product', '')
      .replace('show', '')
      .replace('find', '')
      .trim();
    if (query) {
      return searchProducts(query);
    }
    return 'Please specify a product or category to search for, like "smartphones" or "jeans".';
  }

  // Cart information
  if (lowerInput.includes('cart')) {
    if (cart.length === 0) {
      return 'Your cart is empty. Try adding some products from the Products page!';
    }
    const cartItems = cart
      .map(item => `- ${item.name} (₹${item.price} x ${item.quantity})`)
      .join('\n');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return `Here’s what’s in your cart:\n${cartItems}\n\nTotal: ₹${total}\nYou can view your cart by clicking the cart icon in the navbar.`;
  }

  // Profile information
  if (lowerInput.includes('profile')) {
    const savedProfile = localStorage.getItem('userProfile');
    if (!savedProfile) {
      return 'It looks like you don’t have a profile set up. Visit the Profile page to create one!';
    }
    const profile = JSON.parse(savedProfile);
    return `Here’s your profile information:\n- Name: ${profile.name}\n- Email: ${profile.email}\n- Phone: ${profile.phone}\n- Address: ${profile.address}\nYou can edit this on the Profile page.`;
  }

  // Help
  if (lowerInput.includes('help')) {
    return 'I can assist with the following:\n- Say "Hi" to greet me\n- Ask "Tell me about this project" for project details\n- Ask "What features are available?" to see all features\n- Ask "What categories are available?" to see product categories\n- Say "Show me smartphones" to search for products\n- Ask "Tell me about Smartphone X" for detailed product info\n- Ask "What’s in my cart?" to see your cart\n- Ask "Tell me about my profile" for profile info\nWhat would you like to do?';
  }

  // Default response
  return 'I’m not sure how to help with that. Try asking about products, categories, your cart, profile, or features. You can also type "help" for more options!';
};