import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { useAlertStore } from '@/store/alertStore';
const DashboardLayout = ({ children }) => {
  // alerts
  const AlertSuccess = useAlertStore((state) => state.AlertSuccess);
  const AlertDanger = useAlertStore((state) => state.AlertDanger);
  return (
    <>
      <Header dashborad />

      <main>
        {children}
        {AlertSuccess && (
          <span className="alert alert-success fade-in-out">
            {AlertSuccess}
          </span>
        )}
        {AlertDanger && (
          <span className="alert alert-danger fade-in-out">{AlertDanger}</span>
        )}
      </main>

      <Footer />
    </>
  );
};

export default DashboardLayout;
