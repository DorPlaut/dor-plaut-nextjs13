'use client';

import { useAlertStore } from '@/store/alertStore';
import React from 'react';

const Alerts = () => {
  // alerts
  const AlertSuccess = useAlertStore((state) => state.AlertSuccess);
  const AlertDanger = useAlertStore((state) => state.AlertDanger);
  return (
    <>
      {AlertSuccess && (
        <span className="alert alert-success fade-in-out">{AlertSuccess}</span>
      )}
      {AlertDanger && (
        <span className="alert alert-danger fade-in-out">{AlertDanger}</span>
      )}
    </>
  );
};

export default Alerts;
