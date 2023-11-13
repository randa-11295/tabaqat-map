import { TextField } from "@mui/material";

const InputTextCustom = (props) => {
  let isError =
    props.formik?.touched[props.name] &&
    Boolean(props.formik?.errors[props.name]);

  let textHelp =
    (props.formik?.touched[props.name] && props.formik.errors[props.name]) 

  const styleInput = {
    mx: .5,
    " & .MuiOutlinedInput-root ": props.phone && {
      p: "0 ",
    },
  };

  return (
    <TextField
      label={props.label}
      fullWidth
      placeholder={props.label}
      value={props.formik?.values[props.name]}
      onChange={props.formik?.handleChange}
      onBlur={props.formik?.handleBlur}
      error={isError}
      helperText={textHelp}
      name={props.name}
      type={props.type || "text"}
      sx={styleInput}
      multiline={props.multi || false}
      minRows={6}
      size="small"
      mx={1}
    />
  );
};

export default InputTextCustom;
