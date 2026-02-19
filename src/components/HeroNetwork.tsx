import { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

const HeroNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let nodes: Node[] = [];
        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // Reduce load on mobile / touch devices
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        // Configuration
        const NODE_COUNT = isMobile ? 25 : 60;
        const CONNECTION_DISTANCE = isMobile ? 120 : 180;
        const MOUSE_DISTANCE = 250; // Interaction radius
        const NODE_SPEED = 0.4; // Base drift speed

        // Mouse state
        const mouse = { x: -1000, y: -1000 };

        const resize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width;
            canvas.height = height;
            initNodes();
        };

        const initNodes = () => {
            nodes = [];
            for (let i = 0; i < NODE_COUNT; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * NODE_SPEED,
                    vy: (Math.random() - 0.5) * NODE_SPEED,
                    radius: Math.random() * 2 + 1, // varied node sizes
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Updates
            nodes.forEach((node) => {
                // Move
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off walls
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Mouse interaction (repel/attract)
                const dx = mouse.x - node.x;
                const dy = mouse.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_DISTANCE) {
                    const force = (MOUSE_DISTANCE - dist) / MOUSE_DISTANCE;
                    // Gently repel
                    const angle = Math.atan2(dy, dx);
                    node.x -= Math.cos(angle) * force * 1.5;
                    node.y -= Math.sin(angle) * force * 1.5;
                }

                // Draw Node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(149, 0, 255, 0.4)"; // Primary color (purple) with low opacity
                ctx.fill();
            });

            // Draw Connections
            /* 
               Complexity: O(N^2) but N is small (60).
               Optimized for 60 nodes -> 3600 pairs max, cheap enough for 60fps.
            */
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);

                        // Opacity based on distance
                        const alpha = 1 - dist / CONNECTION_DISTANCE;
                        ctx.strokeStyle = `rgba(149, 0, 255, ${alpha * 0.15})`; // Very subtle lines
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        // Init
        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};

export default HeroNetwork;
