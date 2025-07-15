import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

const initialState = {
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true
};

export const endpoints = {
  key: 'api/menu',
  master: 'master'
};

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}

export function layout_change(theme) {
  if (!theme) return;

  // Apply theme to <body>
  document.body.setAttribute('data-theme', theme);

  // Persist theme to localStorage
  localStorage.setItem('theme', theme);
}

export function layout_change_default() {
  let dark_layout = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  layout_change(dark_layout);

  const btn_control = document.querySelector('.theme-layout .btn[data-value="default"]');
  if (btn_control) {
    btn_control.classList.add('active');
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    dark_layout = event.matches ? 'dark' : 'light';
    layout_change(dark_layout);
  });
}

export function initialize_theme_on_load() {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof Storage !== 'undefined') {
      const theme = localStorage.getItem('theme');
      if (theme) {
        layout_change(theme);
      } else {
        layout_change_default();
      }
    }
  });
}
