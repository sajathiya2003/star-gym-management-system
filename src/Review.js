import { useRef, useEffect } from 'react';

export default function ReviewsSection() {
  const scrollContainer = useRef(null);
  
  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };
  
  // Counter animation
  useEffect(() => {
    const statNumbers = document.querySelectorAll('.pro-stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute('data-count');
          const count = +entry.target.innerText.replace(/\D/g, '');
          const increment = target / 100;
          
          if (count < target) {
            const timer = setInterval(() => {
              entry.target.innerText = Math.ceil(count + increment).toLocaleString();
              if (count + increment >= target) {
                entry.target.innerText = target.toLocaleString();
                if (entry.target.querySelector('span')) {
                  entry.target.innerHTML = target.toLocaleString() + entry.target.querySelector('span').outerHTML;
                }
                clearInterval(timer);
              }
            }, 10);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
      observer.observe(number);
    });
    
    return () => observer.disconnect();
  }, []);
  
}