import { ReactElement, useEffect, useRef, useState } from "react";

export default function FadeInSection({ children }: { children: ReactElement }) {
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return null;

				setIsVisible(true);
				observer.unobserve(entry.target);

				return null;
			},
			{ threshold: 0.2 },
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section className={`${isVisible ? "fade-in" : "opacity-0"}`} ref={ref}>
			{children}
		</section>
	);
}
