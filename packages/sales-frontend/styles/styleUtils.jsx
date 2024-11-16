export const roundedStyle = ({
    size = 55,
    unit = 'px',
    mhr = '0',
    mvt = '10'
} = {}) => {
    return {
        height: `${size}${unit}`,     // Set the height of the icon
        width: `${size}${unit}`,      // Set the width of the icon
        margin: `${mhr}${unit} ${mvt}${unit}`, // Add some space between the icon and the next element
        borderRadius: '50%',          // Make it round
    };
};
export const marginUtil = ({
    mhr = '110',
    mvt = '0',
    unit = 'px'
} = {}) => ({
    margin: `${mvt}${unit} ${mhr}${unit}`
})



export const noFallbackAvatarUtil = {
    '& .MuiAvatar-fallback': {
        display: 'none',
    },
}