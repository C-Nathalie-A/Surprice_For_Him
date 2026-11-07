import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ChocolateType } from '@/app/data/chocolates';
import specialRoseImg from 'figma:asset/59ef4a91fff8762a1445bdb8dc860eb7c8ab4f8f.png';
import specialSprinkleImg from 'figma:asset/909115c65601d202670bc55c0808c89ad5277413.png';
import specialRibbonImg from 'figma:asset/ca58b9246b77a1d55ed9e202b89842c67eed365c.png';
import specialMacaronImg from 'figma:asset/a9b05ebbdc78d2ee5dfae3e82792619f1e673f93.png';
import specialHeartCookieImg from 'figma:asset/cb22faa59676c70e4703f2ba912b709a12a03aba.png';
import specialBiscuitImg from 'figma:asset/1f170bd51ddc6e76390d664c756d0c698dc28fa4.png';
import specialSquareHeartImg from 'figma:asset/4d11093347f9f0436348ff31eddbb2faee3e151f.png';
import specialHeartDrizzleImg from 'figma:asset/ebf1d4872155caa570a65259992ce947eb50e8fa.png';
import specialSquareRoseImg from 'figma:asset/42a82eb4d60df9f8dda587a0a782aedb71352a92.png';
import specialPinkSquareImg from 'figma:asset/8d072b94cc7dfd219e85aa0b204444c0fb1dc76a.png';
import specialRoundHeartImg from 'figma:asset/3c8305aac42f5ae756a4d89705b7b426ae95cd72.png';
import specialDarkRoseImg from 'figma:asset/cf6593036a13ea7957f162c83198c4a3e4e45217.png';

interface ChocolateProps {
  type: ChocolateType;
  onClick: () => void;
  isEaten: boolean;
}

