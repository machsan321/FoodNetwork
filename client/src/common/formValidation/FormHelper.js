import {  useField } from "formik"
import TextField from '@material-ui/core/TextField';
export const MyTextField = ({
    placeholder,
    ...props
  }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField
        placeholder={placeholder}
        {...field}
        {...props}
        helperText={errorText}
        error={!!errorText}
      />
    );
  };