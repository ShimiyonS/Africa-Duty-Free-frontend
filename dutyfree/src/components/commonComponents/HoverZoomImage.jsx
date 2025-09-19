import React, { useRef, useState } from "react";
const HoverZoomImage = ({
    src,
    alt,
    zoom = 2,
    width = 300,
    height = 320,
    radius = 12,
    className = "",
}) => {
    const wrapperRef = useRef(null);
    const [isHover, setIsHover] = useState(false);
    const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

    const onEnter = () => setIsHover(true);
    const onLeave = () => setIsHover(false);

    const onMove = (e) => {
        const rect = wrapperRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setOrigin({ x: `${x}%`, y: `${y}%` });
    };

    // Basic touch support: tap to toggle zoom, drag to pan
    const onTouchStart = () => setIsHover((v) => !v);
    const onTouchMove = (e) => {
        if (!wrapperRef.current || !isHover) return;
        const touch = e.touches[0];
        const rect = wrapperRef.current.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;
        setOrigin({ x: `${x}%`, y: `${y}%` });
    };

    const styles = {
        wrapper: {
           maxWidth: width,
           width:"100%",
            height,
            overflow: "hidden",
            borderRadius: typeof radius === "number" ? `${radius}px` : radius,
            position: "relative",
            display: "inline-block",
            cursor: "zoom-in",
            background: "transparent",
        },
        img: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 220ms ease, transform-origin 80ms linear, filter 220ms ease",
            transformOrigin: `${origin.x} ${origin.y}`,
            transform: isHover ? `scale(${zoom})` : "scale(1)",
            userSelect: "none",
            pointerEvents: "none",
            display: "block",
        },
    };

    return (
        <div
            ref={wrapperRef}
            className={className}
            style={styles.wrapper}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onMouseMove={onMove}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            role="img"
            aria-label={alt}
        >
            <img src={src} alt={alt} style={styles.img} draggable={false} />
        </div>
    );
};

export default HoverZoomImage;
