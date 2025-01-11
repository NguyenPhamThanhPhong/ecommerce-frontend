import SuccessModal from '@components/modal/SuccessModal';
import AddressItem, { ShippingAddressGroup } from '@components/profile/assets/AddressItem';
import { Box, FormControlLabel, Grid2, Modal, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import React, { useState } from 'react'
import { CartOrderItem } from '@components/common/CartOrderItem';

export default function CheckoutCart() {
  const { account } = useGlobalAccountContext((state) => state);
  const pub = useSnackbarStore(state => state.pub);
  const [open, setOpen] = React.useState(false);

  const [defaultAddressKey, setDefaultAddressKey] = React.useState(account?.profile?.primaryAddress);
  const [currentAddress, setCurrentAddress] = React.useState('');
  const [paymentOption, setPaymentOption] = useState("vnpay");
  const [notes, setNotes] = useState('');
  const [order, setOrder] = useState({});
  

  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }

  function handleGetPaymentLink() {
    const bankCode = 'ICICI';
    const amount = 1000;
    getPaymentUrl(bankCode, amount, pub).then((response) => {
      if (response) {
        const url = response.data.url;
        window.location.href = url;
      }
      else {
        handleClose();
      }
    })
  }
  return (
    <>
      <SuccessModal open={open} onClose={handleClose}
        modalSx={{ maxWidth: 800 }}
        isConfirm={true} isCancel={true}
        onConfirm={() => { handleClose(); }} onCancel={handleClose}
        title={'Choose an address'} status={'info'} content={<ShippingAddressGroup
          currentAdress={currentAddress} setCurrentAddress={(value) => {
            setCurrentAddress(value);
          }} />} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Stack width={'50%'}>
          <Box sx={{ display: 'flex' }}>
            <AddressItem onClick={handleOpen}
              title={defaultAddressKey} address={currentAddress} />
          </Box>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Payment Option
              </Typography>
              <RadioGroup
                row
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio sx={{
                  }} />}
                  label={
                    <Box display="flex" alignItems="center">
                      <span role="img" aria-label="Cash on Delivery">💰</span>
                      &nbsp;Cash on Delivery
                    </Box>
                  }
                />
                <FormControlLabel
                  value="vnpay"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <span role="img" aria-label="My Wallet">💳</span>
                      &nbsp;My Wallet
                    </Box>
                  }
                />
              </RadioGroup>
            </Box>

            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Order Notes (Optional)
              </Typography>
              <TextField
                fullWidth
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                multiline
                rows={4}
                placeholder="Notes about your order, e.g. special notes for delivery"
                variant="outlined"
              />
            </Box>
          </Paper>
        </Stack>
        <Grid2 sx={{ width: '30%', }}> 
          <Paper sx={{ padding: 3 }}>
            <Stack sx={{ fontFamily: 'lato', px: '15px' }}>
              <Typography variant="h6" gutterBottom sx={{
                fontWeight: 'bold',
              }}>
                Order Summary
              </Typography>
              <CartOrderItem label={'Gross price'} value={gross} fontWeight={'bold'} />
              <CartOrderItem label={'Total purchases'} value={quantitiesSum} fontWeight={'bold'} />
              <CartOrderItem label={'Coupon Applied'} value={couponApplied} fontWeight={'bold'} />
              <DetailDivider />
              <Stack direction={'row'} mb={1.5}>
                <TextField
                  fullWidth
                  size="small" onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon Code" />
                <Button variant="contained" onClick={() => checkCoupon(coupon)} >✓</Button>
              </Stack>
              <Button variant="contained" color="primary" onClick={handleOpen} fullWidth sx={{
                height: '52px',
              }}>
                Proceed to Checkout
              </Button>
              <SuccessModal open={open} onClose={handleClose} isConfirm={true} isCancel={true}
                onConfirm={submit} onCancel={handleClose}
                status='success' title='Checkout your payment'
                content={<ModalContent gross={gross} total={total} totalItems={quantitiesSum}
                  coupon={coupon} couponApplied={couponApplied} />} />
            </Stack>
          </Paper>
        </Grid2>
      </Box>
    </>
  )
}
