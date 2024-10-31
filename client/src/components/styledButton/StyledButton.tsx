import styles from './StyledButton.module.css';

interface StyledButtonProps {
  text: string;
  fontSize?: number;
  backgroundColor?: string;
  spinner?: boolean;
};

const StyledButton = (props: StyledButtonProps) => {
  return (
    <button
      style={{
        fontSize: props.fontSize ? props.fontSize + 'rem' : '1rem',
        backgroundColor: props.backgroundColor ? props.backgroundColor : 'var(--accent-color)',
      }}
      className={styles.styledButton}
    >
      {props.text}
    </button>
  );
};

export default StyledButton;
