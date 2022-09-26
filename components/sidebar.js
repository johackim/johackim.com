import styles from '@styles/sidebar.module.css';

const Sidebar = ({ children, className }) => (
    <div className={`hidden md:block self-start sticky top-20 dark:text-gray-300 overflow-scroll ${className} ${styles.sidebar}`}>
        {children}
    </div>
);

Sidebar.defaultProps = {
    className: '',
    children: 'Hello sidebar',
};

export default Sidebar;