export const Chocolate: React.FC<ChocolateProps> = ({ type, onClick, isEaten }) => {
  const baseClasses = "relative w-full h-full shadow-lg cursor-pointer flex items-center justify-center overflow-hidden transition-all duration-300";
  const imageContainerClasses = "relative w-full h-full cursor-pointer flex items-center justify-center transition-all duration-300";

  // Randomize Bite Mark Position and Size
  const biteConfig = useMemo(() => {
    // Possible bite positions (corners and edges)
    const positions = [
        '100% 0%',   // Top Right
        '0% 0%',     // Top Left
        '100% 100%', // Bottom Right
        '0% 100%',   // Bottom Left
        '50% -15%',  // Top Edge
        '50% 115%',  // Bottom Edge
        '-15% 50%',  // Left Edge
        '115% 50%'   // Right Edge
    ];
    
    // Pick a random position
    const pos = positions[Math.floor(Math.random() * positions.length)];
    
    // Randomize size slightly (between 40% and 50% of the element size)
    // This is "a bit smaller" than the previous 60%
    const size = 40 + Math.floor(Math.random() * 10); 
    
    return { pos, size };
  }, []);

  // Define shapes and specific styles based on type
  const getStyle = (type: ChocolateType) => {
    switch (type) {
      case 'special-rose':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialRoseImg,
           decoration: null
        };
      case 'special-sprinkle':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialSprinkleImg,
           decoration: null
        };
      case 'special-ribbon':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialRibbonImg,
           decoration: null
        };
      case 'special-macaron':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialMacaronImg,
           decoration: null
        };
      case 'special-heart-cookie':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialHeartCookieImg,
           decoration: null
        };
      case 'special-biscuit':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialBiscuitImg,
           decoration: null
        };
      case 'special-square-heart':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialSquareHeartImg,
           decoration: null
        };
      case 'special-heart-drizzle':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialHeartDrizzleImg,
           decoration: null
        };
      case 'special-square-rose':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialSquareRoseImg,
           decoration: null
        };
      case 'special-pink-square':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialPinkSquareImg,
           decoration: null
        };
      case 'special-round-heart':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialRoundHeartImg,
           decoration: null
        };
      case 'special-dark-rose':
        return {
           container: imageContainerClasses,
           isImage: true,
           imageSrc: specialDarkRoseImg,
           decoration: null
        };
      case 'dark-round':
        return {
          container: `${baseClasses} rounded-full bg-gradient-to-br from-[#4e342e] to-[#2d1e1a] shadow-[#2d1e1a]/50`,
          decoration: (
            <div className="absolute w-1/2 h-1/2 border-2 border-[#8d6e63]/30 rounded-full top-1/4 left-1/4" />
          )
        };
      case 'milk-square':
        return {
          container: `${baseClasses} rounded-lg bg-gradient-to-br from-[#8d6e63] to-[#5d4037] shadow-[#5d4037]/50`,
          decoration: (
            <div className="absolute w-full h-full flex items-center justify-center">
               <div className="w-[1px] h-full bg-[#a1887f]/20 rotate-45" />
               <div className="w-[1px] h-full bg-[#a1887f]/20 -rotate-45" />
            </div>
          )
        };
      case 'white-heart':
        return {
          container: `${baseClasses} mask-heart bg-gradient-to-br from-[#fff9c4] to-[#f0f4c3] shadow-[#f0f4c3]/50`,
          isHeart: true,
          decoration: (
             <div className="absolute w-2 h-2 bg-red-400 rounded-full top-1/3 left-1/2 -translate-x-1/2 shadow-sm" />
          )
        };
      case 'dark-swirl':
        return {
          container: `${baseClasses} rounded-lg bg-gradient-to-br from-[#3e2723] to-[#1a100e] shadow-[#1a100e]/50`,
          decoration: (
            <svg viewBox="0 0 100 100" className="absolute w-full h-full p-2 opacity-30">
              <path d="M20,50 Q50,20 80,50 T50,80" fill="none" stroke="#d7ccc8" strokeWidth="3" />
            </svg>
          )
        };
      case 'milk-round':
        return {
          container: `${baseClasses} rounded-full bg-gradient-to-br from-[#a1887f] to-[#795548] shadow-[#795548]/50`,
          decoration: (
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
          )
        };
      case 'white-square':
        return {
          container: `${baseClasses} rounded-md bg-gradient-to-br from-[#fffde7] to-[#fff9c4] border-b-4 border-[#f0f4c3]`,
          decoration: (
            <div className="absolute w-full h-full border-4 border-dashed border-[#ffee58]/30 rounded-md box-border transform scale-90" />
          )
        };
      default:
        return { container: baseClasses, decoration: null };
    }
  };

  const { container, decoration, isHeart, isImage, imageSrc } = getStyle(type);

  // Apply Randomized Bite Mask
  const biteMaskStyle = isEaten ? {
    maskImage: `radial-gradient(circle at ${biteConfig.pos}, transparent ${biteConfig.size}%, black ${biteConfig.size + 1}%)`,
    WebkitMaskImage: `radial-gradient(circle at ${biteConfig.pos}, transparent ${biteConfig.size}%, black ${biteConfig.size + 1}%)`
  } : {};

  // Custom grounding shadow for 3D effect
  const GroundShadow = () => (
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-[10px] bg-black/40 blur-md rounded-[100%] z-[-1]" />
  );

  if (isImage && imageSrc) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
             {!isEaten && <GroundShadow />}
            <motion.div
                className={container}
                whileHover={!isEaten ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isEaten ? { scale: 0.95 } : {}}
                onClick={onClick}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={biteMaskStyle}
            >
                <img 
                    src={imageSrc} 
                    alt="Chocolate" 
                    className="w-full h-full object-contain drop-shadow-2xl filter saturate-110" 
                />
            </motion.div>
        </div>
      )
  }

  // For the heart, we need a special handling because it uses an SVG wrapper
  if (isHeart) {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
             {!isEaten && <GroundShadow />}
            <motion.div
                className="relative w-full aspect-square flex items-center justify-center cursor-pointer drop-shadow-lg"
                whileHover={!isEaten ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isEaten ? { scale: 0.95 } : {}}
                onClick={onClick}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={biteMaskStyle}
            >
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-md overflow-visible">
                    <defs>
                        <linearGradient id="whiteHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fff9c4" />
                            <stop offset="100%" stopColor="#f0f4c3" />
                        </linearGradient>
                    </defs>
                    <path d="M16,28.261c0,0-14-9.167-14-16.739C2,7.522,5.372,4,9.667,4C12.556,4,15.111,5.667,16,8.167C16.889,5.667,19.444,4,22.333,4C26.628,4,30,7.522,30,11.522C30,19.094,16,28.261,16,28.261Z" 
                    fill="url(#whiteHeartGrad)" />
                </svg>
                {decoration}
                {isEaten && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-transparent" />
                )}
            </motion.div>
        </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
         {!isEaten && <GroundShadow />}
        <motion.div
        className={`${container} aspect-square`}
        whileHover={!isEaten ? { scale: 1.05, y: -2 } : {}}
        whileTap={!isEaten ? { scale: 0.95 } : {}}
        onClick={onClick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={biteMaskStyle}
        >
        {decoration}
        {/* Glossy reflection for realism */}
        <div className="absolute top-2 left-2 w-1/3 h-1/4 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-[1px]" />
        </motion.div>
    </div>
  );
};
