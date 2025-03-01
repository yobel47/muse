import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CardAnimation = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current;
    const cardsMidIndex = Math.floor(cards.length / 2);
    const yOffset = 60;
    const scaleOffset = 0.02;
    const duration = 0.8;
    const scaleDuration = duration / 3;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    const driftIn = () => {
      return gsap.timeline().from(containerRef.current, {
        yPercent: -yOffset / 3,
        duration,
        ease: 'power2.inOut',
      });
    };

    const driftOut = () => {
      return gsap.timeline().to(containerRef.current, {
        yPercent: yOffset / 3,
        duration,
        ease: 'power2.inOut',
      });
    };

    const scaleCards = () => {
      return gsap
        .timeline()
        .to(cards, {
          scale: (i) => {
            if (i <= cardsMidIndex) {
              return 1 - i * scaleOffset;
            } else {
              return 1 - (cards.length - 1 - i) * scaleOffset;
            }
          },
          delay: duration / 3,
          duration: scaleDuration,
          ease: 'expo.inOut',
        })
        .to(cards, { scale: 1, duration: scaleDuration });
    };

    const shuffleCards = () => {
      return gsap
        .timeline()
        .set(cards, {
          y: (i) => -i * 0.5,
        })
        .fromTo(
          cards,
          {
            rotate: 45,
            yPercent: -yOffset,
          },
          {
            duration,
            rotate: 65,
            yPercent: yOffset,
            stagger: duration * 0.03,
            ease: 'expo.inOut',
          }
        );
    };

    const shuffleDeck = () => {
      tl.add(driftIn())
        .add(shuffleCards(), '<')
        .add(scaleCards(), '<')
        .add(driftOut(), '<55%');
    };

    shuffleDeck();

    return () => {
      tl.kill(); 
    };
  }, []);

  return (
    <div className='cards-container'>
        <ul ref={containerRef} className="cards">
        {[...Array(12)].map((_, i) => (
            <li
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="card"
            />
        ))}
        </ul>
    </div>
    
  );
};

export default CardAnimation;