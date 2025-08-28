// utils/docStatus.js (optional but tidy)
export const fmt = (d) => (d ? new Date(d).toLocaleString() : '—');

export const mapDocStatusNumber = (n) => {
  switch (n) {
    case 0: return { text: 'Draft', variant: 'secondary', icon: '📄' };
    case 1: return { text: 'Under Review', variant: 'warning', icon: '🕒' };
    case 2: return { text: 'Approved', variant: 'success', icon: '✔️' };
    default: return null;
  }
};

export const getComputedStatus = ({ expiryDate, isRenewed }) => {
  if (isRenewed) return { text: 'Renewed', variant: 'success', icon: '✔️' };

  const now = new Date();
  const exp = expiryDate ? new Date(expiryDate) : null;

  if (!exp || Number.isNaN(exp.getTime())) {
    return { text: 'Draft', variant: 'secondary', icon: '📄' };
  }
  if (exp < now) return { text: 'Expired', variant: 'danger', icon: '⚠️' };

  const daysLeft = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
  if (daysLeft <= 30) return { text: `Due Soon (${daysLeft}d)`, variant: 'warning', icon: '🕒' };

  return { text: 'Active', variant: 'primary', icon: '🟢' };
};
