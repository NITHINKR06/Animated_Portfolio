import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over clickable element
            const target = e.target as HTMLElement;
            let element: HTMLElement | null = target;
            let clickable = false;

            // Traverse up the DOM tree to check for clickable elements
            while (element && element !== document.body) {
                const computedCursor = window.getComputedStyle(element).cursor;

                if (
                    element.tagName === 'A' ||
                    element.tagName === 'BUTTON' ||
                    element.tagName === 'INPUT' ||
                    element.tagName === 'TEXTAREA' ||
                    element.tagName === 'SELECT' ||
                    element.getAttribute('role') === 'button' ||
                    element.classList.contains('cursor-pointer') ||
                    computedCursor === 'pointer' ||
                    element.onclick !== null
                ) {
                    clickable = true;
                    break;
                }

                element = element.parentElement;
            }

            setIsPointer(clickable);
        };

        window.addEventListener('mousemove', updateCursorPosition);

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
        };
    }, []);

    return (
        <>
            <div
                className="custom-cursor"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    backgroundImage: isPointer
                        ? `url('/mouse/Christmas Miles Morales/Christmas Miles Morales--pointer--SweezyCursors.png')`
                        : `url('/mouse/Christmas Miles Morales/Christmas Miles Morales--cursor--SweezyCursors.png')`,
                }}
            />
        </>
    );
};

export default CustomCursor;
