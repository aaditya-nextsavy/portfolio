import '@/public/assets/styles/reset.css';    
import '@/public/assets/styles/global.css';    
import '@/public/assets/styles/styles.css';    
import FireParticles from '@/components/FireParticle';
import LenisProvider from '@/components/LenisProvider';

export const metadata = {
  title: "Portfolio | Aaditya",
  description: "Junior Web Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider/>
        <FireParticles/>
        {children}
      </body>
    </html>
  );
}
