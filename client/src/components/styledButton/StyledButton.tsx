import styles from './StyledButton.module.css';

interface StyledButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  fontSize?: number;
  backgroundColor?: string;
  spinner?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
};

const StyledButton = (props: StyledButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      style={{
        fontSize: props.fontSize ? props.fontSize + 'rem' : '1rem',
        backgroundColor: props.backgroundColor ? props.backgroundColor : 'var(--accent-color)',
        
      }}
      className={`${styles.styledButton} ${props.spinner ? styles.enabledSpinner : ''}`}
      type={ props.type ? props.type : 'button' }
    >
      {props.text}
    </button>
  );
};

export default StyledButton;
