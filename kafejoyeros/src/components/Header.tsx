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
  darkBackground?: boolean;
}

export default function Header({ 
  menuItems = [], 
  logo, 
  companyName = "",
  darkBackground = false
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

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
    { id: 4, title: 'Editorial', url: '/editorial' },
    { id: 5, title: 'Blog', url: '/blog' },
    { 
      id: 6, 
      title: 'Contacto', 
      url: '/contacto',
      children: [
        { id: 61, title: 'Preguntas Frecuentes', url: '/contacto#faq' }
      ]
    },
  ];

  const navigationItems = menuItems.length > 0 ? menuItems : defaultMenuItems;
  const leftNavItems = navigationItems.filter((item) => item.title === 'Nosotros' || item.title === 'Servicios');
  const rightNavItems = navigationItems.filter((item) => item.title === 'Editorial' || item.title === 'Blog');

  return (
    <header 
      className={`fixed top-0 py-2 left-0 right-0 z-50 transition-all duration-300 ${
        darkBackground
          ? 'bg-[#171717] backdrop-blur-md shadow-lg'
          : isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-center gap-20 py-6 mt-2">
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {leftNavItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.children && setOpenSubmenu(item.id)}
                //onMouseLeave={() => item.children && setOpenSubmenu(null)}
              >
                <Link
                  href={item.url}
                  className={`font-medium font-tai-lue transition-colors duration-200 hover:text-gray-300 flex items-center ${
                    darkBackground ? 'text-white' : isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.title}
                  {item.children && (
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        openSubmenu === item.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {item.children && openSubmenu === item.id && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    onMouseEnter={() => setOpenSubmenu(item.id)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    {item.children.map((child) => (  
                      <Link
                        key={child.id}
                        href={child.url}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* Logo */}
          <div className="hidden lg:flex items-center justify-center">
            <Link href="/" className="">
              <Image
                src={logo || ''}
                alt={companyName}
                width={450}
                height={450}
                className="h-8 lg:h-10 w-full"
              />
            </Link>
          </div>

          {/* Nav part 2 */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              {rightNavItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenSubmenu(item.id)}
                >
                  <Link
                    href={item.url}
                    className={`font-medium font-tai-lue transition-colors duration-200 hover:text-gray-300 flex items-center ${
                      darkBackground ? 'text-white' : isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </nav>            
          </div>

          <div className="hidden lg:flex fixed  right-16">
          <Link
            href="/contacto"
            className="bg-button font-tai-lue text-white px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-luxury hover:shadow-luxury-hover"
          >
            Agendar Cita
          </Link>
        </div>

          {/* Mobile menu button */}
          <div className="lg:hidden fixed top-4 right-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                darkBackground ? 'text-white hover:bg-white/10' : isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
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
                <div key={item.id}>
                  {item.children ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full px-3 py-2 text-gray-700 font-medium hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        onClick={() => setOpenSubmenu(openSubmenu === item.id ? null : item.id)}
                      >
                        <span>{item.title}</span>
                        <svg
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openSubmenu === item.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {openSubmenu === item.id && (
                        <div className="ml-4 mt-1 space-y-1">
                          <Link
                            href={item.url}
                            className="block px-3 py-2 text-gray-600 text-sm hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              href={child.url}
                              className="block px-3 py-2 text-gray-600 text-sm hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.url}
                      className="block px-3 py-2 text-gray-700 font-medium hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-2">
                <Link
                  href="/contacto"
                  className="block w-full text-center btn-luxury text-white px-4 py-2 rounded-full font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agendar Cita
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}