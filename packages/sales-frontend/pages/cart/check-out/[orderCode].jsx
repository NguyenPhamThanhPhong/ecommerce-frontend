import SuccessModal from '@components/modal/SuccessModal';
import AddressItem, { ShippingAddressGroup } from '@components/profile/assets/AddressItem';
import { Box, Button, FormControlLabel, Grid2, Modal, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router';
import { getOrder } from '@shared-api/Orders';
import { UIAssets } from '@shared/UIAssets';
import { trimString } from '@shared-utils/ConverterUtils';
import { DetailDivider } from '@components/product/ProductUIAssets';
import { CartOrderItem, PaymentModal } from '@components/modal/OrderModalContent';
import { calculateGrossAndCount, calculateCouponApplied, calculateTotal } from '@shared-utils/CalculationUtils';
import { getPaymentUrl } from '@shared-api/Payments';

export default function CheckoutCart() {
  const router = useRouter();
  const { account } = useGlobalAccountContext((state) => state);
  const pub = useSnackbarStore(state => state.pub);
  const [addressOpen, setAddressOpen] = React.useState(false);
  const [paymentCheckOpen, setPaymentCheckOpen] = React.useState(false);
  const [currentAddress, setCurrentAddress] = React.useState('');
  const [defaultAddressKey, setDefaultAddressKey] = React.useState(account?.profile?.primaryAddress);

  const [paymentOption, setPaymentOption] = useState("vnpay");
  const [notes, setNotes] = useState('');
  const [order, setOrder] = useState({});

  const orderCode = router?.query?.orderCode;
  useEffect(() => {
    if (orderCode) {
      console.log('orderCode', orderCode);
      getOrder(orderCode, pub).then((response) => {
        if (response) {
          console.log('resnponse', response);
          setOrder(response);
        }
      });
    }
  }, []);

  const orderDetails = useMemo(() => {
    if (order) {
      if (order?.orderDetails) {
        return order.orderDetails;
      }
    }
  }, [order]);
  const couponCode = order?.coupon?.code;
  const gross = calculateGrossAndCount(orderDetails).gross;
  const couponApplied = calculateCouponApplied(gross, order?.coupon);


  function handleGetPaymentLink() {
    const bankCode = 'NCB';
    getPaymentUrl({
      orderId: order?.id, bankCode: bankCode,
      orderInfo: notes, shippingAddress: currentAddress
    }, pub).then((response) => {
      if (response) {
        const url = response.data;
        window.location.href = url;
      }
    })
  }
  return (
    <>
      <SuccessModal open={addressOpen} modalSx={{ maxWidth: 800 }}
        isConfirm={true} isCancel={true}
        onClose={() => { setAddressOpen(false); }}
        onConfirm={() => { setAddressOpen(false); }}
        onCancel={() => { setAddressOpen(false); }}
        title={'Choose an address'} status={'info'} content={<ShippingAddressGroup
          currentAdress={currentAddress} setCurrentAddress={(value) => {
            setCurrentAddress(value);
          }} />} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Stack width={'55%'}>
          <Box sx={{ display: 'flex' }}>
            <AddressItem onClick={() => { setAddressOpen(true) }}
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
        <Grid2 sx={{ width: '40%' }}>
          <Paper sx={{ padding: 3 }}>
            <Stack sx={{ fontFamily: 'lato', px: '15px' }}>
              <Typography variant="h6" gutterBottom sx={{
                fontWeight: 'bold',
              }}>
                Order Summary
              </Typography>
              {orderDetails &&
                orderDetails?.map((item, index) => {
                  const prod = item?.product;
                  const quantity = item?.quantity || 0;
                  return (
                    <UIAssets.InfoAvatarGroup key={prod?.id} title={prod?.name +
                      '  ' + ' x' + quantity}
                      avatarProp={{
                        src: prod?.thumbnailUrl, variant: 'square',
                        sx: { width: 60, height: 60, marginRight: 16, borderRadius: 10 }
                      }}
                      subtitle={trimString(prod?.description || '', 30)}>
                    </UIAssets.InfoAvatarGroup>
                  )
                })
              }
              <DetailDivider />
              <CartOrderItem label={'Gross price'} value={gross} fontWeight={'bold'} />
              <CartOrderItem label={'Coupon Applied'} value={couponApplied} fontWeight={'bold'} />
              <CartOrderItem label={'Total'} value={order?.totalValue} fontWeight={'bold'} />
              <DetailDivider />
              <Button variant="contained" color="primary" onClick={() => {
                setPaymentCheckOpen(true);
              }} fullWidth sx={{
                height: '52px',
              }}>
                Proceed to Checkout
              </Button>
              <SuccessModal open={paymentCheckOpen}
                onClose={() => { setPaymentCheckOpen(false) }} isConfirm={true} isCancel={true}
                onConfirm={handleGetPaymentLink} onCancel={() => { setPaymentCheckOpen(false) }}
                status='success' title='Confirm payment'
                content={<PaymentModal key={'1'}
                  address={currentAddress}
                  coupon={couponCode} notes={notes} totalValue={order?.totalValue} />} />
            </Stack>
          </Paper>
        </Grid2>
      </Box>
    </>
  )
}
