import styles from './Spinner.module.css';

interface SpinnerProps {
  size: 'small' | 'medium' | 'large';
};

const setSpinnerSize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return 1;
    case 'medium':
      return 1.3;
    case 'large':
      return 1.5;
  }
};

const Spinner = (props: SpinnerProps) => {
  const spinnerSize = setSpinnerSize(props.size);

  return (
    <div
      style={{
        fontSize: `${spinnerSize}rem`,
      }}
    >
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
