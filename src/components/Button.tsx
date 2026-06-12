import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (e: any) => void;
    variant?: 'primary' | 'back' | 'position';
    type: 'button' | 'submit';
}

export default function Button({
    children,
    onClick,
    variant = 'primary',
    type,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.btn} ${styles[variant]}`}
        >
            {children}
        </button>
    );
}
