import React from 'react';

export const withStatus = (Screen, status) => {
  const OrdersWithStatusScreen = props => {
    return(
      <Screen status={status} {...props}/>
    );
  };

  return OrdersWithStatusScreen;
};