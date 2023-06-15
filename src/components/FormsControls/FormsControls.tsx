import styles from './styles.module.css';

type FormProps = {
  input: any;
  meta: {
    touched: boolean;
    error: string;
  };
  children: React.ReactNode;
};

const FormControl = ({ input, meta, ...props }: FormProps) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>{props.children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const TextArea = (props: FormProps) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input = (props: FormProps) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};
