import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export function LoginSignupTextBox({name, label, placeholder, icon, value, error, errorText, onChange, password }) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    return (
        <TextField
            fullWidth
            name={name}
            label={label}
            variant="standard"
            type={(password && !showPassword) ? 'password' : 'text'}
            value={value}
            error={error}
            helperText={errorText}
            placeholder={placeholder}
            onChange={onChange}
            margin="normal"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                ),
                endAdornment: (
                    (password) && <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            InputLabelProps={{
                style: { color: "#fff", fontSize: 18 },
            }}
            sx={{
                input: { color: "#fff", fontSize: 18 },
                height: 50,

                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                        borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#fff",
                    },
                },
                '& .MuiInput-underline:before': {
                    borderBottomColor: '#ffffff',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: '#ffffff',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#ffffff',
                },
            }}
        />
    )
}