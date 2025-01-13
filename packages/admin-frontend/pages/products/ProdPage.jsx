
// function validateField(value, conditions) {
//     return true;
//     if (conditions.required && (!value || value.toString().trim() === '')) {
//         return false; // Field is required but missing or empty
//     }

//     if (conditions.isNumber && isNaN(Number(value))) {
//         return false; // Field is expected to be a number but isn't
//     }

//     if (conditions.isDate && isNaN(Date.parse(value))) {
//         return false; // Field is expected to be a date but isn't
//     }

//     if (conditions.minLength && value.length < conditions.minLength) {
//         return false; // Field's length is less than the minimum
//     }

//     if (conditions.maxLength && value.length > conditions.maxLength) {
//         return false; // Field's length exceeds the maximum
//     }

//     if (conditions.min && Number(value) < conditions.min) {
//         return false; // Numeric value is less than the minimum allowed
//     }

//     if (conditions.max && Number(value) > conditions.max) {
//         return false; // Numeric value exceeds the maximum allowed
//     }

//     return true; // Validation passed
// }
// const handleInputChange = (setter, errorSetter, conditions) => (e) => {
//     const value = e.target.value;
//     setter(value);
//     if (!validateField(value, conditions)) {
//         errorSetter(`Invalid ${conditions.field}`);
//         return false;
//     }
//     errorSetter('');
//     return true;
// };
// const handleImageChange = (event) => {
//     const files = event.target.files;
//     const newImages = [...images];

//     Array.from(files).forEach((file) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//             newImages.push({ type: 'binary', value: reader.result });
//             setImages(newImages);
//         };
//         reader.readAsArrayBuffer(file);
//     });
// };


// export function ProdName() {
//     const productNameInput = {
//         label: 'Product Name',
//         value: productName,
//         Component: FormTextBox,
//         onChange: handleInputChange(setProductName, setProductError, { required: true, field: 'Product Name' }),
//         error: !!productError,
//         errorText: productError,
//         formSx: { gap: 1, width: '100%', mb: 1 },
//         required: true,
//     };
//     return(
//         <productNameInput.Component {...productNameInput} />
//     )
// }
// export function ProdDescription(description,setDescription,setDescriptionError) {
//     const descriptionInput = {
//         label: 'Description',
//         value: description,
//         Component: FormTextBox,
//         onChange: handleInputChange(setDescription, setDescriptionError, { field: 'Description' }),
//         error: !!descriptionError,
//         errorText: descriptionError,
//     };
//     return(
//         <descriptionInput.Component {...descriptionInput} />
//     )
// }

// export function ProdPrice({price,setPrice,setPriceError}) {
//     const priceInput = {
//         label: 'Price',
//         value: price,
//         Component: FormNumberInput,
//         onChange: handleInputChange(setPrice, setPriceError, { required: true, field: 'Price', isNumber: true }),
//         error: !!priceError,
//         errorText: priceError,
//         width: '100%',
//         formSx: { gap: 1, width: '100%', mb: 1 };
//       }
// }



// export default function ProdPage(params) {
//     const {
//         formValues, errors, productName, description,
//         brand, categories,
//         price, discountPercent,
//         imageGroup, thumbNail,
//         quantity, stock,
//         availableFrom, availableTo,
//     } = params;


//     return (
//         <Box sx={{
//             display: 'flex', justifyContent: 'space-between', gap: 2,
//         }}>
//             <Stack sx={{ width: '70%', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
//                 {/* Media Section */}
//                 <Paper sx={{ p: 3, mb: 3 }}>
//                     <Typography variant="h6" sx={{ mb: 2 }}>
//                         Media
//                     </Typography>
//                     <productName.Component {...productName} />
//                     <description.Component {...description} />
//                 </Paper>
//                 <Paper sx={{ p: 3, mb: 3 }}>
//                     <ProductImageGroupInput />
//                 </Paper>

//                 {/* Pricing Section */}
//                 <Paper sx={{ p: 3, mb: 3 }}>
//                     <Typography variant="h6" sx={{ mb: 2 }}>
//                         Pricing
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                         {/* <TextField label="Base Price" placeholder="Type base price here..." fullWidth /> */}
//                         <price.Component {...price} />
//                         {/* Discount type */}
//                         <Box sx={{ display: 'flex', gap: 2 }}>
//                             <TextField
//                                 label="Discount Type"
//                                 select
//                                 fullWidth>
//                                 <MenuItem value="none">None</MenuItem>
//                                 <MenuItem value="percentage">Percentage</MenuItem>
//                                 <MenuItem value="fixed">Fixed Amount</MenuItem>
//                             </TextField>
//                             <TextField label="Discount Percentage (%)" placeholder="Type discount percentage..." fullWidth />
//                         </Box>
//                         {/* Tax */}
//                         <Box sx={{ display: 'flex', gap: 2 }}>
//                             <TextField
//                                 label="Tax Class"
//                                 select
//                                 fullWidth
//                             >
//                                 <MenuItem value="standard">Standard</MenuItem>
//                                 <MenuItem value="reduced">Reduced</MenuItem>
//                                 <MenuItem value="zero">Zero</MenuItem>
//                             </TextField>
//                             <TextField label="VAT Amount (%)" placeholder="Type VAT amount..." fullWidth />
//                         </Box>
//                     </Box>
//                 </Paper>
//             </Stack>
//             <Stack sx={{ width: '28%', minHeight: '100vh' }}>
//                 {/* Category & Price */}
//                 <Paper sx={{ p: 3, mb: 3 }}>
//                     <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
//                         Category
//                     </Typography>
//                     <brand.Component {...brand} />
//                     <categories.Component {...categories} />
//                 </Paper>
//                 {/* Inventory Section */}
//                 <Paper sx={{ p: 3, }}>
//                     <Typography variant="h6" sx={{ mb: 2 }}>Inventory</Typography>
//                     <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                         <Box>
//                             <Typography variant="body1">Publish Date</Typography>
//                             <availableFrom.Component {...availableFrom} />
//                             <availableTo.Component {...availableTo} />
//                         </Box>
//                         <stock.Component {...stock} />
//                         <quantity.Component {...quantity} />
//                     </Box>
//                 </Paper>
//             </Stack>
//         </Box>
//     )
// }