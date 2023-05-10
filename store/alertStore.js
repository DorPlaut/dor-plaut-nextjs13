import create from 'zustand';

export const useAlertStore = create((set) => ({
  AlertSuccess: '',
  AlertDanger: '',

  // handle alerts
  showAlert: (msg, type) => {
    if (type === 'success') {
      set({ AlertSuccess: msg });
    }
    if (type === 'danger') {
      set({ AlertDanger: msg });
    }
    setTimeout(() => {
      set({ AlertSuccess: '' });
      set({ AlertDanger: '' });
    }, 3500);
  },
}));

// Call setIsMobile to set the initial value and add event listener for resize

// // Add this to avoid the deprecated warning
// const AlertContext = createContext(useAlertStore);
// export default AlertContext;
