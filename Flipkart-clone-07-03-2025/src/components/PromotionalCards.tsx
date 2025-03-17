// src/components/PromotionalCards.tsx
import React from 'react';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  ShoppingBag, 
  Tv, 
  Gift,
  Plane,
  Baby,
  Gamepad2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../data/products';

const categories = [
  { id: 1, title: 'Top Offers', icon: <Gift size={24} />, imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100', link: '/top-offers' },
  { id: 2, title: 'Mobiles & Tablets', icon: <Smartphone size={24} />, imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100', link: '/mobiles-tablets' },
  { id: 3, title: 'Electronics', icon: <Tv size={24} />, imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100', link: '/electronics' },
  { id: 4, title: 'Fashion', icon: <Shirt size={24} />, imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png?q=100', link: '/fashion' },
  { id: 5, title: 'Appliances', icon: <Home size={24} />, imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100', link: '/appliances' },
  { id: 6, title: 'Grocery', icon: <ShoppingBag size={24} />, imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100', link: '/grocery' },
  { id: 7, title: 'Travel', icon: <Plane size={24} />, imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100', link: '/travel' },
  { id: 8, title: 'Beauty & Toys', icon: <Baby size={24} />, imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100', link: '/beauty-toys' },
  { id: 9, title: 'Two Wheelers', icon: <Gamepad2 size={24} />, imageUrl: 'https://rukminim1.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100', link: '/two-wheelers' },
];

const dealSections = [
  {
    id: 1,
    title: "Best of Electronics",
    bgColor: "bg-white",
    viewAllLink: "#",
    items: [
      { id: 201, name: "Bluetooth Headphones", price: 999, originalPrice: 3999, discount: 75, imageUrl: "https://tse3.mm.bing.net/th?id=OIP.DpO9BvSC8255RfrqM4QGqgHaHa&pid=Api&P=0&h=220", link: "#", rating: 4.2, reviewCount: 150, category: "Electronics", brand: "BrandA", description: "Wireless headphones with noise cancellation." },
      { id: 202, name: "Printers", price: 3999, originalPrice: 4999, discount: 20, imageUrl: "https://rukminim1.flixcart.com/image/150/150/printer/j/j/y/hp-laserjet-m1005-multifunction-original-imadxhzpeb9qbrfg.jpeg?q=70", link: "#", rating: 4.0, reviewCount: 80, category: "Electronics", brand: "HP", description: "Compact printer for home and office use." },
      { id: 203, name: "Monitors", price: 7999, originalPrice: 9999, discount: 20, imageUrl: "https://rukminim1.flixcart.com/image/150/150/ko8xtow0/monitor/t/a/y/d24-20-66aekac1in-lenovo-original-imag2qwzazcdmqtb.jpeg?q=70", link: "#", rating: 4.3, reviewCount: 120, category: "Electronics", brand: "Lenovo", description: "24-inch monitor with Full HD resolution." },
      { id: 204, name: "Camera", price: 1999, originalPrice: 9999, discount: 80, imageUrl: "https://rukminim1.flixcart.com/image/150/150/jfbfde80/camera/n/r/n/canon-eos-eos-3000d-dslr-original-imaf3t5h9yuyc5zu.jpeg?q=70", link: "#", rating: 4.5, reviewCount: 200, category: "Electronics", brand: "Canon", description: "DSLR camera for photography enthusiasts." },
      { id: 205, name: "External Hard Drives", price: 3499, originalPrice: 4499, discount: 22, imageUrl: "https://tse2.mm.bing.net/th?id=OIP.m7ZLuj_XiwqZ3lRdkiQorwHaHa&pid=Api&P=0&h=220", link: "#", rating: 4.1, reviewCount: 90, category: "Electronics", brand: "WD", description: "1TB external hard drive for data storage." },
      { id: 206, name: "Gaming Laptops", price: 59999, originalPrice: 74999, discount: 20, imageUrl: "https://tse3.mm.bing.net/th?id=OIP.AaGdVAV6RcUI_vFW5lZQMAHaFj&pid=Api&P=0&h=220", link: "#", rating: 4.4, reviewCount: 300, category: "Electronics", brand: "Asus", description: "High-performance gaming laptop with RGB keyboard." }
    ]
  },
  {
    id: 2,
    title: "Today's Fashion Deals",
    bgColor: "bg-white",
    viewAllLink: "#",
    items: [
      { id: 101, name: "Men's T-Shirts", price: 499, originalPrice: 999, discount: 50, imageUrl: "https://rukminim1.flixcart.com/image/150/150/xif0q/t-shirt/t/e/0/l-st-theboys-black-smartees-original-imagnqszzzzyuzru.jpeg?q=70", link: "#", rating: 4.0, reviewCount: 150, category: "Clothing", brand: "Smartees", description: "Comfortable black cotton t-shirt with a trendy design." },
      { id: 102, name: "Casual Shoes", price: 799, originalPrice: 1999, discount: 60, imageUrl: "https://m.media-amazon.com/images/I/711wOx63QiL._SY695_.jpg", link: "#", rating: 4.2, reviewCount: 80, category: "Footwear", brand: "Nike", description: "Stylish casual shoes perfect for everyday wear." },
      { id: 103, name: "Wrist Watches", price: 599, originalPrice: 1999, discount: 70, imageUrl: "https://www.carlington.in/cdn/shop/products/3377_Black_1_0c08f99b-f0a5-4747-a63d-0910c2ed43b2.jpg?v=1695529841&width=1920", link: "#", rating: 4.3, reviewCount: 200, category: "Electronics", brand: "Carlington", description: "Elegant wrist watch with a sleek black design." },
      { id: 104, name: "Handbags", price: 1199, originalPrice: 1999, discount: 40, imageUrl: "https://tse3.mm.bing.net/th?id=OIP.2osHOZ52JG1Hjbad7m3xXgHaJ4&pid=Api&P=0&h=220", link: "#", rating: 4.1, reviewCount: 90, category: "Clothing", brand: "Lavie", description: "Chic handbag for women, ideal for daily use." },
      { id: 105, name: "Sandals & Floaters", price: 499, originalPrice: 999, discount: 50, imageUrl: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2024/AUGUST/30/FITagAN2_04f83a6ffe5a46cfb1d18d2d33963724.jpg", link: "#", rating: 4.0, reviewCount: 70, category: "Footwear", brand: "Myntra", description: "Comfortable sandals for casual outings." },
      { id: 106, name: "Kurtas & Kurtis", price: 699, originalPrice: 1999, discount: 65, imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/1/UV/TP/SV/74166486/inl09-5--500x500.jpg", link: "#", rating: 4.4, reviewCount: 120, category: "Clothing", brand: "Biba", description: "Traditional kurta set for festive occasions." }
    ]
  },
  {
    id: 3,
    title: "Special Offers",
    bgColor: "bg-white",
    viewAllLink: "#",
    items: [
      { id: 301, name: "Smartwatches", price: 1999, originalPrice: 4999, discount: 60, imageUrl: "https://tse4.mm.bing.net/th?id=OIP.z8FnZH-EdzeOPJLvW86V_QHaHa&pid=Api&P=0&h=220", link: "#", rating: 4.3, reviewCount: 180, category: "Electronics", brand: "Noise", description: "Smartwatch with fitness tracking features." },
      { id: 302, name: "Beauty Products", price: 499, originalPrice: 999, discount: 50, imageUrl: "https://tse2.mm.bing.net/th?id=OIP.pHk0oBVIz_kWo4erdbOlwQHaFi&pid=Api&P=0&h=220", link: "#", rating: 4.2, reviewCount: 110, category: "Beauty", brand: "Lakme", description: "Makeup kit for daily beauty needs." },
      { id: 303, name: "Home Appliances", price: 6999, originalPrice: 9999, discount: 30, imageUrl: "https://tse1.mm.bing.net/th?id=OIP.3NGbQwBq6vS0wWGzoHBM3AHaFF&pid=Api&P=0&h=220", link: "#", rating: 4.1, reviewCount: 95, category: "Appliances", brand: "Philips", description: "Multi-purpose home appliance for cooking." }
    ]
  }
];

const PromotionalCards: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (item: Product) => {
    console.log('Adding to cart:', item);
    addToCart(item);
  };

  return (
    <div className="bg-[#f1f3f6]">
      <div className="bg-white py-3 px-2 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2">
            {categories.map((category) => (
              <a 
                key={category.id} 
                href={category.link}
                className="flex flex-col items-center justify-center p-2 hover:text-[#2874f0] transition-colors"
              >
                <img 
                  src={category.imageUrl} 
                  alt={category.title}
                  className="w-16 h-16 object-contain mb-1"
                  loading="lazy"
                />
                <h3 className="text-xs font-medium text-center">{category.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
      {dealSections.map((section) => (
        <div key={section.id} className={`${section.bgColor} py-4 mt-2`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded shadow overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-medium">{section.title}</h2>
                <a 
                  href={section.viewAllLink} 
                  className="px-5 py-2 bg-[#2874f0] text-white font-medium rounded-sm hover:bg-blue-600 transition-colors"
                >
                  VIEW ALL
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 divide-x divide-y">
                {section.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col items-center p-4 hover:shadow-lg transition-all duration-300"
                  >
                    <a href={item.link} className="flex flex-col items-center">
                      <div className="h-36 flex items-center justify-center mb-4">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="font-medium text-sm text-center text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-sm text-[#388e3c] font-medium">{item.discount}% off</p>
                      <p className="text-sm text-gray-800">₹{item.price}</p>
                    </a>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="mt-2 w-full bg-[#fb641b] text-white py-1 rounded hover:bg-[#f4511e] text-sm transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromotionalCards;