'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  children?: MenuItem[];
}

interface HeaderProps {
  menuItems?: MenuItem[];
  logo?: string;
  companyName?: string;
}

export default function Header({ 
  menuItems = [], 
  logo, 
  companyName = "Kafe Joyeros" 
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const defaultMenuItems: MenuItem[] = [
    { id: 1, title: 'Inicio', url: '/' },
    { id: 2, title: 'Nosotros', url: '/nosotros' },
    { id: 3, title: 'Servicios', url: '/servicios' },
    { id: 4, title: 'Galería', url: '/galeria' },
    { id: 5, title: 'Blog', url: '/blog' },
    { id: 6, title: 'Contacto', url: '/contacto' },
  ];

  const navigationItems = menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              {logo ? (
                <Image 
                  src={logo} 
                  alt={companyName}
                  width={40}
                  height={40}
                  className="h-8 lg:h-10 w-auto"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm lg:text-base">K</span>
                  </div>
                  <span className={`font-bold text-lg lg:text-xl ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                    {companyName}
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className={`font-medium transition-colors duration-200 hover:text-amber-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contacto"
              className="btn-luxury text-white px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-luxury hover:shadow-luxury-hover"
            >
              Cotizar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Abrir menú"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="block px-3 py-2 text-gray-700 font-medium hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/contacto"
                  className="block w-full text-center btn-luxury text-white px-4 py-2 rounded-full font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cotizar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}